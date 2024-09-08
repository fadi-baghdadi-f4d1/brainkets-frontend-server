"use client";
import React, { useState, useEffect, useRef } from 'react';
import { FaWindowClose } from 'react-icons/fa';
import { HiPlus } from 'react-icons/hi';
import SelectDesignationForm from '../../users/forms/SelectDesignationForm';
import CreateDesignationForm from '../../users/forms/CreateDesignationForm';
import { IoIosArrowDown } from 'react-icons/io';
import SelectCountryForm from '@/components/users/forms/SelectCountryForm';
import { updateUsers } from '@/services/users/userCrud/UpdateUserApi';
import Swal from 'sweetalert2';
import axios from 'axios';
import Loader from '@/components/common/loader/loader';





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

interface EditModalProps {
  onClose: () => void;
  isOpen: boolean;
  user: User; 
}



interface EditModalProps {
  onClose: () => void;
  isOpen: boolean;
}

const EditModal: React.FC<EditModalProps> = ({ onClose, isOpen, user }) => {
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [selectedDesignation, setSelectedDesignation] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [isSelectDesignationOpen, setIsSelectDesignationOpen] = useState<boolean>(false);
  const [isSelectCountryOpen, setIsSelectCountryOpen] = useState<boolean>(false);
  const [isCreateDesignationOpen, setIsCreateDesignationOpen] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(user.status === 'Active');
  const [gender, setGender] = useState<string>(user.gender || '');
  const [isLoading, setIsLoading] = useState(false);

  const [formValues, setFormValues] = useState({
    userName: user.userName || '',
  firstName: user.firstName || '',
  lastName: user.lastName || '',
  password: '',
  role: user.role || '',
  gender: user.gender || '',
  email: user.email || '',
  phone: user.phone || '',
  countryId: 0,
    designationId: 0,
    active: user.status === 'Active' ? true : false,
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
  


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, type, value } = e.target;
  
    if (type === 'checkbox' || type === 'radio') {
      const target = e.target as HTMLInputElement;
      setFormValues(prevValues => ({
        ...prevValues,
        [name]: target.checked ? 'Active' : 'Inactive',
      }));
    } else {
      setFormValues(prevValues => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };
  

  useEffect(() => {
    setSelectedRole(user.type);
    // setSelectedDesignation(user.designation ? `Designation ${user.designation}` : '');
    // setSelectedCountry(user.country || ''); // Update to use user.country
    setIsActive(user.status === 'Active');
    setGender(user.gender || '');
  }, [user]);

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRole(e.target.value);
    setFormValues(prevValues => ({
      ...prevValues,
      role: e.target.value.toLowerCase(), // Convert role to lowercase
    }));
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
// Function to open the Designation form
const openDesignationForm = () => {
  setIsSelectDesignationOpen(!isSelectDesignationOpen); // Toggle the designation form visibility
};

// Function to open the Country form
const openSelectCountryForm = () => {
  setIsSelectCountryOpen(!isSelectCountryOpen); // Toggle the country form visibility
};
  const openCreateDesignationForm = () => {
    setIsCreateDesignationOpen(true);
  };

  const handleDesignationSelect = (designationId: number, designation: string) => {
    setSelectedDesignation(designation);
    setFormValues(prevValues => ({
      ...prevValues,
      designationId,
    }));
    setIsSelectDesignationOpen(false);
  };
  
  const handleCountrySelect = (countryId: number, country: string) => {
    setSelectedCountry(country);
    setFormValues(prevValues => ({
      ...prevValues,
      countryId,
    }));
    setIsSelectCountryOpen(false);
  };

  if (!isOpen) return null;


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const requiredFields = ['userName', 'firstName', 'lastName', 'role', 'gender', 'email', 'phone', 'countryId'];
    const missingFields = requiredFields.filter(field => !formValues[field as keyof typeof formValues]);
    
    // Include designationId in required fields if the role requires a designation
    if (['admin', 'employee'].includes(formValues.role)) {
      if (!formValues.designationId) {
        missingFields.push('designationId');
      }
    }
  
    if (missingFields.length > 0) {
      Swal.fire({
        title: 'Validation Error!',
        text: 'Please fill all required fields.',
        icon: 'warning',
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'custom-ok-button'
        }
      });
      return;
    }
    const id = user.id;
    try {
   
  
      setIsLoading(true);
await new Promise(resolve => setTimeout(resolve, 7000));

const phoneNumber = formValues.phone.replace(/\D/g, '');
await updateUsers({
  id: user.id, 
  ...formValues,
  phone: phoneNumber, 
  password: formValues.password || undefined,
  countryId: Number(formValues.countryId), // Ensure countryId is a number
});

      

      Swal.fire({
        title: 'Success!',
        text: 'User updated successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'custom-ok-button'
        }
      });
      onClose(); 
    } catch (error: any) {
      
      // Additional error handling for Axios errors
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || 'Failed to update user. Please try again.';
  
        Swal.fire({
          title: 'Error!',
          text: errorMessage,
          icon: 'error',
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: 'custom-ok-button'
          }
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to update user. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: 'custom-ok-button'
          }
        });
      }
      setIsLoading(false);
    }
  };
  
  



  
  return (
    <section>
   {isLoading && (
      <div className="fixed inset-0 z-90  flex justify-center items-center pointer-events-none">
        <div className="relative z-90 flex justify-center items-center">
          <Loader />
        </div>
      </div>
    )}
    
    {/* Wrapper div to disable pointer events when loading */}
    <div className={`relative ${isLoading ? 'pointer-events-none opacity-100' : 'pointer-events-auto'}`}>
      <div onClick={handleOverlayClick}>
        <div className='relative bg-white w-[650px] h-full shadow-lg'>
          <div className='w-full flex justify-between h-[70px] p-4 bg-white'>
            <div className='font-bold text-[20px] text-center mx-auto'>Edit User</div>
            <button className="absolute left-4" onClick={onClose}>
              <FaWindowClose className='text-3xl cursor-pointer' />
            </button>
            <button
              onClick={handleSubmit}
              className="bg-[#FDC90E] px-4 py-2 rounded-md flex justify-center items-center font-semibold text-[15px] w-[120px] h-[35px] absolute right-7"
            >
              Save
            </button>
          </div>
          <div className='bg-[#F4F4F4] px-[30px] py-[15px] w-full h-[calc(100vh-70px)]'>
            <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
            <div className="col-span-2">
              <label className="block font-bold mb-1">UserName</label>
              <input 
  type="text" 
  className="w-full p-2 border rounded-md" 
  value={formValues.userName} 
  name="userName" 
  onChange={handleInputChange} 
/>
              </div>

            <div>
              <label className="block font-bold mb-1">First Name</label>
              <input type="text" className="w-full p-2 border rounded-md" name='firstName' onChange={handleInputChange} value={formValues.firstName} />
            </div>

            <div>
              <label className="block font-bold mb-1">Last Name</label>
              <input type="text" className="w-full p-2 border rounded-md" name='lastName' onChange={handleInputChange} value={formValues.lastName} />
            </div>

            <div className="col-span-2">
              <label className="block font-bold mb-1">User Password</label>
              <input type="text" className="w-full p-2 border rounded-md" name='password' onChange={handleInputChange} placeholder='User Password' />
            </div>

            <div className="col-span-2">
              <label className='block font-bold mb-1'>Role</label>
              <div className='flex flex-wrap'>
                {['Admin', 'Employee', 'Client', 'Partner'].map(role => (
                 <label key={role} className={`flex items-center mr-4 mb-2 w-[110px] h-[40px] rounded-md bg-[${roleColors[role]}] bg-opacity-15
                 ${selectedRole === role ? `border-2 border-[#606060]` : 'border border-transparent'} 
                 text-[${roleColors[role]}] text-center cursor-pointer`} >
                 <input 
                   type="radio" 
                   name="role" 
                   value={role} 
                   checked={selectedRole === role}  
                   onChange={handleRoleChange} 
                   className="sr-only"
                 />
                 <span className="flex-1 py-2 px-4">{role}</span>
               </label>
               
                ))}
              </div>
            </div>

            {(selectedRole === 'Admin' || selectedRole === 'Employee') && (
  <div className="col-span-2">
    <label className="block font-bold mb-1">Designation <span className='text-[#FF0000]'>*</span></label>
    <div className="flex">
    <div
  onClick={openDesignationForm}
  className="w-full flex flex-row justify-between px-2 bg-white py-2 border rounded-md cursor-pointer"
>
  {selectedDesignation || 'Select Designation'}
  <IoIosArrowDown size={20} className="text-black mt-1" />
</div>


      <button
        type="button"
        className="flex justify-center items-center ml-2 p-1 mt-2 w-[30px] h-[30px] bg-black rounded-md text-white"
        onClick={openCreateDesignationForm}
      >
        <HiPlus size={20} className='font-bold' />
      </button>
    </div>
  </div>
)}

            <div className="col-span-2">
              <label className="block font-bold mb-1">Email</label>
              <input type="text" className="w-full p-2 border rounded-md" name='email' onChange={handleInputChange} value={formValues.email || ''} />
            </div>

            <div>
              <label className="block font-bold mb-1">Phone Number</label>
              <input type="" className="w-full p-2 border rounded-md" name='phone' 
              value={formValues.phone}
              onChange={(e) => {
                const numericValue = e.target.value.replace(/\D/g, '');
                handleInputChange({
                  target: {
                    name: e.target.name,
                    value: numericValue,
                  } as unknown as EventTarget & HTMLInputElement,
                } as React.ChangeEvent<HTMLInputElement>);
              }}
               />
            </div>

            <div>
              <label className="block font-bold mb-1">Gender</label>
              <select className="w-full p-2 border rounded-md" name='gender' onChange={handleInputChange} value={formValues.gender || ''}>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>

            <div className="col-span-2">
                <label className="block font-bold mb-1">Country <span className='text-[#FF0000]'>*</span></label>
                <div className="flex">
                <div
                    className="w-full flex flex-row justify-between px-2 bg-white py-2 border rounded-md cursor-pointer"
                    onClick={openSelectCountryForm}
                  >                    {selectedCountry || 'Select Country'}
                    <IoIosArrowDown size={20} className="text-black mt-1" />
                  </div>
                </div>
              </div>

            <div className="col-span-2 flex my-1">
              <label className="block font-bold">Active</label>
              <label className="switch ml-3 cursor-pointer mt-1">
              <input
  type="checkbox"
  name="active"
  checked={formValues.active}
  onChange={(e) => setFormValues((prevValues) => ({
    ...prevValues,
    active: e.target.checked,
  }))}
/>

                <span className="slider"></span>
              </label>
            </div>
            </form>
        </div>
      </div>
    </div>
  </div>
  
  {/* Modals for Select Designation, Select Country, and Create Designation */}
  {isSelectDesignationOpen && (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <SelectDesignationForm
        toggleModal={() => setIsSelectDesignationOpen(false)}
        onSelect={handleDesignationSelect}
      />
    </div>
  )}

  {isSelectCountryOpen && (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <SelectCountryForm
        toggleModal={() => setIsSelectCountryOpen(false)}
        onSelect={handleCountrySelect}
      />
    </div>
  )}

  {isCreateDesignationOpen && (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      onClick={() => setIsCreateDesignationOpen(false)} // Close modal when clicking outside
    >
      <div
        className="relative bg-white rounded-md shadow-lg w-full max-w-md"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <CreateDesignationForm
          onClose={() => setIsCreateDesignationOpen(false)}
        />
      </div>
    </div>
  )}
</section>
  );
};

const roleColors: { [key: string]: string } = {
  Admin: '#F9781D',
  Employee: '#FFC700',
  Client: '#57A4FF',
  Partner: '#BB6CF9'
};

export default EditModal;