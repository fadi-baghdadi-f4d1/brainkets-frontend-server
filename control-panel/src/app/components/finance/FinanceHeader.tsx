import React from "react";
import Image from "next/image";
import financeIcon from "../../../public/finance.svg";
import { LuPlus } from "react-icons/lu";
import setting from "../../../public/setting2.svg";
import calendar from "../../../public/calendar2.svg";
import squareList from "../../../public/squares.svg";
import list from "../../../public/list.svg";
import DropdownCategory from "./dropdown/DropdownCategory";

interface FinanceHeaderProps {
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  toggleAddFinanceModal: () => void; 
}

const FinanceHeader: React.FC<FinanceHeaderProps> = ({ viewMode, setViewMode, toggleAddFinanceModal }) => {
  return (
    <div>
      <div className="flex justify-center lg:justify-start mt-[20px] border-b-[1px] border-[#C4C4C4] pb-[5px]">
        <Image
          src={financeIcon}
          alt="Finance"
          width={50}
          height={50}
          className="lg:ml-7 -mt-1"
        />
        <span className="font-semibold text-[20px]">Finance</span>
      </div>

      <div className="flex flex-row justify-between mt-5 mx-4 md:mx-10 items-center">
        {/* Button for small screens */}
        <div
          className="md:hidden flex items-center justify-center w-[50px] h-[50px] bg-[#FDC90E] rounded-full cursor-pointer"
          onClick={toggleAddFinanceModal}
        >
          <LuPlus className="text-[24px]" />
        </div>

        {/* Button for larger screens */}
        <div
          className="hidden md:flex items-center justify-center w-[145px] h-[40px] bg-[#FDC90E] rounded-md px-3 cursor-pointer hover:bg-black hover:text-[#FDC90E]"
          onClick={toggleAddFinanceModal}
        >
          <LuPlus className="-ml-1 hover:text-[#FDC90E] font-semibold text-[20px]" />
          <span className="font-semibold text-[15px]">Add Finance</span>
        </div>

        <div className="flex space-x-5 mt-4 lg:mt-0">
          <div className="hidden lg:flex space-x-5">
            <DropdownCategory />

            <div>
              <select className="w-full p-2 border border-[#C4C4C4] rounded-md bg-white">
                <option value="" disabled selected>
                  All (currency)
                </option>
              </select>
            </div>

            <div>
              <select className="w-full p-2 border border-[#C4C4C4] rounded-md bg-white">
                <option value="" disabled selected>
                  Category
                </option>
              </select>
            </div>

            <div>
              <select className="w-full p-2 border border-[#C4C4C4] rounded-md bg-white">
                <option value="" disabled selected>
                  Mar 2024
                </option>
              </select>
            </div>
          </div>

          <div className="w-10 h-10 bg-[#E4E4E4] rounded-md flex justify-center items-center">
            <Image src={calendar} alt="Calendar" width={20} height={20} />
          </div>

          <div className="flex items-center space-x-1">
            <button
              className={`rounded-l-md p-3 border ${
                viewMode === 'grid' ? 'bg-[#FDC90E] bg-opacity-30 border-[#FDC90E]' : 'bg-[#E4E4E4]'
              }`}
              onClick={() => setViewMode('grid')}
            >
              <Image src={squareList} alt="Grid View" width={20} height={16} />
            </button>
            <button
              className={`rounded-r-md p-2 border ${
                viewMode === 'list' ? 'bg-[#FDC90E] bg-opacity-30 border-[#FDC90E]' : 'bg-[#E4E4E4]'
              }`}
              onClick={() => setViewMode('list')}
            >
              <Image src={list} alt="List View" width={24} height={24} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex mx-4 md:mx-10 lg:hidden space-x-5 mt-4 overflow-x-auto">
        <div className="z-40">
          <DropdownCategory />
        </div>

        <div className="min-w-40">
          <select className="w-full p-2 border border-[#C4C4C4] rounded-md bg-white">
            <option value="" disabled selected>
              All (currency)
            </option>
          </select>
        </div>

        <div className="min-w-40">
          <select className="w-full p-2 border border-[#C4C4C4] rounded-md bg-white">
            <option value="" disabled selected>
              Category
            </option>
          </select>
        </div>

        <div className="min-w-40">
          <select className="w-full p-2 border border-[#C4C4C4] rounded-md bg-white">
            <option value="" disabled selected>
              Mar 2024
            </option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FinanceHeader;
