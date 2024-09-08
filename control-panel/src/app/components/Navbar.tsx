"use client";

import React, { useEffect, useState } from 'react';
import Announcement from '/public/navbar/announcement.svg';
import Vector from '/public/navbar/Vector (1).svg';

const Navbar: React.FC = () => {
    const [userState, setUserState] = useState<any>(null);

    useEffect(() => {
        // Retrieve userState from local storage
        const storedUserState = localStorage.getItem('userState');
        if (storedUserState) {
            setUserState(JSON.parse(storedUserState));
        }
    }, []);

    if (!userState) {
        return null; // You can replace this with a loading indicator if needed
    }

    return (
        <nav className="bg-black sticky top-0 z-30 text-black p-3 shadow">
            <div className="flex justify-between mx-6">
                <h1 className="text-lg text-white font-semibold">Control Panel</h1>
                <div className="flex items-center space-x-4">
                    <Vector className="h-6 w-6" />
                    <div className="h-3/4 w-px bg-gray-400"></div> {/* Vertical line */}
                    <Announcement className="h-6 w-6" />
                    <div className="h-3/4 w-px bg-gray-400"></div> {/* Vertical line */}
                    <p className="text-white text-base">{`${userState.firstName} ${userState.lastName}`}</p>
                    <img src={userState.image} alt="Profile" className="w-[30px] h-[30px] rounded-full"/>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
