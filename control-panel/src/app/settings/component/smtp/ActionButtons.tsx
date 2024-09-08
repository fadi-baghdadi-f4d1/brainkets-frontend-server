'use client';
import React from 'react';
import { IoIosSend } from "react-icons/io";
import { FaCheck } from 'react-icons/fa';

interface ActionButtonsProps {
    onSave: () => void;
    onCancel: () => void;
    onTestEmail: () => void;
    isEditing: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onSave, onCancel, onTestEmail, isEditing }) => {
    return (
        <div className="flex flex-col sm:flex-row sm:justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-4">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full">
                {/* Save Button with Check Icon */}
                <button
                    type="button"
                    onClick={onSave}
                    className={`flex items-center px-4 py-2 rounded-md focus:outline-none 
                    ${isEditing ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-400 text-white cursor-not-allowed'}
                    w-full sm:w-auto`}
                    disabled={!isEditing} // Disabled until editing
                >
                    <FaCheck className="w-5 h-5 mr-2" /> {/* Save icon */}
                    Save Settings
                </button>

                {/* Send Test Email Button with Send Icon */}
                <button
                    type="button"
                    onClick={onTestEmail}
                    className="flex items-center bg-zinc-500 text-white px-4 py-2 rounded-md hover:bg-gray-700 focus:outline-none w-full sm:w-auto"
                >
                    <IoIosSend className="w-5 h-5 mr-2" /> {/* Send icon */}
                    Send Test Email
                </button>

                {/* Cancel Button (smaller) */}
                <button
                    onClick={onCancel}
                    disabled={!isEditing} // Disabled until editing
                    className={`px-4 py-2 text-sm rounded-md focus:outline-none 
                    ${isEditing ? 'text-blue-500 hover:underline' : 'text-gray-400 cursor-not-allowed'}
                    w-full sm:w-auto`}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default ActionButtons;
