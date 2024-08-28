import React from 'react'
import { HiCurrencyDollar } from "react-icons/hi2";

const FinanceFilter = () => {
  return (
    <section className='m-6 mx-4 sm:mx-6 md:mx-10 flex overflow-x-auto space-x-4'>
      
        <div className='min-w-[200px] sm:min-w-[280px] md:min-w-[320px] h-[60px] sm:h-[70px] md:h-[80px] bg-[#57A4FF] rounded-md bg-opacity-15 text-[#57A4FF] 
        flex flex-col justify-between items-start px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 font-semibold text-[14px] sm:text-[16px] md:text-[20px]'>
            <div>All</div>
            <div className='w-full flex justify-between items-center'>
              <div>3000$</div>
              <div><HiCurrencyDollar /></div>
            </div>
        </div>

        <div className='min-w-[200px] sm:min-w-[280px] md:min-w-[320px] h-[60px] sm:h-[70px] md:h-[80px] bg-[#19B600] rounded-md bg-opacity-15 text-[#19B600] 
        flex flex-col justify-between items-start px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 font-semibold text-[14px] sm:text-[16px] md:text-[20px]'>
            <div>Income</div>
            <div className='w-full flex justify-between items-center'>
              <div>6000$</div>
              <div><HiCurrencyDollar /></div>
            </div>
        </div>

        <div className='min-w-[200px] sm:min-w-[280px] md:min-w-[320px] h-[60px] sm:h-[70px] md:h-[80px] bg-[#CC0000] rounded-md bg-opacity-15 text-[#CC0000] 
        flex flex-col justify-between items-start px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 font-semibold text-[14px] sm:text-[16px] md:text-[20px]'>
            <div>Expenses</div>
            <div className='w-full flex justify-between items-center'>
              <div>3000$</div>
              <div><HiCurrencyDollar /></div>
            </div>
        </div>

        <div className='min-w-[200px] sm:min-w-[280px] md:min-w-[320px] h-[60px] sm:h-[70px] md:h-[80px] bg-[#BB6CF9] rounded-md bg-opacity-15 text-[#BB6CF9] 
        flex flex-col justify-between items-start px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 font-semibold text-[14px] sm:text-[16px] md:text-[20px]'>
            <div>Partner Percentage</div>
            <div className='w-full flex justify-between items-center'>
              <div>600$</div>
              <div><HiCurrencyDollar /></div>
            </div>
        </div>

    </section>
  )
}

export default FinanceFilter
