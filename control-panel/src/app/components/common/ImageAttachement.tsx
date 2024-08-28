import React, { useRef, useCallback } from 'react';
import Image from 'next/image'; // Import Image from next/image
import { FaImage } from 'react-icons/fa6';
import { FaWindowClose } from 'react-icons/fa';
import { LuUpload } from 'react-icons/lu';

interface ImageAttachmentProps {
    selectedImages: File[];
    setSelectedImages: React.Dispatch<React.SetStateAction<File[]>>;
}

const ImageAttachment: React.FC<ImageAttachmentProps> = ({ selectedImages, setSelectedImages }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const files = Array.from(event.dataTransfer.files);
        const imageFiles = files.filter(file => file.type.startsWith('image/'));
        if (imageFiles.length) {
            setSelectedImages([imageFiles[0]]); // Replace existing image
        }
    };

    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const files = Array.from(event.target.files);
            const imageFiles = files.filter(file => file.type.startsWith('image/'));
            if (imageFiles.length) {
                setSelectedImages([imageFiles[0]]); // Replace existing image
            }
        }
    };

    const removeFile = () => {
        setSelectedImages([]); // Remove the current image
    };

    const getPreviewUrl = useCallback((file: File) => {
        return URL.createObjectURL(file);
    }, []);

    // Revoke object URL to free memory
    React.useEffect(() => {
        return () => {
            selectedImages.forEach(file => URL.revokeObjectURL(getPreviewUrl(file)));
        };
    }, [selectedImages, getPreviewUrl]);

    return (
        <div>
            <label className="block font-semibold mb-1">Attach Image</label>
            <div className="flex justify-start py-2 items-center">
                <div className="flex space-x-4">
                    <label className='rounded-xl bg-[#18b60046] cursor-pointer'>
                        <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={handleFileInputChange}
                        />
                        <FaImage className="text-2xl text-[#19B600] p-1" />
                    </label>
                </div>
            </div>
            <div
                onDrop={handleFileDrop}
                onDragOver={(e) => e.preventDefault()}
                className="bg-white mb-6 min-h-60 rounded-lg p-4 text-center cursor-pointer relative border-2 border-[#E4E4E4] flex justify-center items-center"
                onClick={() => fileInputRef.current?.click()}
            >
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileInputChange}
                />
                <div className="mt-2 flex flex-wrap gap-2">
                    {selectedImages.length === 0 ? (
                        <LuUpload className="text-gray-400 text-4xl" />
                    ) : (
                        selectedImages.map((file, index) => (
                            <div key={index} className="relative bg-gray-200 w-48 h-48 flex justify-center items-center rounded-sm p-2">
                                <Image
                                    src={getPreviewUrl(file)}
                                    alt={`Preview ${index}`}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-sm"
                                />
                                <button
                                    type="button"
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        removeFile();
                                    }}
                                    className="absolute text-2xl top-[-12px] right-[-8px] p-1 text-red-500"
                                    aria-label={`Remove image ${index}`}
                                >
                                    <FaWindowClose />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default ImageAttachment;
