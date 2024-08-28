import React from 'react';

const Sidebar: React.FC = () => {
    const currentDate = new Date().toLocaleDateString();

    return (
        <div className="w-[350px] bg-[#212427] flex flex-col justify-between h-screen p-4">
            <div>
                {/* Add additional sidebar items here */}
            </div>
            <div className="flex flex-col items-center">
                <button className="bg-blue-500 text-white py-2 px-4 rounded mb-4">
                    Start Chat
                </button>
                <hr className="w-full border-gray-600 mb-4" />
                <p className="text-white">{currentDate}</p>
            </div>
        </div>
    );
};

export default Sidebar;
