import React, { useState, useEffect, useRef } from "react";
import { FaWindowClose } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { HiPlus } from "react-icons/hi";
import SelectCategoryForm from './SelectFinanceCategory'; // Ensure this path is correct
import CreateFinanceCategoryForm from './CreateFinanceCategoryForm'; // Ensure this path is correct
import { getCurrencies } from '../../../services/finance/GetCurrency'; // Update the path as needed
import { createFinance } from '../../../services/finance/CreateFinance'; // Update the path as needed
import { toast } from 'react-toastify'; // Assuming you're using react-toastify

interface AddFinanceFormProps {
  onClose: () => void; // Ensure the prop name matches
}

interface Currency {
  id: number;
  code: string;
}

const AddFinanceForm: React.FC<AddFinanceFormProps> = ({ onClose }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<{ id: number, name: string } | null>(null);
  const amountInputRef = useRef<HTMLInputElement>(null);
  const [amount, setAmount] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [isReceived, setIsReceived] = useState<boolean>(false);

  useEffect(() => {
    if (amountInputRef.current) {
      amountInputRef.current.focus();
    }
  }, []);

  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
  const [currency, setCurrency] = useState<Currency | null>(null);
  const [isCurrencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [transactionType, setTransactionType] = useState('Income');

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const data = await getCurrencies();
        setCurrencies(data); // Adjust based on API response structure
      } catch (error) {
        console.error('Error fetching currencies:', error);
      }
    };

    fetchCurrencies();
  }, []);

  const handleCurrencySelect = (selectedCurrency: Currency) => {
    setCurrency(selectedCurrency);
    setCurrencyDropdownOpen(false);
  };

  const handleCategorySelect = (categoryId: number, categoryName: string) => {
    setSelectedCategory({ id: categoryId, name: categoryName });
  };

  const toggleSelectCategoryModal = () => {
    setShowCategoryForm(true);
  };

  const handleAddCategoryClick = () => {
    setShowAddCategoryForm(true);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!amount) {
      toast.error("Please enter an amount.");
      return;
    }

    if (!currency) {
      toast.error("Please select a currency.");
      return;
    }

    if (!description) {
      toast.error("Please enter a description.");
      return;
    }

    if (!selectedCategory) {
      toast.error("Please select a category.");
      return;
    }
    
    
    if (!date) {
      toast.error("Please select a date.");
      return;
    }
    
    

    const payload = {
      categoryId: selectedCategory.id,
      type: transactionType,
      amount: parseFloat(amount),
      description,
      currencyId: currency.id, // Use currency ID here
      date,
      definer: undefined, // Add if needed
      isReceived,
    };

    try {
      await createFinance(payload);
      toast.success("Finance record created successfully");
      onClose(); // Close the form on success
    } catch (error) {
      toast.error(`Failed to create finance record`);
    }
  };

  return (
    <div className="fixed inset-0 top-0 left-0 min-h-screen flex items-end justify-end z-50">
      <div className="bg-[#F4F4F4] w-[650px] max-w-lg min-h-screen relative">
        {/* Header */}
        <div className='flex px-2 py-4 md:px-[30px] bg-white border-b border-b-[#E4E4E4] justify-between items-center'>
          <FaWindowClose onClick={onClose} className='text-3xl cursor-pointer' />
          <h2 className="text-center text-[20px] font-bold mt-1">Finance</h2>
          <button 
            className="bg-[#FDC90E] hover:bg-black hover:text-[#FDC90E] text-black font-semibold rounded-lg py-2 px-10"
            onClick={handleSubmit} // Call handleSubmit on click
          >
            Save
          </button>
        </div>
        <div className="bg-[#F4F4F4] px-2 md:px-[30px] py-[15px] w-full h-[calc(100vh-70px)] overflow-y-auto">
          <form className="space-y-4">
            <div className="flex justify-between space-x-7">
              <div
                className={`flex justify-center items-center w-[150px] md:w-[280px] h-[50px] rounded-md bg-[#19B600] bg-opacity-15
                   text-[#19B600] 
              ${transactionType === 'Income' ? `border-2 border-[#606060]` : 'border border-transparent'} font-semibold text-[20px]
                  cursor-pointer`}
                onClick={() => setTransactionType('Income')}
              >
                <input type="radio" name="transactionType" value="Income" checked={transactionType === 'Income'} onChange={() => setTransactionType('Income')} className="hidden" />
                Income
              </div>
              <div
                className={`flex justify-center items-center w-[150px] md:w-[280px] h-[50px] rounded-md bg-[#CC0000] bg-opacity-15 text-[#CC0000]
               ${transactionType === 'Expenses' ? `border-2 border-[#606060]` : 'border border-transparent'} font-semibold text-[20px] cursor-pointer`}
                onClick={() => setTransactionType('Expenses')}
              >
                <input type="radio" name="transactionType" value="Expenses" checked={transactionType === 'Expenses'} onChange={() => setTransactionType('Expenses')} className="hidden" />
                Expenses
              </div>
            </div>
            <div className="flex flex-col space-y-7">
              <div>
                <div className="flex flex-row justify-between">
                <label className="block font-bold">Amount <span className='text-[#FF0000]'>*</span></label>
                  <div className="relative">
                    <button
                      type="button"
                      className="flex flex-row justify-between items-center mb-4 px-4 py-1 bg-white shadow-md rounded-md border
                       border-gray-300"
                      onClick={() => setCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
                    >
                      {currency ? currency.code : 'Select Currency'}
                      {isCurrencyDropdownOpen ? <IoIosArrowUp className="ml-2" /> : <IoIosArrowDown className="ml-2" />}
                    </button>
                    <div
                      className={`transition-all duration-300 ease-out transform origin-top 
                        ${isCurrencyDropdownOpen ? 'scale-y-100 opacity-100 shadow-lg' : 'scale-y-0 opacity-0'} 
                        absolute right-0 top-7 w-full bg-white rounded-b-md z-10 border border-gray-300 border-t-0 overflow-hidden`}
                    >
                      <ul>
                        {currencies.map((currencyItem) => (
                          <li
                            key={currencyItem.code}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-200 border-b border-[#C4C4C4] last:border-0 mx-2"
                            onClick={() => handleCurrencySelect(currencyItem)}
                          >
                            {currencyItem.code}
                          </li>
                        ))}
                      </ul>
                      </div>
                    
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    ref={amountInputRef}
                  />
                </div>
              </div>
              <div>
                <label className="block font-bold mb-1">Description <span className='text-[#FF0000]'>*</span></label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div>
                <label className="block font-bold mb-1">Category <span className='text-[#FF0000]'>*</span></label>
                <div className="flex">
                  <div
                    onClick={toggleSelectCategoryModal}
                    className="w-full flex flex-row justify-between px-2 bg-white py-2 border rounded-md cursor-pointer"
                  >
                    {selectedCategory ? selectedCategory.name : 'Select Category'}
                    <IoIosArrowDown size={20} className="text-black mt-1" />
                  </div>
                  <button
                    type="button"
                    className="flex justify-center items-center ml-2 p-1 mt-2 w-[30px] h-[30px] bg-black rounded-md text-white"
                    onClick={handleAddCategoryClick}
                  >
                    <HiPlus size={30} className="font-bold" />
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-black font-bold mb-1">Date <span className='text-[#FF0000]'>*</span></label>
                <div className="flex items-center">
                  <input
                    type="date"
                    className="w-full px-2 py-2 border rounded-md bg-white"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  className="mt-1 mr-2 w-5 h-5 border border-[#999999] rounded-sm"
                  checked={isReceived}
                  onChange={(e) => setIsReceived(e.target.checked)}
                />
                <label className="flex flex-row justify-start place-items-start font-bold">
                  {transactionType === 'Income' ? 'Is Received?' : 'Is Paid?'}
                </label>
              </div>
              <div>
                {/* <FileAttachment selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} /> */}
              </div>
            </div>
          </form>
        </div>
        {showCategoryForm && (
          <div className="fixed inset-0 flex items-center justify-end bg-black bg-opacity-50 z-50">
            <SelectCategoryForm 
              toggleModal={() => setShowCategoryForm(false)}
              onSelect={handleCategorySelect}
              selectedCategoryId={selectedCategory?.id}
            />
          </div>
        )}
        {showAddCategoryForm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg relative">
              <CreateFinanceCategoryForm 
                onClose={() => setShowAddCategoryForm(false)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddFinanceForm;
