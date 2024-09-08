import React from 'react';

interface ButtonProps {
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    children: React.ReactNode;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, className = '' }) => (
    <button
        onClick={onClick}
        className={`bg-blue-500 text-white px-4 py-2 rounded ${className}`}
    >
        {children}
    </button>
);

export default Button;
