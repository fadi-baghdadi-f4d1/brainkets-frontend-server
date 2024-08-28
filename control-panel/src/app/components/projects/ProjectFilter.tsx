import React from 'react';

interface ProjectFilterProps {
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}

const ProjectFilter: React.FC<ProjectFilterProps> = ({ selectedFilter, onFilterChange }) => {
  const filters = [
    { label: 'All', color: '' },
    { label: 'Completed', color: '#19B600' },
    { label: 'In Progress', color: '#57A4FF' },
    { label: 'Not Started', color: '#999999' },
    { label: 'On Hold', color: '#CC0000' },
  ];

  const handleFilterClick = (filter: string) => {
    const filterValue = filter === 'All' ? '' : filter.toLowerCase(); // Send empty string for "All"
    onFilterChange(filterValue);
  };

  return (
    <div className='mt-5 mx-4 md:mx-10 flex justify-between space-x-2 overflow-x-auto xl:overflow-hidden lg:overflow-hidden whitespace-nowrap'>
      {filters.map((filter) => (
        <div
          key={filter.label}
          onClick={() => handleFilterClick(filter.label)} // Use handleFilterClick function
          className={`w-[150px] lg:w-[250px] h-[60px] flex-shrink-0 flex justify-center items-center
             bg-white rounded-md font-bold cursor-pointer ${
            selectedFilter === (filter.label === 'All' ? '' : filter.label.toLowerCase()) ? 'border-2 border-solid border-[#606060]' : '' // Handle empty string comparison
          }`}
        >
          {filter.color && (
            <div className={`w-[20px] h-[20px] rounded-full mr-[10px]`} style={{ backgroundColor: filter.color }}></div>
          )}
          <span className='font-bold'>{filter.label}</span>
        </div>
      ))}
    </div>
  );
};

export default ProjectFilter;
