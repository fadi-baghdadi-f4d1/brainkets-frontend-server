import React from 'react';

interface GlobalErrorProps {
    message?: string;
}

const GlobalError: React.FC<GlobalErrorProps> = ({ message }) => {
    if (!message) return null;

    return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{message}</span>
        </div>
    );
};

export default GlobalError;
