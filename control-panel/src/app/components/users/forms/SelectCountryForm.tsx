import React, { useState, useRef, useEffect } from 'react';
import { FaWindowClose } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { getCountries } from '../../../services/home/countries/GetCountriesApi'; 

interface Country {
  id: number;
  name: string;
  iso: string;
}

interface SelectCountryFormProps {
  toggleModal: () => void;
  onSelect: (countryId: number, countryName: string) => void; 
  selectedCountryId?: number; // Prop to receive the selected country ID
}

const SelectCountryForm: React.FC<SelectCountryFormProps> = ({ toggleModal, onSelect, selectedCountryId }) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null); // State for selected country
  const countriesInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const { countries: newCountries, isEnd } = await getCountries(page, searchTerm);
        setCountries(prevCountries => page === 1 ? newCountries : [...prevCountries, ...newCountries]);
        setHasMore(!isEnd);
      } catch (error) {
        console.error('Failed to fetch countries', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, [page, searchTerm]);

  useEffect(() => {
    setPage(1);
    setCountries([]);
  }, [searchTerm]);

  useEffect(() => {
    // Update selected country whenever the country list or selectedCountryId changes
    if (selectedCountryId !== undefined) {
      const country = countries.find(c => c.id === selectedCountryId);
      setSelectedCountry(country || null);
    }
  }, [countries, selectedCountryId]);

  const handleCountryClick = (country: Country) => {
    onSelect(country.id, country.name);
    toggleModal();
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="bg-[#F4F4F4] h-screen shadow-lg w-full max-w-md flex flex-col absolute right-0">
      <div className="flex bg-white p-4 items-center mb-4">
        <FaWindowClose className="text-3xl cursor-pointer" onClick={toggleModal} />
        <h2 className="flex-grow text-center text-xl font-bold">Select Country</h2>
      </div>
      <div className="relative mx-4 m-2 mb-4">
        <IoSearchOutline className="text-3xl text-[#606060] absolute left-3 top-3 w-5 h-5" />
        <input
          type="text"
          placeholder="Start typing to search"
          ref={countriesInputRef}
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full text-[#606060] border border-[#C4C4C4] rounded-lg p-2 pl-10"
        />
      </div>
      <div className="flex-grow overflow-y-auto p-4 custom-scrollbar">
        {loading ? (
          Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="mb-2">
              <Skeleton height={30} />
            </div>
          ))
        ) : (
          <>
            {countries.map((country) => (
              <div
                key={country.id}
                className={`relative flex items-center border-b-[#C4C4C4] border-b-2 justify-between mb-2 px-2 cursor-pointer ${
                  selectedCountry?.id === country.id ? 'bg-[#e0e0e0]' : ''
                }`} // Highlight the pre-selected country
                onClick={() => handleCountryClick(country)}
              >
                <div className="flex items-center w-full py-2">
                  <span className="font-medium">{country.name}</span>
                </div>
              </div>
            ))}
            {hasMore && (
              <button
                onClick={() => setPage(prevPage => prevPage + 1)}
                className="mt-4 p-2 bg-[#FFC700] text-black rounded-md w-full"
              >
                Load More
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SelectCountryForm;
