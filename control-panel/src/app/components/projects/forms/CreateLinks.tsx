"use client";
import React, { useState, useRef, useEffect } from 'react';
import { FaWindowClose } from 'react-icons/fa';
import { addLink } from '../../../services/projects/AddLink';
import { toast } from 'react-toastify'; // Import toast

interface CreateLinksProps {
  projectId?: number;
  toggleModal: () => void;
  onSave: (title: string, url: string) => void; // Function to handle save action
}

const CreateLinks: React.FC<CreateLinksProps> = ({ projectId, toggleModal, onSave }) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [errors, setErrors] = useState<{ title?: string; url?: string }>({});
  const linkInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (linkInputRef.current) {
      linkInputRef.current.focus();
    }
  }, [projectId]);

  const validateFields = () => {
    const newErrors: { title?: string; url?: string } = {};

    if (!title.trim()) {
      newErrors.title = 'Title cannot be empty';
    }
    if (!url.trim()) {
      newErrors.url = 'URL cannot be empty';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSave = async () => {
    if (validateFields()) {
      try {
        await addLink({ projectId: projectId ?? 0, title, url });
        toast.success('Link added successfully!'); // Show success toast
        onSave(title, url);
        toggleModal();
      } catch (error) {
        toast.error('Failed to add link.'); // Show error toast
        console.error('Failed to save link:', error);
      }
    }
  };

  return (
    <div className="bg-[#F4F4F4] h-screen shadow-lg w-full max-w-md flex flex-col">
      <div className="bg-white px-6 flex items-center h-16 p-2 w-full">
        <FaWindowClose className="text-3xl cursor-pointer" onClick={toggleModal} />
        <h2 className="flex-grow text-center ml-8 text-xl font-bold">Create Links</h2>
        <button
          className="bg-[#FFC700] text-black font-semibold w-20 py-1 px-2 rounded hover:bg-black hover:text-[#FFC700]"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
      <div className="w-full max-w-md space-y-4 p-4">
        <div className="mb-4 mx-4">
          <label className="block text-black font-semibold mb-2" htmlFor="title">
            Title
          </label>
          <input
            className={`w-full border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-lg p-2`}
            type="text"
            id="title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            ref={linkInputRef}
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>
        <div className="mb-4 mx-4">
          <label className="block text-black font-semibold mb-2" htmlFor="url">
            URL
          </label>
          <input
            className={`w-full border ${errors.url ? 'border-red-500' : 'border-gray-300'} rounded-lg p-2`}
            type="text"
            id="url"
            placeholder="URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          {errors.url && <p className="text-red-500 text-sm mt-1">{errors.url}</p>}
        </div>
      </div>
    </div>
  );
};

export default CreateLinks;
