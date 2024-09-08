'use client';
import React from 'react';

interface ActionButtonsProps {
    isEditing: boolean;
    onSave: () => void;
    onCancel: () => void;
    onEdit: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ isEditing, onSave, onCancel, onEdit }) => {
    return (
        <div className="flex items-center space-x-4 mt-4">
            {isEditing ? (
                <>
                    <button
                        type="button"
                        onClick={onSave}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Save Changes
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="text-sm text-blue-500 cursor-pointer hover:underline bg-transparent border-none p-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Cancel
                    </button>
                </>
            ) : (
                <button
                    type="button"
                    onClick={onEdit}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                    Edit Company
                </button>
            )}
        </div>
    );
};

export default ActionButtons;