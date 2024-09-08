import React, { useState, useEffect } from 'react';
import * as yup from 'yup';

interface ButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset'; // Specify the allowed types for the button
}

// Basic UI components (reusing from the main page)
const Button: React.FC<ButtonProps> = ({ onClick, children, className = '', type = 'button' }) => (
  <button
    type={type}
    onClick={onClick}
    className={`bg-blue-500 text-white px-4 py-2 rounded ${className}`}
  >
    {children}
  </button>
);

interface InputProps {
  type: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  id: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({ type, value, onChange, name, id, className = '' }) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    name={name}
    id={id}
    className={`border rounded px-2 py-1 text-gray-800 ${className}`}
  />
);

interface CurrencyData {
  name: string;
  code: string;
  symbol: string;
  isDefault: boolean;
  exchangeRate: number;
}

interface CurrencyDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (currencyData: CurrencyData) => void;
  currencyToEdit: CurrencyData | null;
}

// Validation schema using yup
const currencySchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  code: yup.string().required('Code is required'),
  symbol: yup.string().required('Symbol is required'),
  exchangeRate: yup.number().min(0, 'Exchange Rate must be a positive number').required('Exchange Rate is required'),
});

const CurrencyDialog: React.FC<CurrencyDialogProps> = ({ isOpen, onClose, onSave, currencyToEdit }) => {
  const [currencyData, setCurrencyData] = useState<CurrencyData>({
    name: '',
    code: '',
    symbol: '',
    isDefault: false,
    exchangeRate: 1,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (currencyToEdit) {
      setCurrencyData(currencyToEdit);
    } else {
      setCurrencyData({
        name: '',
        code: '',
        symbol: '',
        isDefault: false,
        exchangeRate: 1,
      });
    }
  }, [currencyToEdit]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrencyData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validate currencyData
      await currencySchema.validate(currencyData, { abortEarly: false });

      // If validation passes, save the data
      onSave(currencyData);
      onClose();
    } catch (validationErrors) {
      // If validation fails, collect error messages
      const errorMessages = {};
      validationErrors.inner.forEach((error) => {
        errorMessages[error.path] = error.message;
      });
      setErrors(errorMessages);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">
          {currencyToEdit ? 'Edit Currency' : 'Add New Currency'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              value={currencyData.name}
              onChange={handleInputChange}
              className="w-full"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="code">
              Code
            </label>
            <Input
              id="code"
              name="code"
              type="text"
              value={currencyData.code}
              onChange={handleInputChange}
              className="w-full"
            />
            {errors.code && <p className="text-red-500 text-sm">{errors.code}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="symbol">
              Symbol
            </label>
            <Input
              id="symbol"
              name="symbol"
              type="text"
              value={currencyData.symbol}
              onChange={handleInputChange}
              className="w-full"
            />
            {errors.symbol && <p className="text-red-500 text-sm">{errors.symbol}</p>}

          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="isDefault">
              Is Default
            </label>
            <input
              id="isDefault"
              name="isDefault"
              type="checkbox" // Use checkbox input
              checked={currencyData.isDefault} // Bind to currencyData.isDefault
              onChange={handleInputChange}
              className="mr-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="exchangeRate">
              Exchange Rate
            </label>
            <Input
              id="exchangeRate"
              name="exchangeRate"
              type="number"
              value={currencyData.exchangeRate}
              onChange={handleInputChange}
              className="w-full"
            />
            {errors.exchangeRate && <p className="text-red-500 text-sm">{errors.exchangeRate}</p>}

          </div>
          <div className="flex justify-end">
            <Button onClick={onClose} className="mr-2 bg-gray-500">
              Cancel
            </Button>
            <Button type="submit">
              {currencyToEdit ? 'Update' : 'Add'} Currency
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default CurrencyDialog;