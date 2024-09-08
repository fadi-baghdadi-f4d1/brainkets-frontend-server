'use client';
import { CurrencyResponse } from '@/services/settings/currency/dto/CurrencyResponse';
import { UpdateCurrencyRequest } from '@/services/settings/currency/dto/UpdateCurrencyRequest';
import { getCurrencies } from '@/services/settings/currency/GetCurrencies';
import { getCurrencyFormatById } from '@/services/settings/currency/GetCurrencyFormatById';
import { updateCurrency } from '@/services/settings/currency/UpdateCurrency';
import { updateCurrencyFormat } from '@/services/settings/currency/UpdateCurrencyFormat';
import React, { useState, useEffect, useCallback } from 'react';
import { CookingPot, RefreshCw } from 'lucide-react';
import CurrencyDialog from '../component/CurrencyDialog';
import { createCurrency } from '@/services/settings/currency/CreateCurrency';
import { deleteCurrency } from '@/services/settings/currency/DeleteCurrency';
import { getRates } from '@/services/settings/currency/GetRates';
import { createRate } from '@/services/settings/currency/createRate';
import { CreateRateRequest } from '@/services/settings/currency/dto/CreateRateRequest';
import { RateResponse } from '@/services/settings/currency/dto/RateResponse';
import Select from '../component/currency/Select';
import Input from '../component/currency/Input';
import Button from '../component/currency/Button';
import GlobalError from '../component/GlobalError';
import GlobalSuccess from '../component/GlobalSuccess';

const Table = ({ children }) => (
    <table className="w-full border-collapse border border-gray-300 text-gray-800">{children}</table>
);

const TableHeader = ({ children }) => <thead className="bg-gray-100">{children}</thead>;
const TableBody = ({ children }) => <tbody>{children}</tbody>;
const TableRow = ({ children }) => <tr>{children}</tr>;
const TableHead = ({ children }) => <th className="border border-gray-300 px-4 py-2 text-gray-700">{children}</th>;
const TableCell = ({ children }) => <td className="border border-gray-300 px-4 py-2">{children}</td>;

