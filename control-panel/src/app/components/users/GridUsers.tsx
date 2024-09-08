"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { getUsers } from '../../services/users/userCrud/GetUsersApi';
import EditUserModal from './modals/EditUserModal';
import { CiEdit } from 'react-icons/ci';
import Swal from 'sweetalert2';
import { activateDisableUser } from '../../services/users/userCrud/ActivateDisableUserApi'; // Import the API function

type UserRole = 'Admin' | 'Employee' | 'Client' | 'Partner';

interface GridUsersProps {
  currentPage: number;
  selectedFilter: string;
  searchQuery: string;
}

interface User {
  id: string;
  image: string;
  name: string;
  role: string;
  phone: string;
  status: string;
  type: UserRole;
  userName: string;
  firstName: string;
  lastName: string;
  gender: string;
  isActive: boolean;
  email: string | null;
  designation?: number;
  country: string;
}

interface ApiUser {
  id: string; 
  userName: string;
  firstName: string;
  lastName: string;
  role: string;
  phoneNumber: string;
  disabled: number;
  image: string ;
  email: string | null;
  gender: string;
  country: string;
  designation?: number;
}

const roleColors: Record<UserRole, string> = {
  Admin: 'text-[#F9781D] bg-[#F9781D] bg-opacity-15',
  Employee: 'text-[#FFC700] bg-[#FFC700] bg-opacity-15',
  Client: 'text-[#57A4FF] bg-[#57A4FF] bg-opacity-15',
  Partner: 'text-[#BB6CF9] bg-[#BB6CF9] bg-opacity-15',
};

const getStatusColor = (status: string) => {
  return status === 'Active' ? 'bg-[#19B600] bg-opacity-15 text-[#19B600]' : 'bg-[#CC0000] bg-opacity-15 text-[#CC0000]';
};

