"use client";
import React, { useEffect, useState } from 'react';
import { FaWindowClose } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa6';
import { getLinks } from '../../../services/projects/GetAllLinks';
import EditDeleteDropDown from '@/components/common/EditDeleteDropdown';
import SkeletonLoader from '../skeleton/UsefullLinksSkeleton'; // Import the SkeletonLoader

interface Link {
  id: number;
  title: string;
  link: string;
}

interface UsefulLinksProps {
  projectId?: number;
  toggleModal: () => void;
  toggleCreateLinks: (projectId?: number) => void;
}

const UsefulLinks: React.FC<UsefulLinksProps> = ({ projectId, toggleModal, toggleCreateLinks }) => {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (projectId) {
      setLoading(true);
      getLinks(projectId)
        .then((data) => {
          setLinks(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [projectId]);

  if (loading) {
    return <SkeletonLoader />; // Show SkeletonLoader while loading
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-[#F4F4F4] h-screen shadow-lg w-full max-w-md flex flex-col">
      <div className='bg-white px-6 flex items-center h-16 p-2 w-full'>
        <FaWindowClose className="text-3xl cursor-pointer" onClick={toggleModal} />
        <h2 className="flex-grow text-center text-xl font-bold">Useful Links</h2>
        <button
          className="bg-[#FFC700] text-black p-2 hover:bg-black hover:text-[#FFC700] rounded"
          onClick={() => toggleCreateLinks(projectId)}
        >
          <FaPlus />
        </button>
      </div>
      <div className="w-full max-w-md space-y-4 p-4">
        {links.length > 0 ? (
          links.map((link) => (
            <div key={link.id} className="bg-white mx-4 mt-2 p-2 border border-[#C4C4C4] rounded-xl flex justify-between">
              <div>
                <p className="font-semibold text-[#300b0b]">Title: <span className="text-black font-semibold">{link.title}</span></p>
                <p className="font-semibold text-[#606060]">URL: <a href={`https://${link.link}`} target="_blank" rel="noopener noreferrer" className="text-black">{link.link}</a></p>
              </div>
              <div>
                <EditDeleteDropDown
                  type="links"
                  entityId={link.id}
                  entityName={link.title}
                  entityLink={link.link}
                  onclick={() => console.log(`Link ID: ${link.id} clicked`)}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">No links available.</div>
        )}
      </div>
    </div>
  );
};

export default UsefulLinks;
