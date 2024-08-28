"use client";
import React from 'react';
import LoginForm from './LoginForm';
import Image from 'next/image';
import Logo from "../../../public/navbar/Vector (1).svg";

const LoginPage: React.FC = () => {
    return (
        <div className="relative min-h-screen flex items-center justify-center bg-[#F4F4F4]">
            <div
                className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
                style={{ backgroundImage: "url('/login/8 1.png')" }}
            >
            </div>
            <div className="relative lg:w-1/3 z-10">
                <LoginForm  />
            </div>
        </div>
    );
};

export default LoginPage;
