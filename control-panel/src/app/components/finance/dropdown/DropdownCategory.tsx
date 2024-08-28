// components/Dropdown.tsx
import React, { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";

const Dropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    'General',
    'Nasif eshterakat',
    'Accounting system',
    'Projects',
    'Menu Mind',
    'Office Stationery',
    'Salaries',
    'Renting'
  ];

  const filteredCategories = categories.filter(category =>
    category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative w-64">
      <div
        className={`bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer p-2 flex justify-between items-center 
          ${isOpen ? 'border-b-0 rounded-b-none' : ''}`}
        onClick={toggleDropdown}
      >
        <span className='font-medium text-[15px]'>Category</span>
        <span>{isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
      </div>
      <div
        className={`transition-all duration-300 ease-out transform origin-top 
          ${isOpen ? 'scale-y-100 opacity-100 shadow-lg' : 'scale-y-0 opacity-0'} 
          absolute right-0 w-full bg-white rounded-md rounded-t-none overflow-hidden z-10 border border-gray-300 border-t-0`}
      >
        <div className="p-2 relative">
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 bg-[#F4F4F4] rounded-xl"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <div className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400'>
            <IoSearchOutline />
          </div>
        </div>
        <ul className="">
          {filteredCategories.map((category, index) => (
            <li
              key={index}
              className="mx-2 px-4 py-2 hover:bg-gray-100 cursor-pointer font-medium text-[15px] border-b border-[#C4C4C4] last:border-0"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
