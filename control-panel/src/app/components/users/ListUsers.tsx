"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { getUsers } from '../../services/users/userCrud/GetUsersApi';
import { CiEdit } from 'react-icons/ci';
import Swal from 'sweetalert2';
import EditUserModal from './modals/EditUserModal';
import { activateDisableUser } from '../../services/users/userCrud/ActivateDisableUserApi';
// import defaultImage from '../../../public/defaultBee.png';

type UserRole = 'Admin' | 'Employee' | 'Client' | 'Partner';

interface ListUsersProps {
  currentPage: number;
  selectedFilter: string;
  searchQuery: string;
  totalPages: number;
}
interface User {
  id: string;
  image: string;
  name: string;
  role: string;
  phone: string;
  status: string;
  userName: string;
  firstName: string;
  lastName: string;
  type: string;
  email: string | null;
  gender: string;
  isActive: boolean;
  designation?: number;
  country?: string;
}




interface ApiUser {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  role: string;
  phoneNumber: string;
  disabled: number;
  image: string;
  email: string | null;
  gender: string;
  country: string;
  designation?: number;
}

const roleColors: Record<UserRole, string> = {
  Admin: 'bg-[#F9781D] bg-opacity-15 text-[#F9781D]',
  Employee: 'bg-[#FFC700] bg-opacity-15 text-[#FFC700]',
  Client: 'bg-[#57A4FF] bg-opacity-15 text-[#57A4FF]',
  Partner: 'bg-[#BB6CF9] bg-opacity-15 text-[#BB6CF9]',
};

const getStatusColor = (status: string) => {
  return status === 'Active' ? 'bg-[#19B600] bg-opacity-15 text-[#19B600]' : 'bg-[#CC0000] bg-opacity-15 text-[#CC0000]';
};

// Skeleton loading component
// Skeleton loading component
const SkeletonRow: React.FC = () => (
  <>
    {[...Array(12)].map((_, index) => (
      <tr key={index}>
        <td className="py-6 px-4 border-b bg-gray-200 animate-pulse"></td>
        <td className="py-6 px-4 border-b bg-gray-200 animate-pulse"></td>
        <td className="py-6 px-4 border-b bg-gray-200 animate-pulse"></td>
        <td className="py-6 px-2 border-b bg-gray-200 animate-pulse"></td>
        <td className="py-6 px-2 border-b bg-gray-200 animate-pulse"></td>
        <td className="py-6 px-2 border-b bg-gray-200 animate-pulse"></td>
      </tr>
    ))}
  </>
);

