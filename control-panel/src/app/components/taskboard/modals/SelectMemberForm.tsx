"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { FaWindowClose } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { getMembers } from '@/services/tasks/members/GetMembersApi';
// import defaultProfile from "../../../../../../public/Frame 8520.png";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Member } from "@/types/Task";


interface SelectMemberModalProps {
  toggleModal: () => void;
  onSelectMembers: (selectedMembers: Member[]) => void;
  selectedMembers: Set<string>;
  projectId: number | null;
}

const SelectMemberForm: React.FC<SelectMemberModalProps> = ({ toggleModal, onSelectMembers, selectedMembers, projectId }) => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedMembersState, setSelectedMembersState] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Convert Set<string> to a single user ID or null
    const selectedUserArray = Array.from(selectedMembers);
    const singleSelectedUser = selectedUserArray.length > 0 ? selectedUserArray[0] : null;
  
    setSelectedMembersState(singleSelectedUser);
  }, [selectedMembers]);
  
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        const response = await getMembers(page, projectId, searchTerm);
        const fetchedMembers = response.members; // Adjust based on actual API response

        if (page === 1) {
          setMembers(fetchedMembers);
        } else {
          setMembers(prevMembers => [...prevMembers, ...fetchedMembers]);
        }

        setHasMore(fetchedMembers.length > 0); // or use response.hasMore if your API provides it
      } catch (error) {
        console.error('Failed to fetch members:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [page, searchTerm, projectId]);

  useEffect(() => {
    setPage(1);
    setMembers([]);
  }, [searchTerm, projectId]);

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

  const handleUserSelect = (userId: string) => {
    const user = members.find(user => user.id === userId);
    if (user) {
      setSelectedMembersState(userId);
      onSelectMembers([user]); 
      toggleModal(); 
    }
  };
  

  

  return (
    <div className="fixed inset-0 flex items-end justify-end bg-black bg-opacity-50 z-50">
    <div className="bg-[#F4F4F4] z-80 h-screen shadow-lg w-[400px] flex flex-col">
      <div className='bg-white px-6 flex items-center h-16 p-2 w-full'>
        <FaWindowClose className="text-3xl cursor-pointer" onClick={toggleModal} />
        <h2 className="flex-grow text-center text-xl font-bold">Select Memeber</h2>
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
              members.map((user) => (
                <div key={user.id} className="flex items-center justify-between mb-2 px-2">
  <div className="flex items-center w-full py-2">
    <Image 
      src={user.image}
      alt={user.userName} 
      width={40} 
      height={40} 
      className="rounded-full mr-2 w-[40px] h-[40px]" 
    />
    <span className='font-medium'>{user.firstName} {user.lastName}</span>
  </div>
  <input
    type="radio"
    name="userSelection"
    checked={selectedMembersState === user.id}
    onChange={() => handleUserSelect(user.id)}
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
    </div>
  );
};

export default SelectMemberForm;
