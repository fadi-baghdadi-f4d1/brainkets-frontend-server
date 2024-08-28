import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import beeflex from "../../../../public/bee.svg";

interface DropdownMenuProps {
    dropdownRef: React.RefObject<HTMLDivElement>;
    isDropdownOpen: boolean;
    setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
    handleNavigation: (path: string) => void;
    handleProjectClick: () => void;
    handleUsefulLinksClick: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
    dropdownRef,
    isDropdownOpen,
    setIsDropdownOpen,
    handleNavigation,
    handleProjectClick,
    handleUsefulLinksClick,
    
}) => {
    const dropdownContainerRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setIsDropdownOpen(prevState => !prevState);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownContainerRef.current && !dropdownContainerRef.current.contains(event.target as Node)) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClickOutside]);


    return (
        <div className="relative" ref={dropdownContainerRef}>
            <Image
                src={beeflex}
                alt="Project Logo"
                width={45}
                height={45}
                className="object-cover h-10 w-10 rounded-lg cursor-pointer"
                onClick={toggleDropdown} 
            />
            <div
                ref={dropdownRef}
                className={`absolute right-0 top-12 bg-white border border-gray-300 rounded-md shadow-lg z-10 w-[120px] transition-all duration-300 ease-out transform ${isDropdownOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"} origin-top`}
            >
                <div onClick={() => { handleNavigation('taskboard'); setIsDropdownOpen(false); }} className="flex border-b border-b-[#E4E4E4] items-center py-1 cursor-pointer hover:bg-gray-100 hover:rounded-t-md">
                    <Image
                        src="/task.svg"
                        alt="Tasks"
                        width={15}
                        height={15}
                        className="ml-2"
                    />
                    <span className="text-black text-sm mx-2">Tasks</span>
                </div>
                <div onClick={() => { handleNavigation('tickets'); setIsDropdownOpen(false); }} className="flex border-b border-b-[#E4E4E4] items-center py-1 cursor-pointer hover:bg-gray-100">
                    <Image
                        src="/ticket.svg"
                        alt="Tickets"
                        width={15}
                        height={15}
                        className="ml-2"
                    />
                    <span className="text-black text-sm mx-2">Tickets</span>
                </div>
                <div onClick={() => { handleUsefulLinksClick(); setIsDropdownOpen(false); }} className="flex items-center border-b border-b-[#E4E4E4] py-1 cursor-pointer hover:bg-gray-100">
                    <Image
                        src="/links.svg"
                        alt="Links"
                        width={15}
                        height={15}
                        className="ml-2"
                    />
                    <span className="text-black text-sm mx-2">Links</span>
                </div>
                <div onClick={() => { handleProjectClick(); setIsDropdownOpen(false); }} className="flex items-center py-1 cursor-pointer hover:bg-gray-100 hover:rounded-b-md">
                    <Image
                        src="/edit.svg"
                        alt="Edit"
                        width={15}
                        height={15}
                        className="ml-2"
                    />
                    <span className="text-black text-sm mx-2">Edit</span>
                </div>
            </div>
        </div>
    );
};

export default DropdownMenu;