const ListUsers: React.FC<ListUsersProps> = ({ currentPage, totalPages, selectedFilter, searchQuery }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showEditUserModal, setShowEditUserModal] = useState<boolean>(false);

  const fetchUsers = async (page: number, filter: string, query: string) => {
    try {
      setLoading(true);
      const response = await getUsers(page, filter, query);
      const apiUsers = response.users;

      if (Array.isArray(apiUsers)) {
        const formattedUsers = apiUsers.map((user: ApiUser) => ({
          id: user.id,
          image: user.image,
          name: `${user.firstName} ${user.lastName}`,
          role: user.role,
          phone: user.phoneNumber || '',
          status: user.disabled === 0 ? 'Active' : 'Inactive',
          type: user.role.charAt(0).toUpperCase() + user.role.slice(1) as UserRole,
          isActive: user.disabled === 0,
          userName: user.userName, // Assuming these are part of the API response
          firstName: user.firstName, // Assuming these are part of the API response
          lastName: user.lastName,
          email: user.email, // Assuming email is not available from API
          gender: user.gender // Provide default or empty value
        }));

        setUsers(formattedUsers);
        setTotalUsers(response.count || 0); // Assuming response.count is the total number of users
      } else {
        setError('Unexpected data format');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchUsers(currentPage, selectedFilter, searchQuery);
  }, [currentPage, selectedFilter, searchQuery]);

  const handleToggleStatus = async (user: User) => {
    // Disable scrolling
    document.body.style.overflow = 'hidden';
  
    const action = user.isActive ? 'deactivate' : 'activate';
    const result = await Swal.fire({
      title: `Are you sure you want to ${action} this user?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      customClass: {
        confirmButton: 'custom-ok-button',
        cancelButton: 'custom-ok-button'
      }
    });
  
    // Enable scrolling after the Swal alert is closed
    document.body.style.overflow = 'auto';
  
    if (result.isConfirmed) {
      try {
        await activateDisableUser({ id: user.id, activate: !user.isActive });
        Swal.fire({
          title: `User ${action}d successfully`,
          icon: 'success',
        });
        fetchUsers(currentPage, selectedFilter, searchQuery);
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'Failed to update user status',
          icon: 'error',
          customClass: {
            confirmButton: 'custom-ok-button'
          }
        });
      }
    }
  };
  

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setShowEditUserModal(true);
  };

  const closeEditUserModal = () => {
    setShowEditUserModal(false);
    setSelectedUser(null);
  };

  const roleColors: Record<UserRole, string> = {
    Admin: 'text-[#F9781D] bg-[#F9781D] bg-opacity-15',
    Employee: 'text-[#FFC700] bg-[#FFC700] bg-opacity-15',
    Client: 'text-[#57A4FF] bg-[#57A4FF] bg-opacity-15',
    Partner: 'text-[#BB6CF9] bg-[#BB6CF9] bg-opacity-15',
  };

  

  return (
    <section className="my-5 pb-10 mx-10">
      <div className="border rounded-md border-[#E4E4E4] overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 border rounded-md border-[#E4E4E4]">
          <thead className="bg-transparent">
            <tr>
              <th className="py-2 px-4 border-b text-left">Image</th>
              <th className="py-2 px-4 border-b text-left">Name</th>
              <th className="py-2 px-4 border-b text-left">Phone</th>
              <th className="py-2 px-2 border-b text-left">Type</th>
              <th className="py-2 px-2 border-b text-left">Status</th>
              <th className="py-2 px-2 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {loading ? (
              <SkeletonRow />
            ) : error ? (
              <tr>
                <td colSpan={7} className="py-6 px-4 text-red-600 text-center">{error}</td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-6 px-4 text-gray-600 text-center">
                  
                  
                <div className='flex flex-col items-center justify-center h-full'>
        <Image
          src='/NoUser.svg'
          alt='No users found'
          width={150}
          height={150}
          className='w-96 h-96 mt-14'
        />
        <span className='text-black text-2xl font-semibold mt-4'>No users found</span>
      </div>
                  
                  </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id}>
                  <td className="py-2 px-4 border-b">
                    <Image src={user.image} alt={user.name} width={25} height={20} className="rounded-full h-8 w-8" />
                  </td>
                  <td className="py-2 px-4 border-b font-bold text-[15px]">{user.name}</td>
                  <td className="py-2 px-4 border-b font-medium text-[15px]">{user.phone}</td>
                  
                  <td className="py-2 px-2 border-b">
                    <span className={`inline-block w-24 px-1 py-1 rounded text-xs font-medium text-center ${roleColors[user.type as UserRole]}`}>
                      {user.type}
                    </span>
                  </td>
                  <td className="py-2 px-2 border-b">
                    <span className={`inline-block w-24 px-1 py-1 rounded text-xs font-medium text-center ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>

                  <td className="py-4 px-2 border-b flex items-center space-x-2">
                    <button onClick={() => handleEditUser(user)} className="text-black">
                      <CiEdit size={20} />
                    </button>
                    <button
                      onClick={() => handleToggleStatus(user)}
                      className={`p-1 rounded-full flex items-center ${user.isActive ? 'bg-green-500' : 'bg-red-500'} transition-colors`}
                    >
                      <span className={`w-8 h-4 flex items-center rounded-full ${user.isActive ? 'bg-green-600' : 'bg-red-600'} transition-colors`}>
                        <span className={`w-4 h-4 bg-white rounded-full transition-transform ${user.isActive ? 'transform translate-x-4' : 'transform translate-x-0'}`}></span>
                      </span>
                    </button>
                  </td>
                </tr>
              ))
            )}
            
          </tbody>
        </table>
        
      </div>
      <div className='flex justify-end py-3 text-gray-500 items-end  mx-10'>
        <span>Page {currentPage} of {totalPages}</span>
      </div>

      {showEditUserModal && selectedUser && (
        <div className="fixed inset-0 flex items-end justify-end bg-black bg-opacity-50 z-40">
          <EditUserModal
            isOpen={showEditUserModal}
            onClose={closeEditUserModal}
            user={selectedUser}
          />
        </div>
      )}
    </section>
  );
};

export default ListUsers;
