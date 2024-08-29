"use client";
import React, { useEffect, useState } from 'react';
import UserMenu from '/public/footer/Frame 8538.svg';
import Link from "next/link";

const Footer: React.FC = () => {
    const [currentTime, setCurrentTime] = useState<string>('');
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const options: Intl.DateTimeFormatOptions = {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
                month: 'short',
                day: '2-digit',
                year: 'numeric'
            };
            const formattedTime = now.toLocaleTimeString('en-US', options);
            setCurrentTime(formattedTime);
        };

        updateTime();
        const intervalId = setInterval(updateTime, 60000); // Update time every minute

        return () => clearInterval(intervalId); // Cleanup interval on unmount
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="bg-black text-black p-3 w-full mt-auto relative z-10">
            <div className="flex justify-between">
                <div className="flex items-center mx-6">
                    <p className="text-sm text-white">{currentTime}</p>
                    <div className="h-full ml-4 w-px bg-gray-400"></div> {/* Vertical line */}
                </div>
                <div className="flex items-center space-x-8 relative">
                    <div className="h-full w-px bg-gray-400"></div> {/* Vertical line */}
                    <div onClick={toggleMenu} className="cursor-pointer pr-6">
                        <UserMenu />
                    </div>
                    {isMenuOpen && (
                        <div
                            className="absolute -right-3 bottom-full mb-2 w-48 bg-black text-white p-2 rounded-lg shadow-lg z-20">
                            <p className="py-2 px-2 border-b border-gray-500 cursor-pointer">Profile</p>
                            <p className="py-2 px-2 border-b border-gray-500 cursor-pointer">Email</p>
                            <Link href={"/settings"}>
                            <p className="py-2 px-2 border-b border-gray-500 cursor-pointer">Settings</p>
                            </Link>
                            <p className="py-2 px-2 border-b border-gray-500 cursor-pointer">Groups</p>
                            <p className="py-2 px-2 border-b border-gray-500 cursor-pointer">User Roles</p>
                            <Link href={"/new_users"}>
                            <p className="py-2 px-2 cursor-pointer">Users</p>
                            </Link>
                        </div>

                    )}
                </div>
            </div>
        </div>
    );
};

export default Footer;
