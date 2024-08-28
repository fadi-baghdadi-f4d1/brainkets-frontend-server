"use client";

import React, { useState } from 'react';
import { FaWindowClose } from 'react-icons/fa';
import Image from 'next/image';
import forgetImage from '../../../public/navbar/Vector (1).svg';
import { MdEmail } from "react-icons/md";
import VerifyCode from './VerifyCode';
import { forgetPasswordApi } from '../services/users/forgetPassword/ForgetPasswordApi';
import { toast } from 'react-toastify';

interface ForgotPasswordProps {
  onClose: () => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onClose }) => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [animateOut, setAnimateOut] = useState<boolean>(false);
  const [animateIn, setAnimateIn] = useState<boolean>(false);
  const [backAnimating, setBackAnimating] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const handleSend = async () => {
    if (userName.trim() === '') {
      toast.error("User name is required");
      return;
    }

    const response = await forgetPasswordApi(userName);

    if ('email' in response) {
      setEmail(response.email);
      toast.success(response.message);
      setAnimateOut(true);
      setTimeout(() => {
        setIsSubmitted(true);
        setAnimateOut(false);
        setAnimateIn(true);
      }, 500);
    } else {
      toast.error(response.message);
    }
  };

  const handleBack = () => {
    setBackAnimating(true);
    setAnimateIn(false);
    setAnimateOut(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setBackAnimating(false);
      setAnimateOut(false);
      setAnimateIn(true);
    }, 500);
  };

  return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
        {!isSubmitted ? (
            <div className={`bg-[#F4F4F4] rounded-lg p-8 shadow-lg z-10 relative w-full xl:w-[590px] lg:w-[590px] md:w-[500px]
          sm:w-[500px] h-auto ${animateOut ? 'animate-slideOutLeft' : animateIn ? 'animate-slideInLeft' : ''}`}>
              <div>
                <button className="absolute left-5 top-5" onClick={onClose}>
                  <FaWindowClose className='text-3xl cursor-pointer' />
                </button>
                <div className='text-[#FDC90E] font-bold text-[30px] text-center -mt-4'>Forget Password</div>
              </div>
              <div className='flex justify-center items-center mt-3'>
                <Image
                    src={forgetImage}
                    alt="forgetImage"
                    width={200}
                    height={190}
                />
              </div>

              <div className='bg-white rounded-md mx-1 mt-5 flex flex-col space-y-5 justify-center items-center p-5'>
                <div className='text-center text-[#606060] text-[15px] font-medium mx-5'>
                  We will send a mail to the email address you registered to regain your password.
                </div>

                <div className="relative rounded-md shadow-sm w-full mx-5">
                  <input
                      type="text"
                      name="userName"
                      id="userName"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="block w-full h-12 rounded-lg pl-16 pr-10 py-2 border border-[#AEAEAE] leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#FDC90E] focus:border-[#FDC90E] sm:text-sm"
                      placeholder="UserName"
                  />
                  <div className="absolute rounded-l-lg bg-[#FDC90E] inset-y-0 left-0 px-4 flex items-center pointer-events-none">
                    <MdEmail className="text-white text-2xl" />
                  </div>
                </div>
                <button
                    type="submit"
                    onClick={handleSend}
                    className="w-[80%] mx-10 flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm
              text-sm font-semibold bg-[#FDC90E] hover:bg-[#e0b009] focus:outline-none focus:ring-2 focus:ring-offset-2
               focus:ring-[#FDC90E]"
                >
                  Send
                </button>
              </div>
            </div>
        ) : (
            <div className={`${backAnimating ? 'animate-slideOutRight' : animateIn ? 'animate-slideInRight' : ''}`}>
              <VerifyCode onBack={handleBack} email={email} userName={userName} onClose={onClose} />
            </div>
        )}
      </div>
  );
};

export default ForgotPassword;
