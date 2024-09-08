'use client';
import React from 'react';

interface InputFieldProps {
    label: string;
    type: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    disabled: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, name, value, onChange, error, disabled }) => {
    return (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
                className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 ${disabled ? 'bg-gray-100' : ''}`}
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
};

export default InputField;
