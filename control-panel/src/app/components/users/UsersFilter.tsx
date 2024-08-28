import React, { useState } from 'react';

interface UsersFilterProps {
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
  setSearchQuery: (query: string) => void; // Add this prop to update search query
}

const UsersFilter: React.FC<UsersFilterProps> = ({ selectedFilter, setSelectedFilter, setSearchQuery }) => {
  const [searchInput, setSearchInput] = useState<string>('');

  const options = [
    { label: 'All', value: '', color: '#F9781D'  }, 
    { label: 'Employee', value: 'employee', color: '#FFC700'  },
    { label: 'Client', value: 'client', color: '#57A4FF' },
    { label: 'Partner', value: 'partner', color: '#BB6CF9'  },
  ];

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchInput(query);
    setSearchQuery(query); // Update the search query in parent component
  };

  return (
    <div className='hidden pt-4 xl:flex lg:flex space-x-4 col-span-2 mx-10'>
      {options.map((option) => (
        <div
          key={option.value}
          className={`w-[370px] h-[60px] rounded-md flex justify-center items-center text-center
             px-[30px] py-[10px] cursor-pointer hover:shadow-md
          ${selectedFilter === option.value ? 'border border-[#606060]' : ''}
          `}
          style={{
            backgroundColor: `${option.color || '#F9781D'}26`,
            color: option.color || '#F9781D',
          }}
          onClick={() => handleFilterChange(option.value)}
        >
          {option.label}
        </div>
      ))}
    </div>
  );
};

export default UsersFilter;
