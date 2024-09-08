'use client';
import React from 'react';

interface BooleanToggleProps {
    label: string;
    name: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
}

const BooleanToggle: React.FC<BooleanToggleProps> = ({
    label,
    name,
    checked,
    onChange,
    disabled = false,
}) => {
    return (
        <div className="mb-4 flex items-center">
            <label htmlFor={name} className="text-sm font-medium text-gray-700 mr-2">
                {label}
            </label>
            <input
                type="checkbox"
                id={name}
                name={name}
                checked={checked}
                onChange={onChange}
                disabled={disabled}
                className="focus:ring-blue-500 focus:border-blue-500"
            />
        </div>
    );
};

export default BooleanToggle;
