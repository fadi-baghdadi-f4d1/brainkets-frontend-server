"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { FaWindowClose } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { getClients } from '../../services/projects/GetAllClients';
// import defaultProfile from "../../../../public/Frame 8520.png";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface Client {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  image: string;
}

interface SelectClientModalProps {
  toggleModal: () => void;
  onSelectUsers: (selectedClients: Client[]) => void;
  selectedClients: Set<string>;
}

const SelectClientModal: React.FC<SelectClientModalProps> = ({ toggleModal, onSelectUsers, selectedClients }) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedClientsState, setSelectedClientsState] = useState<Set<string>>(new Set(selectedClients));
  const searchInputRef = useRef<HTMLInputElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedClientsState(new Set(selectedClients));
  }, [selectedClients]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        const newClients = await getClients(page, searchTerm);
        setClients(prevClients => page === 1 ? newClients : [...prevClients, ...newClients]);
        setHasMore(newClients.length > 0);
      } catch (error) {
        console.error('Failed to fetch clients:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, [page, searchTerm]);

  useEffect(() => {
    setPage(1);
    setClients([]);
  }, [searchTerm]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage(prevPage => prevPage + 1);
        }
      },
      { threshold: 0.1 }
    );
  
    const currentLoaderRef = loaderRef.current; // Create a local variable
  
    if (currentLoaderRef) {
      observer.observe(currentLoaderRef);
    }
  
    return () => {
      if (currentLoaderRef) {
        observer.unobserve(currentLoaderRef);
      }
    };
  }, [loading, hasMore]); // Ensure dependencies are correct
  
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleClientSelect = (clientId: string) => {
    setSelectedClientsState(prevSelected => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(clientId)) {
        newSelected.delete(clientId);
      } else {
        newSelected.add(clientId);
      }
      const updatedSelectedClients = clients.filter(client => newSelected.has(client.id));
      onSelectUsers(updatedSelectedClients);
      return newSelected;
    });
  };

  return (
    <div className="bg-[#F4F4F4] z-80 h-screen shadow-lg w-[400px] flex flex-col">
      <div className='bg-white px-6 flex items-center h-16 p-2 w-full'>
        <FaWindowClose className="text-3xl cursor-pointer" onClick={toggleModal} />
        <h2 className="flex-grow text-center text-xl font-bold">Select User</h2>
      </div>
      <div className="relative m-5 mb-4">
        <IoSearchOutline className="text-3xl text-[#606060] absolute left-3 top-3 w-5 h-5" />
        <input
          type="text"
          placeholder="Start typing to search"
          ref={searchInputRef}
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full text-[#606060] border border-[#C4C4C4] rounded-lg p-2 pl-10"
        />
      </div>
      <div className="flex-grow mx-4 overflow-y-auto custom-scrollbar">
        {loading && clients.length === 0 ? (
          Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="mb-2">
              <Skeleton height={30} />
            </div>
          ))
        ) : (
          <>
            {clients.length === 0 ? (
              <p>No clients available</p>
            ) : (
              clients.map((client) => (
                <div key={client.id} className="flex items-center justify-between mb-2 px-2">
                  <div className="flex items-center w-full py-2">
                    <Image 
                      src={client.image}
                      alt={client.userName} 
                      width={40} 
                      height={40} 
                      className="rounded-full mr-2 w-[40px] h-[40px]" 
                    />
                    <span className='font-medium'>{client.firstName} {client.lastName}</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={selectedClientsState.has(client.id)}
                    onChange={() => handleClientSelect(client.id)}
                    className="w-5 h-5 cursor-pointer"
                  />
                </div>
              ))
            )}
            <div ref={loaderRef} className="flex justify-center items-center h-12">
              {loading && hasMore && (
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SelectClientModal;
