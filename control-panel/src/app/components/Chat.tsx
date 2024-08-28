"use client";
import React from 'react';
import ChatIcon from '/public/home/chats.svg';

const Chat: React.FC = () => {
    return (
        <div
            className={`bg-[#1B2E5E] h-[50px] text-white p-1 cursor-pointer left-0`}
            style={{ width: '260px' }}
        >
            <div className="flex items-center pl-4">
                <ChatIcon className=""/>
                <h3 className="text-lg pl-6">Chats (5)</h3>
                <div className="w-3 h-3 bg-green-500 rounded-full ml-12"></div>
            </div>
        </div>
    );
};

export default Chat;
