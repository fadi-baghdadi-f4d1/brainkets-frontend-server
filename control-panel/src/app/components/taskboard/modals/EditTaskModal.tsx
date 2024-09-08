"use client";
import React, { useState, useEffect, useRef } from 'react';
import { FaWindowClose } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { getStatus } from '@/services/tasks/status/GetStatusApi';
import { useSearchParams } from 'next/navigation';
import SelectMemberForm from '@/components/taskboard/modals/SelectMemberForm';
import { Task, Status, User } from "@/types/Task";
import { generateUniqueId } from '@/utils/generateUniqueId';
import { updateTask } from '@/services/tasks/tasksCrud/UpdateTaskApi';
import {createTask} from '@/services/tasks/tasksCrud/CreateTaskApi';
import { uploadFiles } from '@/services/tasks/UploadFiles/UploadFileApi';
import Swal from 'sweetalert2'; 
import Loader from '@/components/common/loader/loader';
import Image from 'next/image';

interface EditTaskModalProps {
    actiontype: "clone" | "edit";
    task: Task | null;
    onClose: () => void;
}


const EditTaskModal: React.FC<EditTaskModalProps> = ({ task, onClose, actiontype }) => {
    const [selectedPriority, setSelectedPriority] = useState<string | null>(null);
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
    const [description, setDescription] = useState<string>('');
    const [statuses, setStatuses] = useState<Status[]>([]);
    const [isSelectUserModalOpen, setSelectUserModalOpen] = useState<boolean>(false);
    const [selectedMembers, setSelectedMembers] = useState<User[]>([]);
    const titleInputRef = useRef<HTMLInputElement>(null);
    const searchParams = useSearchParams(); 
    const projectIdString = searchParams.get('id');
    const projectId = projectIdString ? parseInt(projectIdString, 10) : null;
    const [definerId, setDefinerId] = useState<string>('');
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);


    useEffect(() => {
        if (task) {
            setSelectedPriority(task.priority || null);
            setSelectedStatus(task.status?.name || null);
            setDescription(task.description || '');
            setSelectedMembers([task.assignee as User]);
        }
    }, [task]);

    useEffect(() => {
        if (titleInputRef.current) {
            titleInputRef.current.focus();
        }
    }, []);

    useEffect(() => {
        const newDefiner = generateUniqueId();
        setDefinerId(newDefiner);
        sessionStorage.setItem('taskDefiner', newDefiner);
    }, []);



    useEffect(() => {
        const fetchStatuses = async () => {
            try {
                if (projectId === null) {
                    console.error('No project ID found in URL');
                    return;
                }

                const response = await getStatus(projectId, false);
                if (response.boards) {
                    setStatuses(response.boards);
                } else {
                    console.error('Unexpected API response format:', response);
                }
            } catch (error) {
                console.error('Error fetching statuses:', error);
            }
        };

        fetchStatuses();
    }, [projectId]);

    const handlePriorityChange = (priority: string) => {
        setSelectedPriority(priority);
    };
    

    const handleStatusChange = (status: string) => {
        setSelectedStatus(status);
    };

    const handleSelectMembers = (clients: User[]) => {
        setSelectedMembers(clients);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        const title = titleInputRef.current?.value.trim() || '';
        const descriptionValue = description || ''; // Ensure description is a string
        const status = statuses.find(status => status.name === selectedStatus)?.id || '';
    
        if (!title || !projectId || !status || !selectedPriority || selectedMembers.length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Validation Error',
                text: 'Please fill in all required fields.',
                customClass: {
                    confirmButton: 'custom-no-button'
                }
            });
            return;
        }
    
        let uploadSuccessful = true;
    
        try {
            // Upload files (if needed)
    
            if (actiontype === 'clone') {
                // Clone task
                await createTask({
                    title,
                    description: descriptionValue,
                    projectId,
                    status,
                    priority: selectedPriority.toLowerCase(),
                    assignedTo: selectedMembers[0].id,
                    definer: definerId,
                });
    
                Swal.fire({
                    icon: 'success',
                    title: 'Task Cloned',
                    text: 'Your task has been successfully cloned.',
                    customClass: {
                        confirmButton: 'custom-ok-button'
                    }
                });
    
            } else if (actiontype === 'edit') {
                // Update task
                if (!task?.id) {
                    throw new Error('Task ID is required for updating.');
                }
    
                await updateTask({
                    id: task.id,
                    title,
                    description: descriptionValue,
                    projectId,
                    status,
                    priority: selectedPriority.toLowerCase(),
                    assignedTo: selectedMembers[0].id,
                    definer: definerId,
                });
    
                Swal.fire({
                    icon: 'success',
                    title: 'Task Updated',
                    text: 'Your task has been successfully updated.',
                    customClass: {
                        confirmButton: 'custom-ok-button'
                    }
                });
    
            } else {
                throw new Error('Unknown action type.');
            }
    
            onClose();
        } catch (error: any) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `An error occurred: ${error.message}. Please try again.`,
                customClass: {
                    confirmButton: 'custom-no-button'
                }
            });
            console.error('Error handling task:', error);
        } finally {
            setIsLoading(false);
        }
    };
    
    


    return (
        <div className="fixed inset-0 top-0 left-0 min-h-screen flex items-end justify-end">
                 {isLoading && (
      <div className="fixed inset-0 z-90 bg-black bg-opacity-50  flex justify-center items-center pointer-events-none">
        <div className="relative z-90 flex justify-center items-center">
          <Loader />
        </div>
      </div>
    )}
            <div className="bg-[#F4F4F4] min-h-screen w-full max-w-lg relative">
                <div className='flex px-4 pt-4 bg-white border-b border-b-[#E4E4E4] flex-row mb-4 justify-between'>
                    <FaWindowClose onClick={onClose} className='text-3xl cursor-pointer' />
                    <h2 className="text-center text-xl font-bold mt-1 ml-8">
                {actiontype === 'clone' ? 'Clone Task' : 'Edit Task'}
            </h2>
                    <button
                        type="button"
                        className="bg-[#FDC90E] hover:text-[#FDC90E] hover:bg-black text-black font-semibold rounded-lg py-1 px-6 mb-3"
                        onClick={() => {
                            if (formRef.current) {
                                formRef.current.requestSubmit(); 
                            }
                        }}
                    >
                        Save
                    </button>
                </div>
                <form ref={formRef} className={`space-y-4 px-6 ${isLoading ? 'opacity-50 pointer-events-none' : ''}`} onSubmit={handleSubmit}>
                    <div>
                        <label className="block font-semibold mb-1">
                            Title <span className="text-red-500">*</span>
                        </label>
                        <input 
                            type="text"
                            className="w-full focus:outline-[#FDC90E] border border-gray-300 rounded-lg p-2"
                            placeholder="Title"
                            defaultValue={task?.title || ''}
                            ref={titleInputRef}
                        />
                    </div>
                    <div>
                        <label className="block font-semibold mb-1">Description</label>
                        <CKEditor
                            editor={ClassicEditor}
                            data={description}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setDescription(data);
                            }}
                            config={{
                                toolbar: [
                                    'bold', 'italic', 'underline', 'strikethrough',
                                    'fontColor', 'fontBackgroundColor',
                                    'fontSize', 'fontFamily',
                                    'bulletedList', 'numberedList',
                                    'alignment',
                                    'undo', 'redo'
                                ],
                                placeholder: "Description",
                            }}
                        />
                    </div>
                    <div className="p-1">
                    <div className="mb-4">
    <label className="block font-semibold mb-2">Priority</label>
    <div className="flex space-x-4 w-full">
        {['urgent', 'high', 'medium', 'low'].map((priority) => (
            <div
                key={priority}
                className={`flex w-full justify-center items-center bg-white rounded-lg p-1 font-semibold text-sm space-x-2 cursor-pointer ${
                    selectedPriority === priority ? 'border-2 border-blue-500' : ''
                }`}
                onClick={() => handlePriorityChange(priority)}
            >
                <span
                    className={`w-4 h-4 rounded-full ${
                        priority === 'urgent'
                            ? 'bg-[#CC0000]'
                            : priority === 'high'
                            ? 'bg-[#F9781D]'
                            : priority === 'medium'
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
                                {statuses.map((status) => (
                                    <div
                                        key={status.id}
                                        className={`flex justify-center items-center bg-white rounded-lg px-2 py-1 font-semibold text-sm space-x-1 cursor-pointer ${selectedStatus === status.name ? 'border-2 border-blue-500' : ''
                                            }`}
                                        onClick={() => handleStatusChange(status.name)}
                                    >
                                        <span
                                            className={`w-4 h-4 rounded-full`}
                                            style={{ backgroundColor: status.color }}
                                        ></span>
                                        <span>{status.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="block font-semibold mb-1">
                            Assigned to <span className="text-red-500">*</span>
                        </label>
                        <div 
                            onClick={() => setSelectUserModalOpen(true)} 
                            className="flex cursor-pointer w-full bg-white items-center border border-gray-300 rounded-lg p-2"
                        >
                            {selectedMembers.length > 0 ? (
                                selectedMembers.map(user => (
                                    <div key={user.id} className="flex items-center w-full">
                                         <Image
                        src={user.image || '/defaultBee.png'} 
                        alt={user.userName}
                        width={24}
                        height={24}
                        className="w-6 h-6 rounded-full"
                    />
                                        <span className="text-sm font-semibold mx-2">{user.firstName} {user.lastName}</span>
                                    </div>
                                ))
                            ) : (
                                <div className='flex justify-between w-full items-center'>
                                    <span>Select Member</span>
                                    <IoIosArrowDown size={20} className="text-black" />
                                </div>
                            )}
                        </div>
                    </div>
                    {isSelectUserModalOpen && (
                        <div className="fixed inset-0 flex items-end justify-end bg-gray-800 bg-opacity-50 z-80">
                            <SelectMemberForm
                                selectedMembers={new Set(selectedMembers.map(member => member.id))}
                                projectId={projectId}
                                toggleModal={() => setSelectUserModalOpen(false)}
                                onSelectMembers={handleSelectMembers}
                            />
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default EditTaskModal;
