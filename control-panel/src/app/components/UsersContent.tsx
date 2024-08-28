import React from 'react';
import Modules from "../components/Modules";
import Chat from "../components/Chat";
import UsersCard from "../components/UsersCard";

const MainContent: React.FC = () => {
    return (
        <div className="bg-[#1B3483] h-full flex-1">
            {/* Centered Box */}
            <div className="flex justify-between space-x-4 mx-8 pr-1 mt-4">
                <div className="bg-[#508C9B] w-[340px] rounded-lg p-2">
                    <h2 className="text-white flex justify-center">All</h2>
                </div>
                <div className="bg-[#508C9B] w-[340px] rounded-lg p-2">
                    <h2 className="text-white flex justify-center">Employee</h2>
                </div>
                <div className="bg-[#508C9B] w-[340px] rounded-lg p-2">
                    <h2 className="text-white flex justify-center">Clients</h2>
                </div>
                <div className="bg-[#508C9B] w-[340px] rounded-lg p-2">
                    <h2 className="text-white flex justify-center">Partner</h2>
                </div>
            </div>

            <div className="mt-2">
                <UsersCard />
            </div>
            <div className="absolute bottom-14 -mb-1">
                <Chat />
            </div>
        </div>
    );
};

export default MainContent;