const capitalizeFirstLetter = (str: string) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const UserCard: React.FC<{ user: User; onDelete: (id: string) => void }> = ({ user, onDelete }) => {
  const [showEditUserModal, setShowEditUserModal] = useState(false);

  const handleEditUser = (event: React.MouseEvent) => {
    event.stopPropagation();
    setShowEditUserModal(true);
  };

  const closeEditUserModal = () => {
    setShowEditUserModal(false);
  };


  const handleToggleStatus = async () => {
    // Disable scrolling
    document.body.style.overflow = 'hidden';
  
    const action = user.isActive ? 'deactivate' : 'activate';
    const result = await Swal.fire({
      title: `Are you sure you want to ${action} this user?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
      customClass: {
        confirmButton: 'custom-ok-button',
        cancelButton: 'custom-no-button'
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
  

  const defaultImage = '/defaultBee.png';
  const imageSrc = user.image ? `${user.image}` : defaultImage;
  
  return (
    <div className='relative group h-auto bg-white border-[1px] border-[#C4C4C4] rounded-[10px] py-[15px] flex px-4 mb-5'>
      <div>
        <Image
          src={imageSrc}
          alt={user.name}
          width={100}
          height={100}
          className='rounded-lg h-24 w-24 object-cover'
        />
      </div>

      <div className='flex flex-col ml-4 justify-between'>
        <div className='flex flex-col'>
          <div className='font-bold'>{user.name}</div>
          <div className='font-medium'>{capitalizeFirstLetter(user.role)}</div>
          <div className='font-medium'>{user.phone}</div>
        </div>

        <div className='flex justify-between'>
          <div className={`flex justify-center w-[100px] ${getStatusColor(user.status)} rounded-md mr-1`}>
            {user.status}
          </div>
          <div className={`flex justify-center w-[100px] ${roleColors[user.type]} rounded-md`}>
            {user.type}
          </div>
        </div>
      </div>
      
      <div className='absolute flex flex-row right-2 top-2 opacity-100 transition-opacity duration-300'>
  <button onClick={handleEditUser} className="text-black">
    <CiEdit size={20} />
  </button>
  <div className='flex items-center ml-2'>
  <button
    onClick={handleToggleStatus}
    className={`p-1 rounded-full flex items-center ${user.isActive ? 'bg-green-500' : 'bg-red-500'} transition-colors`}
  >
    <span className={`w-8 h-4 flex items-center rounded-full ${user.isActive ? 'bg-green-600' : 'bg-red-600'} transition-colors`}>
      <span className={`w-4 h-4 bg-white rounded-full shadow transform ${user.isActive ? 'translate-x-4' : 'translate-x-0'} transition-transform`}></span>
    </span>
  </button>
</div>
      </div>


      {/* Edit User Modal */}
      {showEditUserModal && (
        <div className="fixed inset-0 flex items-end justify-end bg-black bg-opacity-50 z-40">
          <EditUserModal isOpen={showEditUserModal} onClose={closeEditUserModal} user={user} />
        </div>
      )}
    </div>
  );
};


const UserCardSkeleton: React.FC = () => (
  <div className='relative h-auto bg-white rounded-[10px] p-[15px] flex justify-around mb-5 animate-pulse'>
    <div className='w-24 h-24 bg-gray-200 rounded-lg'></div>
    <div className='flex flex-col justify-between flex-grow ml-4'>
      <div className='space-y-2'>
        <div className='w-3/4 h-4 bg-gray-200'></div>
        <div className='w-1/2 h-4 bg-gray-200'></div>
        <div className='w-1/2 h-4 bg-gray-200'></div>
      </div>
      <div className='flex justify-between mt-2'>
        <div className='w-24 h-4 bg-gray-200 rounded-md'></div>
        <div className='w-24 h-4 bg-gray-200 rounded-md'></div>
      </div>
    </div>
  </div>
);

interface GridUsersProps {
  currentPage: number;
  totalPages: number;
  selectedFilter: string;
  searchQuery: string; 
}

const GridUsers: React.FC<GridUsersProps> = ({ currentPage, selectedFilter, totalPages, searchQuery }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const roleFilter = selectedFilter === '' ? '' : selectedFilter.toLowerCase();

  const fetchUsers = async (page: number, role: string, query: string) => {
    try {
      const response = await getUsers(page, role, query); // Ensure getUsers takes the query parameter
      const apiUsers = response.users;

      // Format and set users as before
      const formattedUsers = apiUsers.map((user: ApiUser) => ({
        id: user.id,
        image: user.image,
        name: `${user.firstName} ${user.lastName}`,
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email || null,
        role: user.role.toLowerCase(),
        gender: user.gender,
        isActive: user.disabled === 0,
        country: user.country,
        designation: user.designation,
        phone: user.phoneNumber || '',
        status: user.disabled === 0 ? 'Active' : 'Inactive',
        type: user.role.charAt(0).toUpperCase() + user.role.slice(1),
      }));

      setUsers(formattedUsers);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage, roleFilter, searchQuery);
  }, [currentPage, roleFilter, searchQuery]); // Add roleFilter here
  

  const filteredUsers = roleFilter === ''
    ? users.filter(user => user.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : users.filter(user => user.role === roleFilter && user.name.toLowerCase().includes(searchQuery.toLowerCase()));

  if (loading) {
    return (
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-1 md:gap-3 lg:gap-3 mx-10 my-5'>
        {Array.from({ length: 9 }).map((_, index) => (
          <UserCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  if (filteredUsers.length === 0) {
    return (
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
    );
  }

  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-1 md:gap-3 lg:gap-3 mx-10 mt-5'>
      {filteredUsers.map(user => (
  <UserCard key={user.id} user={user} onDelete={(id) => setUsers(users.filter(user => user.id !== id))} />
))}

      </div>

      <div className='flex justify-end pb-3 text-gray-500 items-end  mx-10'>
        <span>Page {currentPage} of {totalPages}</span>
      </div>
    </div>
  );
};

export default GridUsers;


