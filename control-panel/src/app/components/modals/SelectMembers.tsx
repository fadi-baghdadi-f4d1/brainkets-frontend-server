import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { FaWindowClose } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { getMembers } from '../../services/users/getMembers/GetAllMembers';
// import defaultProfile from "../../../../../public/Frame 8520.png";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface Members {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  image: string;
}

interface SelectMembersModalProps {
  toggleModal: () => void;
  onSelectUsers: (selectedMembers: Members[]) => void;
  selectedMembers: Set<string>;
}

const SelectMembersModal: React.FC<SelectMembersModalProps> = ({ toggleModal, onSelectUsers, selectedMembers }) => {
  const [members, setMembers] = useState<Members[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedMembersState, setSelectedMembersState] = useState<Set<string>>(new Set(selectedMembers));
  const searchInputRef = useRef<HTMLInputElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedMembersState(new Set(selectedMembers));
  }, [selectedMembers]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        const newMembers = await getMembers(page, searchTerm);
        setMembers(prevMembers => page === 1 ? newMembers : [...prevMembers, ...newMembers]);
        setHasMore(newMembers.length > 0);
      } catch (error) {
        console.error('Failed to fetch members:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [page, searchTerm]);

  useEffect(() => {
    setPage(1);
    setMembers([]);
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

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loading, hasMore]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleMemberSelect = (memberId: string) => {
    setSelectedMembersState(prevSelected => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(memberId)) {
        newSelected.delete(memberId);
      } else {
        newSelected.add(memberId);
      }
      const updatedSelectedMembers = members.filter(member => newSelected.has(member.id));
      onSelectUsers(updatedSelectedMembers);
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
        {loading && members.length === 0 ? (
          Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="mb-2">
              <Skeleton height={30} />
            </div>
          ))
        ) : (
          <>
            {members.length === 0 ? (
              <p>No members available</p>
            ) : (
              members.map((member) => (
                <div key={member.id} className="flex items-center justify-between mb-2 px-2">
                  <div className="flex items-center w-full py-2">
                    <Image 
                      src={member.image}
                      alt={member.userName} 
                      width={40} 
                      height={40} 
                      className="rounded-full mr-2 w-[40px] h-[40px]" 
                    />
                    <span className='font-medium'>{member.firstName} {member.lastName}</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={selectedMembersState.has(member.id)}
                    onChange={() => handleMemberSelect(member.id)}
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

export default SelectMembersModal;
