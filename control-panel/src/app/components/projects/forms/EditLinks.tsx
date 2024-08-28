import React, { useState, useRef, useEffect } from 'react';
import { FaWindowClose } from 'react-icons/fa';
import { editLink } from '../../../services/projects/EditLink';  // Import the editLink function
import { toast } from 'react-toastify';

interface EditLinksProps {
  isOpen: boolean;
  onClose: () => void;
  linkId: number;
  linkName: string;
  link?: string; // Optional link URL
}

const EditLinks: React.FC<EditLinksProps> = ({ isOpen, onClose, linkId, linkName, link }) => {
  const [title, setTitle] = useState(linkName);
  const [url, setUrl] = useState(link || '');
  const [errors, setErrors] = useState<{ title?: string; url?: string }>({});
  const linkInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (linkInputRef.current) {
      linkInputRef.current.focus();
    }
  }, [isOpen]);

  const validateFields = () => {
    const newErrors: { title?: string; url?: string } = {};

    if (!title.trim()) {
      newErrors.title = 'Title cannot be empty';
    }
    if (!url.trim()) {
      newErrors.url = 'URL cannot be empty';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (validateFields()) {
      try {
        // Call the editLink function
        await editLink({ id: linkId, title, url });
        toast.success('Link edited successfully!');
        onClose();
      } catch (error) {
        toast.error('Failed to edit link.');
        console.error('Failed to save link:', error);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="bg-gray-100 h-screen shadow-lg w-full max-w-md flex flex-col">
      <div className="bg-white px-6 flex items-center h-16 p-2 w-full">
        <FaWindowClose className="text-3xl cursor-pointer" onClick={onClose} />
        <h2 className="flex-grow text-center ml-8 text-xl font-bold">Edit Links</h2>
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
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
        </div>
        <div className="mb-4 mx-4">
          <label className="block text-black font-semibold mb-2" htmlFor="url">
            URL
          </label>
          <input
            ref={linkInputRef}
            className={`w-full border ${errors.url ? 'border-red-500' : 'border-gray-300'} rounded-lg p-2`}
            type="url"
            id="url"
            placeholder="URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          {errors.url && <p className="text-red-500 text-sm">{errors.url}</p>}
        </div>
      </div>
    </div>
  );
};

export default EditLinks;
