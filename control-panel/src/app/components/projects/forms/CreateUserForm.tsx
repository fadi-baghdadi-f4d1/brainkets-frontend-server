"use client";

import React, { useState, useEffect, useRef } from 'react';
import { FaWindowClose } from 'react-icons/fa';
import { HiPlus } from 'react-icons/hi';
import { IoIosArrowDown } from 'react-icons/io';
import SelectDesignationForm from '../../users/forms/SelectDesignationForm';
import SelectCountryForm from '@/components/users/forms/SelectCountryForm';
import CreateDesignationForm from '../../users/forms/CreateDesignationForm';
import { createUsers } from '@/services/users/userCrud/CreateUserApi'; // Adjust import if needed
import Swal from 'sweetalert2';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Loader from '@/components/common/loader/loader';


interface ClientFormProps {
  onClose: () => void;
}

const roleColors: { [key: string]: string } = {
  Admin: '#F9781D',
  Employee: '#FFC700',
  Client: '#57A4FF',
  Partner: '#BB6CF9'
};

const ClientForm: React.FC<ClientFormProps> = ({ onClose }) => {
  const userInputRef = useRef<HTMLInputElement>(null);
  const [formValues, setFormValues] = useState({
    userName: '',
    firstName: '',
    lastName: '',
    password: '',
    role: '',
    gender: '',
    email: '',
    phone: '',
    countryId: 0,
    designationId: 0,
    active: false,
  });
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [selectedDesignation, setSelectedDesignation] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [isSelectDesignationOpen, setIsSelectDesignationOpen] = useState<boolean>(false);
  const [isSelectCountryOpen, setIsSelectCountryOpen] = useState<boolean>(false);
  const [isCreateDesignationOpen, setIsCreateDesignationOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);



  useEffect(() => {
    if (userInputRef.current) {
      userInputRef.current.focus();
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, type, value } = e.target;
  
    if (type === 'checkbox' || type === 'radio') {
      // Type assertion to HTMLInputElement for checkbox or radio
      const target = e.target as HTMLInputElement;
      setFormValues(prevValues => ({
        ...prevValues,
        [name]: target.checked,
      }));
    } else {
      // Type assertion to HTMLSelectElement or other inputs
      setFormValues(prevValues => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRole(e.target.value);
    setFormValues(prevValues => ({
      ...prevValues,
      role: e.target.value.toLowerCase(), // Convert role to lowercase
    }));
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

  const openSelectCountryForm = () => {
    setIsSelectCountryOpen(true);
  };

  const openDesignationForm = () => {
    setIsSelectDesignationOpen(true);
  };

  const openCreateDesignationForm = () => {
    setIsCreateDesignationOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Check for required fields
    const requiredFields = ['userName', 'firstName', 'lastName', 'password', 'role', 'gender', 'email', 'phone', 'countryId'];
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
    setIsLoading(true);
  
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      const phoneNumber = formValues.phone.replace(/\D/g, ''); // Remove non-digit characters
      await createUsers({
        ...formValues,
        phone: phoneNumber, // Use formatted phone number
      });
      Swal.fire({
        title: 'Success!',
        text: 'User created successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'custom-ok-button'
        }
      });
      onClose(); // Close the form after submission
    } catch (error: any) {
      console.error('Failed to create user:', error);
  
      // Additional error handling for Axios errors
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || 'Failed to create user. Please try again.';
        console.log('Axios error response:', error.response); // For debugging
  
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
          text: 'Failed to create user. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: 'custom-ok-button'
          }
        });
      }
    }
    finally {
      setIsLoading(false); // Stop the loader
    }
  };
  

  
  const validationSchema = Yup.object().shape({
    userName: Yup.string()
      .matches(/^\S*$/, 'Username cannot contain spaces')
      .required('Username is required')
      .test('check-username', 'Username is already taken', async (value) => {
        // Implement username availability check logic here
        return true; // replace with actual check
      }),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
      .required('Password is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    phone: Yup.string().matches(/^\d+$/, 'Phone number must contain only numbers').required('Phone number is required'),
  });
  
  
    return (
<section>
    {isLoading && (
      <div className="fixed inset-0 z-90  flex justify-center items-center pointer-events-none">
        <div className="relative z-90 flex justify-center items-center">
          <Loader />
        </div>
      </div>
    )}
    <div className={`relative ${isLoading ? 'pointer-events-none' : 'pointer-events-auto'}`}>
      <div className="fixed inset-0 top-0 left-0 min-h-screen flex items-end justify-end z-50">
        <div className="bg-[#F4F4F4] w-[650px] min-h-screen relative">
          
              {/* Header */}
              <div className='flex p-4 bg-white border-b border-b-[#E4E4E4] justify-between items-center'>
                <FaWindowClose onClick={onClose} className='text-3xl cursor-pointer' />
                <h2 className="text-center text-[20px] font-bold mt-1">Users</h2>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="bg-[#FDC90E] hover:bg-black hover:text-[#FDC90E] text-black font-semibold rounded-lg py-1 px-6"
                >
                  Save
                </button>
              </div>
              <div className='bg-[#F4F4F4] px-[30px] py-[15px] w-full h-[calc(100vh-70px)] overflow-y-auto custom-scrollbar'>
                <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
              <div className="col-span-2">
                <label className="block font-bold mb-1">UserName <span className='text-[#FF0000]'>*</span></label>
                <input
                  type="text"
                  name="userName"
                  value={formValues.userName}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  placeholder='UserName'
                  ref={userInputRef}
                />
              </div>

              <div>
                <label className="block font-bold mb-1">First Name <span className='text-[#FF0000]'>*</span></label>
                <input
                  type="text"
                  name="firstName"
                  value={formValues.firstName}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  placeholder='First Name'
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Last Name <span className='text-[#FF0000]'>*</span></label>
                <input
                  type="text"
                  name="lastName"
                  value={formValues.lastName}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  placeholder='Last Name'
                />
              </div>

              <div className="col-span-2">
                <label className='block font-bold mb-1'>User Password <span className='text-[#FF0000]'>*</span></label>
                <input
                  type="text"
                  name="password"
                  value={formValues.password}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  placeholder='User Password'
                />
              </div>

              <div className="col-span-2">
  <label className="block font-bold mb-1">Role <span className='text-[#FF0000]'>*</span></label>
  <div className='flex flex-wrap'>
    {['Admin', 'Employee', 'Client', 'Partner'].map(role => (
      <label
        key={role}
        className={`flex items-center mr-4 mb-2 w-[110px] h-[40px] rounded-md bg-[${roleColors[role]}] bg-opacity-15
          ${selectedRole === role ? `border-2 border-[#606060]` : 'border border-transparent'} 
          text-[${roleColors[role]}] text-center cursor-pointer`}
      >
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
                <label className="block font-bold mb-1">Email <span className='text-[#FF0000]'>*</span></label>
                <input
                  type="text"
                  name="email"
                  value={formValues.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  placeholder='Email'
                />
              </div>

              <div>
  <label className="block font-bold mb-1">
    Phone Number <span className='text-[#FF0000]'>*</span>
  </label>
  <input
    type="text"
    name="phone"
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
    className="w-full p-2 border rounded-md"
    placeholder='Phone Number'
  />
</div>


              <div>
  <label className="block font-bold mb-1">
    Gender <span className='text-[#FF0000]'>*</span>
  </label>
  <select
    name="gender"
    value={formValues.gender}
    onChange={handleInputChange}
    className="w-full p-2 border rounded-md"
  >
    <option value="" disabled hidden>Select Gender</option>
    <option value="Male">Male</option>
    <option value="Female">Female</option>
  </select>
</div>


              <div className="col-span-2">
                <label className="block font-bold mb-1">Country <span className='text-[#FF0000]'>*</span></label>
                <div className="flex">
                <div
                    className="w-full flex flex-row justify-between px-2 bg-white py-2 border rounded-md cursor-pointer"
                    onClick={openSelectCountryForm}
                  >
                    {selectedCountry || 'Select Country'}
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
                    onChange={handleInputChange}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </form>
          </div>
        </div>
        {isSelectDesignationOpen && (
          <SelectDesignationForm
            toggleModal={() => setIsSelectDesignationOpen(false)}
            onSelect={handleDesignationSelect}
          />
        )}

        {isSelectCountryOpen && (
          <SelectCountryForm
            toggleModal={() => setIsSelectCountryOpen(false)}
            onSelect={handleCountrySelect}
          />
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

      </div>
      </div>
    </section>
  );
};

export default ClientForm;
