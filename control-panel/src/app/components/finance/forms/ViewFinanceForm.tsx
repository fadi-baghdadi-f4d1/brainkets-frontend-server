"use client";

import React, { useState, useEffect, useRef } from "react";
import { FaWindowClose } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { HiPlus } from "react-icons/hi";
import CategoryFormModal from '../../projects/forms/CategoryForm'; // Ensure this path is correct
import { useModalContext } from '@/context/ModalContext'; // Import useModalContext
import FileAttachment from '../../common/FileAttachement';

interface EditFinanceFormProps {
  onClose: () => void;
}

const ViewFinanceForm: React.FC<EditFinanceFormProps> = ({ onClose }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [isReceivedOrPaid, setIsReceivedOrPaid] = useState(false);
  const [transactionType, setTransactionType] = useState<'Income' | 'Expenses'>('Income');
  const [currency, setCurrency] = useState('USD');
  const [isCurrencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);

  const amountInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (amountInputRef.current) {
      amountInputRef.current.focus();
    }
  }, []);

  const { toggleSelectCategoryModal } = useModalContext(); // Use context here

  const handleCurrencySelect = (selectedCurrency: string) => {
    setCurrency(selectedCurrency);
    setCurrencyDropdownOpen(false);
  };

  return (
    <div>
        
    <div className="fixed inset-0 top-0 left-0 min-h-screen flex items-end justify-end z-50">
      <div className="bg-[#F4F4F4] w-[650px] max-w-lg min-h-screen relative">
        {/* Header */}
        <div className='flex p-4 bg-white border-b border-b-[#E4E4E4] justify-between items-center'>
          <FaWindowClose onClick={onClose} className='text-3xl cursor-pointer' />
          <h2 className="text-center text-[20px] font-bold mt-1">View Finance</h2>
          <button className="bg-[#FDC90E] hover:bg-black hover:text-[#FDC90E] text-black font-semibold rounded-lg py-1 px-6">
            Edit
          </button>
        </div>
        <div className="bg-[#F4F4F4] px-[30px] py-[30px] w-full h-[calc(100vh-70px)] overflow-y-auto">
          <form className="space-y-4">
            <div className="flex justify-between space-x-7">
              <div
                className={`flex justify-center items-center w-[280px] h-[50px] rounded-md bg-[#19B600] bg-opacity-15 text-[#19B600]
                  ${transactionType === 'Income' ? `border-2 border-[#606060]` : 'border border-transparent'} font-semibold text-[20px]
                  cursor-pointer`}
                onClick={() => setTransactionType('Income')}
              >
                <input type="radio" name="transactionType" value="Income" checked={transactionType === 'Income'} onChange={() => setTransactionType('Income')} className="hidden" />
                Income
              </div>
              <div
                className={`flex justify-center items-center w-[280px] h-[50px] rounded-md bg-[#CC0000] bg-opacity-15 text-[#CC0000]
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
                  <label className="block font-bold mb-1">Amount</label>
                  <div className="relative">
                    <button
                      type="button"
                      className="flex flex-row justify-between items-center my-2 px-4 bg-white shadow-md rounded-md"
                      onClick={() => setCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
                    >
                      {currency}
                      {isCurrencyDropdownOpen ? <IoIosArrowUp className="ml-2" /> : <IoIosArrowDown className="ml-2" />}
                    </button>
                    {isCurrencyDropdownOpen && (
                      <div className="absolute right-0 w-full bg-white border rounded-md shadow-lg z-10">
                        <ul>
                          <li className="px-4 py-2 cursor-pointer hover:bg-gray-200" onClick={() => handleCurrencySelect('USD')}>
                            USD
                          </li>
                          <li className="px-4 py-2 cursor-pointer hover:bg-gray-200" onClick={() => handleCurrencySelect('EUR')}>
                            EUR
                          </li>
                          <li className="px-4 py-2 cursor-pointer hover:bg-gray-200" onClick={() => handleCurrencySelect('LBP')}>
                            LBP
                          </li>
                        </ul>
                      </div>
                    )}
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
                <label className="block font-bold mb-1">Description</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-1">Category</label>
                <div className="flex">
                  <div
                    onClick={toggleSelectCategoryModal}
                    className="w-full flex flex-row justify-between px-2 bg-white py-2 border rounded-md cursor-pointer"
                  >
                    {category || 'Select Category'}
                    <IoIosArrowDown size={20} className="text-black mt-1" />
                  </div>
                  <button
                    type="button"
                    className="flex justify-center items-center ml-2 p-1 mt-2 w-[30px] h-[30px] bg-black rounded-md text-white"
                    onClick={() => setShowCategoryForm(true)}
                  >
                    <HiPlus size={30} className="font-bold" />
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-black font-bold mb-1">Date</label>
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
                  checked={isReceivedOrPaid}
                  onChange={() => setIsReceivedOrPaid(!isReceivedOrPaid)}
                />
                <label className="flex flex-row justify-start place-items-start font-bold">
                  {transactionType === 'Income' ? 'Is Received?' : 'Is Paid?'}
                </label>
              </div>
              
            </div>
          </form>
        </div>
        {showCategoryForm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg relative">
              <CategoryFormModal onClose={() => setShowCategoryForm(false)} />
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default ViewFinanceForm;
