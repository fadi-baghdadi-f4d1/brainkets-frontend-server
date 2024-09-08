'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconType } from 'react-icons';
import { FaBuilding, FaPalette, FaMoneyBillWave, FaEnvelope, FaHome, FaBars, FaArrowLeft } from 'react-icons/fa';

interface NavItem {
    name: string;
    path: string;
    icon: IconType;
}

const navItems: NavItem[] = [
    { name: 'Company Settings', path: '/settings/company', icon: FaBuilding },
    { name: 'Theme Settings', path: '/settings/theme', icon: FaPalette },
    { name: 'Currency Settings', path: '/settings/currency', icon: FaMoneyBillWave },
    { name: 'SMTP Settings', path: '/settings/smtp', icon: FaEnvelope },
];

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Check if the screen is mobile size
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Navigation Bar */}
            <nav
                className={`fixed left-0 top-0 h-full bg-white shadow-md transition-all duration-300 z-20
                    ${isMobile ? (isNavOpen ? 'w-64' : 'w-0') : isNavOpen ? 'w-64' : 'w-16'}
                    ${isMobile && isNavOpen ? 'overflow-auto' : 'overflow-hidden'}
                `}
                style={{ zIndex: 30 }}
            >
                {/* Toggle Button */}
                {!isMobile && (
                    <button
                        onClick={toggleNav}
                        className="w-full p-4 flex justify-center items-center text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                        {isNavOpen ? <FaArrowLeft size={20} /> : <FaBars size={20} />}
                    </button>
                )}

                {/* Home Link */}
                <Link href="/" className="flex items-center p-4 text-gray-700 hover:bg-gray-50">
                    <FaHome size={24} className="mr-2" />
                    {isNavOpen && <span>Home</span>}
                </Link>

                {/* Navigation Items */}
                <ul className="mt-2">
                    {navItems.map((item, index) => (
                        <li key={item.path}>
                            <Link
                                href={item.path}
                                onClick={() => {
                                    if (isMobile) setIsNavOpen(false); // Close the navbar on mobile
                                }}
                                className={`flex items-center p-4 text-gray-600 hover:bg-gray-50 ${pathname === item.path ? 'bg-gray-100 font-semibold' : ''
                                    } ${index !== 0 ? 'border-t border-gray-200' : ''} ${isNavOpen ? 'justify-start' : 'justify-center'
                                    }`}
                            >
                                <item.icon size={24} className={isNavOpen ? 'mr-2' : ''} />
                                {isNavOpen && <span>{item.name}</span>}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Floating FaBars Button on Mobile */}
            {isMobile && !isNavOpen && (
                <button
                    onClick={toggleNav}
                    className="fixed top-4 left-4 p-3 bg-gray-800 text-white rounded-full shadow-lg z-40"
                >
                    <FaBars size={20} />
                </button>
            )}

            {/* Main Content */}
            <main
                className={`overflow-x-hidden flex-1 transition-all duration-300 ${isMobile ? 'ml-0' : isNavOpen ? 'ml-64' : 'ml-16'
                    }`}
            >
                <div className="p-8">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        {children}
                    </div>
                </div>
            </main>


            {/* Close button for the sidebar on mobile */}
            {isMobile && isNavOpen && (
                <button
                    onClick={toggleNav}
                    className="fixed top-4 right-4 p-3 bg-gray-800 text-white rounded-full shadow-lg z-40"
                >
                    <FaArrowLeft size={20} />
                </button>
            )}
        </div>
    );
}
