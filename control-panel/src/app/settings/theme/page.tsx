'use client';
import React, { useEffect, useRef, useState } from 'react';
import { API_BASE_URL } from '@/services/settings/baseApi';
import { getTheme } from '@/services/settings/theme/GetTheme';
import { ThemeResponse } from '@/services/settings/theme/dto/ThemeResponse';
import { updateTheme } from '@/services/settings/theme/UpdateTheme';
import ColorPicker from '../component/ColorPicker';
import ImageUploadBox from '../component/ImageUploadBox';
import GlobalError from '../component/GlobalError';
import GlobalSuccess from '../component/GlobalSuccess';

export default function ThemeSettingsPage() {
  const [themeData, setThemeData] = useState<ThemeResponse | null>(null);
  const [errors, setErrors] = useState<any>({});
  const [globalError, setGlobalError] = useState<string | null>(null); // State for global error message
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // State for success message
  const [originalImages, setOriginalImages] = useState({
    darkLogo: null,
    lightLogo: null,
    favicon: null,
    loginBackground: null,
  });
  const [images, setImages] = useState({
    darkLogo: null,
    lightLogo: null,
    favicon: null,
    loginBackground: null,
  });
  const [colors, setColors] = useState({
    primaryColor: '#dddddd',
    secondaryColor: '#ffffff',
    loginBgColor: '#ffffff'
  });
  const [hasChanges, setHasChanges] = useState(false); // Track changes

  // Fetch the theme data once component is mounted
  useEffect(() => {
    const fetchThemeData = async () => {
      try {
        const data = await getTheme();
        setThemeData(data);
        const initialImages = createInitialImageData(data);
        setOriginalImages(initialImages);
        setImages(initialImages);
        setColors({
          primaryColor: data.primaryColor || '#dddddd',
          secondaryColor: data.secondaryColor || '#ffffff',
          loginBgColor: data.loginBgColor || '#ffffff',
        });
      } catch (error) {
        console.error('Error fetching theme data', error);
        setGlobalError('Failed to fetch theme data. Please try again later.');
      }
    };

    fetchThemeData();
  }, []);

  const handleDrop = (acceptedFiles, imageType) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = () => {
        setImages(prev => ({ ...prev, [imageType]: reader.result }));
        setHasChanges(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleColorChange = (color, type) => {
    if (color.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)) {
      setColors((prev) => ({ ...prev, [type]: color }));
      setHasChanges(true);
    }
  };

  const handleCancel = async () => {
    // Reset colors to original values
    setColors({
      primaryColor: themeData?.primaryColor || '#dddddd',
      secondaryColor: themeData?.secondaryColor || '#ffffff',
      loginBgColor: themeData?.loginBgColor || '#ffffff',
    });

    // Reset images to original values
    setImages(createInitialImageData(themeData));

    // Reset error state and hasChanges flag
    setErrors({});
    setHasChanges(false);
    setGlobalError(null);
    setSuccessMessage(null);
  };

  const handleUpdateTheme = async () => {
    const formData = new FormData();

    // Append theme colors
    Object.entries(colors).forEach(([key, value]) => formData.append(key, value));

    // Handle images
    const imageFieldMap = {
      favicon: 'favicon',
      darkLogo: 'logoDarkTheme',
      lightLogo: 'logoLightTheme',
      loginBackground: 'loginBgImage'
    };

    for (const [key, fieldName] of Object.entries(imageFieldMap)) {
      if (images[key] && images[key] !== originalImages[key]) {
        const imageData = images[key];
        if (imageData instanceof File) {
          formData.append(fieldName, imageData, imageData.name);
        } else if (typeof imageData === 'string' && imageData.startsWith('data:image')) {
          try {
            const response = await fetch(imageData);
            const blob = await response.blob();
            formData.append(fieldName, blob, `${fieldName}.jpg`);
          } catch (error) {
            console.error(`Error converting base64 to blob for ${fieldName}:`, error);
          }
        } else if (typeof imageData === 'string') {
          formData.append(fieldName, imageData);
        }
      }
    }

    try {
      await updateTheme(formData);
      setHasChanges(false);
      setSuccessMessage('Theme settings updated successfully!');
    } catch (error) {
      console.error('Failed to update theme:', error);
      setGlobalError('Failed to update theme. Please try again later.');
    }
  };

  return (
    <div className="max-w-4xl text-gray-700 mx-auto p-6 overflow-y-auto h-screen">
      <h1 className="text-2xl text-gray-700 font-bold mb-4">Theme Settings</h1>
      <GlobalError message={globalError} />
      <GlobalSuccess message={successMessage} />
      <p className="mb-6">Customize your application theme here.</p>

      {/* Grid for Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {Object.keys(images).map((key) => (
          <ImageUploadBox
            key={key}
            title={capitalize(key.replace(/([A-Z])/g, ' $1'))}
            image={images[key]}
            onDrop={(files) => handleDrop(files, key)}
            className="w-full" // Ensure full width for better responsiveness
          />
        ))}
      </div>

      {/* Grid for Colors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {Object.entries(colors).map(([key, value]) => (
          <ColorPicker
            key={key}
            label={capitalize(key.replace(/([A-Z])/g, ' $1'))}
            color={value}
            onChange={(color) => handleColorChange(color, key)}
            className="w-full" // Ensure full width for better responsiveness
          />
        ))}
      </div>

      {/* Save and Cancel Buttons */}
      {hasChanges && (
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full sm:w-auto"
            onClick={handleUpdateTheme}
          >
            Save Theme Settings
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="text-sm text-blue-500 cursor-pointer hover:underline bg-transparent border-none p-0 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );

};

// Helper functions

const createInitialImageData = (data) => ({
  darkLogo: `${API_BASE_URL}${data.logoDarkTheme}`,
  lightLogo: `${API_BASE_URL}${data.logoLightTheme}`,
  favicon: `${API_BASE_URL}${data.favicon}`,
  loginBackground: `${API_BASE_URL}${data.loginBgImage}`,
});

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);