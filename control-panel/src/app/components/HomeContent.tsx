import React from 'react';
import Modules from "../components/Modules";
import Chat from "../components/Chat";

const MainContent: React.FC = () => {
    return (
        <div className="bg-[#1B3483] h-full flex-1">
            {/* Centered Box */}
            <div className="bg-[#508C9B] mx-auto w-3/4 lg:w-1/2 rounded-lg p-2 mt-4">
                <h2 className="text-white">Quote ipsum, dolor sit amet consectetur. Senectus cum nulla est sit nibh et lacus.</h2>
                <p className="text-xs text-right text-white">John Smith</p>
            </div>
            <div className="mt-2">
                <Modules />
            </div>

        </div>
    );
};

export default MainContent;