export default function CurrencySettingsPage() {
    const [defaultCurrency, setDefaultCurrency] = useState('');
    const [currencies, setCurrencies] = useState([]);
    const [symbolPosition, setSymbolPosition] = useState('before');
    const [decimalPlaces, setDecimalPlaces] = useState(2);
    const [hasChanges, setHasChanges] = useState(false);
    const [defaultCurrencyId, setDefaultCurrencyId] = useState<number | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currencyToEdit, setCurrencyToEdit] = useState(null);
    const [rates, setRates] = useState<RateResponse[]>([]);
    const [formatExample, setFormatExample] = useState('');

    // State for global error and success messages
    const [globalError, setGlobalError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        fetchCurrencies();
        fetchCurrencyFormatSettings();
    }, []);

    useEffect(() => {
        if (defaultCurrency && currencies.length > 0) {
            updateFormatExample(defaultCurrency, symbolPosition, decimalPlaces);
        }
    }, [defaultCurrency, currencies, symbolPosition, decimalPlaces]);

    const updateFormatExample = useCallback((currencyCode, position, places) => {
        const currentCurrency = currencies.find(c => c.code === currencyCode);
        if (!currentCurrency) {
            return;
        }
        const symbol = currentCurrency.symbol;
        const amount = (1234.5678).toFixed(places);
        const formattedAmount = position === 'before' ? `${symbol}${amount}` : `${amount} ${symbol}`;
        setFormatExample(formattedAmount);
    }, [currencies]);

    const fetchCurrencies = async () => {
        try {
            const data: CurrencyResponse[] = await getCurrencies();
            setCurrencies(data);
            const defaultCurrency = data.find(currency => currency.isDefault);
            if (defaultCurrency) {
                setDefaultCurrency(defaultCurrency.code);
                setDefaultCurrencyId(defaultCurrency.id);
                await fetchRates(defaultCurrency.id);
            }
            await fetchCurrencyFormatSettings();
        } catch (error) {
            console.error('Error fetching currencies:', error);
        }
    };


    const fetchCurrencyFormatSettings = async () => {
        try {
            const { symbolPosition, decimalPlaces } = await getCurrencyFormatById();
            setSymbolPosition(symbolPosition || 'before');
            setDecimalPlaces(decimalPlaces || 2);
            // Ensure the most recent default currency is used
            updateFormatExample(defaultCurrency, symbolPosition || 'before', decimalPlaces || 2);
        } catch (error) {
            console.error('Error fetching currency format settings:', error);
        }
    };
    

    const fetchRates = async (defaultCurrencyId: number) => {
        try {
            const ratesData = await getRates(defaultCurrencyId);
            setRates(ratesData);
        } catch (error) {
            console.error('Error fetching rates:', error);
        }
    };

    const handleDefaultCurrencyChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCode = e.target.value;
        setDefaultCurrency(selectedCode);
    
        const selectedCurrency = currencies.find(currency => currency.code === selectedCode);
        if (selectedCurrency) {
            setDefaultCurrencyId(selectedCurrency.id);
            await fetchRates(selectedCurrency.id);
            updateFormatExample(selectedCode, symbolPosition, decimalPlaces);
        }
    
        setHasChanges(true);
    };

    const handleSymbolPositionChange = (e) => {
        const newPosition = e.target.value;
        setSymbolPosition(newPosition);
        updateFormatExample(defaultCurrency, newPosition, decimalPlaces);
        setHasChanges(true);
    };
    
    const handleDecimalPlacesChange = (e) => {
        const newPlaces = parseInt(e.target.value, 10);
        setDecimalPlaces(newPlaces);
        updateFormatExample(defaultCurrency, symbolPosition, newPlaces);
        setHasChanges(true);
    };

    const handleSaveSettings = async () => {
        try {
            // Check if the default currency has changed
            // Find the currently selected currency
            const selectedCurrency = currencies.find(currency => currency.id === defaultCurrencyId);

            // Check if the default currency has changed
            if (selectedCurrency && !selectedCurrency.isDefault) {
                const updateData: UpdateCurrencyRequest = { isDefault: true };
                await updateCurrency(defaultCurrencyId, updateData);
                setSuccessMessage('Default currency updated successfully.');
            }

            // Call the update currency format method
            const updateFormatData = { symbolPosition, decimalPlaces };
            await updateCurrencyFormat(1, updateFormatData);
            setSuccessMessage('Currency format updated successfully.');

            setHasChanges(false); // Reset changes after saving

            // Refresh the currencies list to reflect the new default
            await fetchCurrencies();
        } catch (error) {
            setGlobalError('Error saving settings.');
        }
    };

    const handleUpdateExchangeRates = async () => {
        if (defaultCurrencyId) {
            await fetchRates(defaultCurrencyId);
        }
    };

    const handleAddNewCurrency = () => {
        setCurrencyToEdit(null);
        setIsDialogOpen(true);
    };

    const handleEditCurrency = (currency) => {
        const rate = rates.find(r => r.currencyId === currency.id);
        setCurrencyToEdit({ ...currency, exchangeRate: rate ? rate.exchangeRate : 1 });
        setIsDialogOpen(true);
    };

    const handleSaveCurrency = async (currencyData) => {
        try {
            let savedCurrency;
            if (currencyToEdit) {
                savedCurrency = await updateCurrency(currencyToEdit.id, currencyData);
            } else {
                savedCurrency = await createCurrency(currencyData);
            }

            // Create or update the rate
            const rateValue = currencyData.exchangeRate || 1;
            const createRateRequest: CreateRateRequest = {
                currencyId: savedCurrency.id,
                exchangeRate: rateValue,
            };
            await createRate(createRateRequest);

            await fetchCurrencies(); // Refresh the currency list
            setIsDialogOpen(false);
            setSuccessMessage('Currency saved successfully.');
        } catch (error) {
            setGlobalError('Error saving currency.');
        }
    };

    const handleDeleteCurrency = async (currency) => {
        if (!window.confirm(`Are you sure you want to delete the currency "${currency.name}"?`)) {
            return;
        }

        try {
            await deleteCurrency(currency.id);
            await fetchCurrencies();
            setSuccessMessage(`Currency ${currency.name} deleted successfully.`);
        } catch (error) {
            setGlobalError('Error deleting currency.');
        }
    };

    const handleCancelSettings = async () => {
        await fetchCurrencies();
        const { symbolPosition: newSymbolPosition, decimalPlaces: newDecimalPlaces } = await getCurrencyFormatById();
        setSymbolPosition(newSymbolPosition || 'before');
        setDecimalPlaces(newDecimalPlaces || 2);
        
        // Ensure we're using the correct default currency
        const defaultCurrencyData = currencies.find(c => c.isDefault);
        if (defaultCurrencyData) {
            setDefaultCurrency(defaultCurrencyData.code);
            updateFormatExample(defaultCurrencyData.code, newSymbolPosition || 'before', newDecimalPlaces || 2);
        }
        
        setHasChanges(false);
    };

    return (
        <div className="p-4 text-gray-800">
            <h1 className="text-2xl font-bold mb-4 text-gray-900">Currency Settings</h1>
            <GlobalError message={globalError} />
            <GlobalSuccess message={successMessage} />
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2 text-gray-900">Default Currency</h2>
                <Select
                    value={defaultCurrency}
                    onChange={handleDefaultCurrencyChange}
                    className="w-full max-w-xs sm:max-w-md md:max-w-lg"
                >
                    {currencies.map((currency) => (
                        <option key={currency.code} value={currency.code}>
                            {currency.name} ({currency.code})
                        </option>
                    ))}
                </Select>
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2 text-gray-900">Currency Format</h2>
                <div className="space-y-4">
                    <div className="flex flex-col md:flex-row md:space-x-8">
                        <div className="w-full max-w-xs md:max-w-sm">
                            <label className="block text-gray-700 mb-1">
                                Symbol Position:
                            </label>
                            <Select
                                value={symbolPosition}
                                onChange={handleSymbolPositionChange}
                                className="w-full"
                            >
                                <option value="before">Before</option>
                                <option value="after">After</option>
                            </Select>
                        </div>
                        <div className="w-full max-w-xs md:max-w-sm mt-4 md:mt-0">
                            <label className="block text-gray-700 mb-1">
                                Decimal Places:
                            </label>
                            <Input
                                type="number"
                                value={decimalPlaces}
                                onChange={handleDecimalPlacesChange}
                                min={0}
                                max={4}
                                className="w-16"
                            />
                        </div>
                    </div>
                    <div className="text-gray-700">
                        Format Example: <span className="font-bold">{formatExample}</span>
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2 text-gray-900">Manage Currencies</h2>
                <div className="mb-4">
                    <Button onClick={handleAddNewCurrency}>Add New Currency</Button>
                </div>
            </div>

            {/* Scrollable table container */}
            <div className="overflow-x-auto max-w-full">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Currency Name</TableHead>
                            <TableHead>Symbol</TableHead>
                            <TableHead>Code</TableHead>
                            <TableHead>
                                Exchange Rate
                                <Button
                                    onClick={handleUpdateExchangeRates}
                                    className="ml-2 p-1 hover:bg-gray-100 hover:text-gray-700 rounded-full inline-flex items-center"
                                >
                                    <RefreshCw size={16} />
                                </Button>
                            </TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currencies.map((currency) => {
                            const rate = rates.find(r => r.currencyId === currency.id);
                            return (
                                <TableRow key={currency.code}>
                                    <TableCell>
                                        {currency.name}
                                        {currency.isDefault && (
                                            <span className="ml-2 inline-block bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                                                Default
                                            </span>
                                        )}
                                    </TableCell>
                                    <TableCell>{currency.symbol}</TableCell>
                                    <TableCell>{currency.code}</TableCell>
                                    <TableCell>{rate ? rate.exchangeRate.toString() : 'N/A'}</TableCell>
                                    <TableCell>
                                        <Button
                                            onClick={() => handleEditCurrency(currency)}
                                            className="mr-2 text-sm sm:text-xs"
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            onClick={() => handleDeleteCurrency(currency)}
                                            className="text-sm mt-2 sm:text-xs"
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center mt-6">
                {hasChanges && (
                    <>
                        <Button onClick={handleSaveSettings} className="mb-2 sm:mb-0 sm:mr-4">
                            Save Settings
                        </Button>
                        <button
                            onClick={handleCancelSettings}
                            className="text-blue-500 underline focus:outline-none"
                        >
                            Cancel
                        </button>
                    </>
                )}
            </div>

            <CurrencyDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onSave={handleSaveCurrency}
                currencyToEdit={currencyToEdit}
            />
        </div>
    );
}