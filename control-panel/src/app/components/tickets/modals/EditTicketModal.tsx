import React, { useState, useEffect, useRef } from 'react';
import { FaWindowClose } from "react-icons/fa";
import { FaImage } from "react-icons/fa6";
import { IoMdAttach, IoIosArrowDown } from "react-icons/io";
import { MdKeyboardVoice } from "react-icons/md";
import FileAttachment from '@/components/common/FileAttachement';
import Image from 'next/image';

const EditTicketModal: React.FC<{ toggleModal: () => void; toggleSelectUserModal: () => void }> = ({ toggleModal, toggleSelectUserModal }) => {
    const [selectedPriority, setSelectedPriority] = useState<string | null>(null);
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const titleInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (titleInputRef.current) {
            titleInputRef.current.focus();
        }
    }, []);

    const handlePriorityChange = (priority: string) => {
        setSelectedPriority(priority);
    };

    const handleStatusChange = (status: string) => {
        setSelectedStatus(status);
    };

    return (
        <div className="fixed inset-0 top-0 left-0 min-h-screen flex items-end justify-end">
            <div className="bg-[#F4F4F4] min-h-screen w-full max-w-lg relative">
                <div className='flex px-4 pt-4 bg-white border-b border-b-[#E4E4E4] flex-row mb-4 justify-between'>
                    <FaWindowClose onClick={toggleModal} className='text-3xl cursor-pointer' />
                    <h2 className="text-center text-xl font-bold mt-1 ml-8">Edit Ticket</h2>
                    <button className="bg-[#FDC90E] hover:text-[#FDC90E] hover:bg-black text-black font-semibold rounded-lg py-1 px-6 mb-3">
                        Save
                    </button>
                </div>
                <form className="space-y-4 px-6">
                    <div>
                        <label className="block font-semibold mb-1">
                            Title <span className="text-red-500">*</span>
                        </label>
                        <input 
                            type="text"
                            className="w-full  focus:outline-[#FDC90E] border border-gray-300 rounded-lg p-2"
                            placeholder="Title"
                            ref={titleInputRef}
                        />
                    </div>
                    <div>
                        <label className="block font-semibold mb-1">Description</label>
                        <input
                            className="w-full border focus:outline-[#FDC90E] border-gray-300 rounded-lg p-2"
                            placeholder="Description"
                        />
                    </div>
                    <div className="p-1">
                        <div className="mb-4">
                            <label className="block font-semibold mb-2">Priority</label>
                            <div className="flex space-x-4 w-full">
                                {['Urgent', 'High', 'Medium', 'Low'].map((priority) => (
                                    <div
                                        key={priority}
                                        className={`flex w-full justify-center items-center bg-white rounded-lg p-1 font-semibold text-sm space-x-2 cursor-pointer ${
                                            selectedPriority === priority ? 'border-2 border-blue-500' : ''
                                        }`}
                                        onClick={() => handlePriorityChange(priority)}
                                    >
                                        <span
                                            className={`w-4 h-4 rounded-full ${
                                                priority === 'Urgent'
                                                    ? 'bg-[#CC0000]'
                                                    : priority === 'High'
                                                    ? 'bg-[#F9781D]'
                                                    : priority === 'Medium'
                                                    ? 'bg-[#57A4FF]'
                                                    : 'bg-[#FDC90E]'
                                            }`}
                                        ></span>
                                        <span>{priority}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block font-semibold mb-2">Status</label>
                            <div className="flex space-x-4">
                                {['Opened', 'Closed'].map((status) => (
                                    <div
                                        key={status}
                                        className={`flex justify-center items-center bg-white rounded-lg px-3 py-1 font-semibold text-sm space-x-2 cursor-pointer ${
                                            selectedStatus === status ? 'border-2 border-blue-500' : ''
                                        }`}
                                        onClick={() => handleStatusChange(status)}
                                    >
                                        <span
                                            className={`w-4 h-4 rounded-full ${
                                                status === 'Opened'
                                                    ? 'bg-[#FDC90E]'
                                                    : 'bg-[#19B600]'
                                            }`}
                                        ></span>
                                        <span>{status}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">
                            Assigned to <span className="text-red-500">*</span>
                        </label>
                        <div onClick={toggleSelectUserModal} className="flex cursor-pointer w-full bg-white items-center border border-gray-300 rounded-lg p-2">
                            <Image
                                src="/profile image.png"
                                alt="Client"
                                width={24}
                                height={24}
                                className="rounded-full mr-2"
                            />
                            <p className="flex-grow">Client Name</p>
                            <IoIosArrowDown className="text-xl" />
                        </div>
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">Due Date</label>
                        <div className="relative">
                        <input type="date" className="w-full px-4 py-2 border rounded-md bg-white" />
                        </div>
                    </div>

                    {/* <FileAttachment selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} /> */}
                </form>
            </div>
        </div>
    );
};

export default EditTicketModal;
