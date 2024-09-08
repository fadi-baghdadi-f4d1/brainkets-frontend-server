import React from 'react';

interface InputProps {
    type: string;
    value: string | number;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    min?: number;
    max?: number;
    className?: string;
}

const Input: React.FC<InputProps> = ({ type, value, onChange, min, max, className }) => (
    <input
        type={type}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        className={`border rounded px-2 py-1 text-gray-800 ${className}`}
    />
);

export default Input;
