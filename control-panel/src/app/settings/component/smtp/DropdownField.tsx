'use client';
import React from 'react';

interface DropdownFieldProps {
    label: string;
    name: string;
    value: string;
    options: string[];
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    error?: string;
}

const DropdownField: React.FC<DropdownFieldProps> = ({
    label,
    name,
    value,
    options,
    onChange,
    error,
}) => {
    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                className={`text-gray-600 mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500`}
            >
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
};

export default DropdownField;
