import React from 'react';
import Image from 'next/image'
import user from '../../../public/user1.png'
import FinanceDropdown from './dropdown/FinanceDropdown';

const transactions = [
  { amount: '1,000$', description: 'Lorem ipsum dolor sit amet consectetur. Senectus cum nulla est sit nibh et lacus. Maecenas a fringilla egestas quis blandit.', date: 'Mar 25, 2024', time: '04:00PM', user: 'M.Zayat', type: 'Income', status: 'Received' },
  { amount: '500$', description: 'Lorem ipsum dolor sit amet consectetur. Senectus cum nulla est sit nibh et lacus. Maecenas a fringilla egestas quis blandit.', date: 'Mar 25, 2024', time: '12:10PM', user: 'M.Zayat', type: 'Expenses', status: 'Paid' },
  { amount: '1,000$', description: 'Lorem ipsum dolor sit amet consectetur. Senectus cum nulla est sit nibh et lacus. Maecenas a fringilla egestas quis blandit.', date: 'Mar 20, 2024', time: '04:30PM', user: 'M.Zayat', type: 'Income', status: 'Received' },
  { amount: '1,000$', description: 'Lorem ipsum dolor sit amet consectetur. Senectus cum nulla est sit nibh et lacus. Maecenas a fringilla egestas quis blandit.', date: 'Mar 18, 2024', time: '03:00PM', user: 'M.Zayat', type: 'Income', status: 'Received' },
  { amount: '2,500$', description: 'Lorem ipsum dolor sit amet consectetur. Senectus cum nulla est sit nibh et lacus. Maecenas a fringilla egestas quis blandit.', date: 'Mar 15, 2024', time: '12:10PM', user: 'M.Zayat', type: 'Expenses', status: 'Paid' },
  { amount: '500$', description: 'Lorem ipsum dolor sit amet consectetur. Senectus cum nulla est sit nibh et lacus. Maecenas a fringilla egestas quis blandit.', date: 'Mar 15, 2024', time: '04:30PM', user: 'M.Zayat', type: 'Income', status: 'Received' },
  { amount: '1,000$', description: 'Lorem ipsum dolor sit amet consectetur. Senectus cum nulla est sit nibh et lacus. Maecenas a fringilla egestas quis blandit.', date: 'Mar 22, 2024', time: '09:00AM', user: 'M.Zayat', type: 'Income', status: 'Received' },
  { amount: '1,000$', description: 'Lorem ipsum dolor sit amet consectetur. Senectus cum nulla est sit nibh et lacus. Maecenas a fringilla egestas quis blandit.', date: 'Mar 18, 2024', time: '10:00AM', user: 'M.Zayat', type: 'Income', status: 'Received' },
  { amount: '500$', description: 'Lorem ipsum dolor sit amet consectetur. Senectus cum nulla est sit nibh et lacus. Maecenas a fringilla egestas quis blandit.', date: 'Mar 10, 2024', time: '02:00PM', user: 'M.Zayat', type: 'Income', status: 'Received' },
];

const GridFinance: React.FC = () => {
  return (
    <section className='mx-4 md:mx-10 my-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      
        {transactions.map((transaction, index) => (
          <div key={index} className="border bg-white h-auto rounded-lg p-4 shadow-md relative">
            <div className="flex justify-between">
              <div>
              Amount : <span className='font-bold'>{transaction.amount}</span>
              </div>
              <div className='flex space-x-2'>
                <Image src={user}
                width={30} 
                height={20} 
                alt='user' 
                className='rounded-full'/>

                <span className="font-medium">{transaction.user}</span>
                
              </div>
              <div>
                <FinanceDropdown entityId={123} entityType="finance"  />
                </div>
            </div>
            <p className="mt-2 text-sm">Description : 
                <span className='font-medium ml-1'>{transaction.description}</span></p>
            <div className="flex justify-between mt-4">
                <div className='flex space-x-2'>
              <span className={`flex justify-center items-center px-2 rounded font-medium text-[12px] ${transaction.type === 'Income' ? 'bg-[#19B600] bg-opacity-15 text-[#19B600]' : 
                'bg-[#CC0000] bg-opacity-15 text-[#CC0000]'}`}>{transaction.type}</span>
              <span className={`flex justify-center items-center px-2 rounded font-medium text-[12px] ${transaction.status === 'Received' ? 'bg-yellow-500' : 'bg-yellow-500'}`}>{transaction.status}</span>
            </div>
           
              <div className='text-[#404040] text-sm'>
                {transaction.date} {transaction.time}
                </div>
            </div>
          </div>
        ))}
    
    </section>
  );
}

export default GridFinance;
