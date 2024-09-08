import React, { useEffect, useRef, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import * as Yup from 'yup';

const ColorPicker = ({ label, color, onChange, className }) => {
    const [showPicker, setShowPicker] = useState(false);
    const [inputValue, setInputValue] = useState(color);
    const [error, setError] = useState('');
    const pickerRef = useRef(null);
    const invertedColor = getTextColor(color);

    const colorSchema = Yup.string()
        .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Invalid hex color')
        .required('Color is required');

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target)) {
                setShowPicker(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        setInputValue(color);
    }, [color]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        validateAndUpdateColor(value);
    };

    const validateAndUpdateColor = async (value) => {
        try {
            await colorSchema.validate(value);
            setError('');
            onChange(value);
        } catch (err) {
            setError(err.message);
        }
    };

    const handlePickerChange = (newColor) => {
        setInputValue(newColor);
        validateAndUpdateColor(newColor);
    };

    return (
        <div className={`mb-4 ${className}`}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <div className="flex flex-col sm:flex-row sm:items-center w-full">
                {/* Color Box */}
                <div
                    className="w-12 h-12 rounded-md cursor-pointer border border-gray-300 mb-2 sm:mb-0"
                    style={{ backgroundColor: color }}
                    onClick={() => setShowPicker(!showPicker)}
                />
                
                {/* Input Field */}
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    style={{ backgroundColor: color, color: invertedColor }}
                    className={`ml-0 sm:ml-2 p-2 border rounded-md ${error ? 'border-red-500' : ''} w-full sm:w-40`}
                />
            </div>
            
            {/* Error Message */}
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            
            {/* Color Picker Modal */}
            {showPicker && (
                <div className="fixed inset-0 z-10 flex items-center justify-center">
                    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
                    <div ref={pickerRef} className="bg-white p-4 rounded-md shadow-lg z-20">
                        <HexColorPicker color={color} onChange={handlePickerChange} />
                        <button
                            className="mt-2 w-full bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600"
                            onClick={() => setShowPicker(false)}
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};


export default ColorPicker;

// Helper function to determine if the color is light or dark
const getTextColor = (hex) => {
    // Remove the '#' character if present
    hex = hex.replace('#', '');

    // Convert 3-digit hex to 6-digit hex
    if (hex.length === 3) {
        hex = hex.split('').map(h => h + h).join('');
    }

    // Get the RGB values
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Calculate the relative luminance (using sRGB luminance formula)
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    // If luminance is high, return black text, otherwise white
    return luminance > 128 ? 'black' : 'white';
};