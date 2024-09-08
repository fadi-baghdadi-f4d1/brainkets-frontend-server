import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';


const ImageUploadBox = ({ title, image, onDrop, className }) => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
    const [localImage, setLocalImage] = useState(image);
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        if (image) {
            const img = new Image();
            img.onload = () => {
                setLocalImage(image);
                setImageError(false); // Reset error state if the image loads successfully
            };
            img.onerror = () => {
                setImageError(true);
                setLocalImage(null); // Clear image on error
            };
            img.src = image;
        } else {
            setLocalImage(null); // Clear local image if the URL is null
        }
    }, [image]);

    return (
        <div className={className}>
            <h3 className="text-lg text-gray-700 font-semibold mb-2">{title}</h3>
            <div
                {...getRootProps()}
                className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-500 transition-colors"
            >
                <input {...getInputProps()} />
                {localImage && !imageError ? (
                    <img
                        src={localImage}
                        alt={title}
                        className="w-full h-32 mx-auto object-contain max-w-full"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center h-32">
                        <p className="text-gray-500">
                            {isDragActive ? 'Drop the image here' : 'Drag & drop or click to upload'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageUploadBox;
