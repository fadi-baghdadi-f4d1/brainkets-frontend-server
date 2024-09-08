import React from 'react';

interface SelectProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    children: React.ReactNode;
    className?: string;
}

const Select: React.FC<SelectProps> = ({ value, onChange, children, className = '' }) => (
    <select
        value={value}
        onChange={onChange}
        className={`border rounded px-2 py-1 ${className}`}
    >
        {children}
    </select>
);

export default Select;
