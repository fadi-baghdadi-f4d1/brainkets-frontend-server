import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { FaWindowClose } from 'react-icons/fa';
import { Task } from "@/types/Task";
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { addComment } from "@/services/tasks/comments/AddCommentApi";
import { getComments } from "@/services/tasks/comments/GetCommentsApi";
import { getViewers } from "@/services/tasks/viewers/GetViewersApi";
import { addViewer } from "@/services/tasks/viewers/AddViewerApi";
import Swal from 'sweetalert2';
import {getIconForFile} from '@/utils/getFileIcon';
import { getMembers } from "@/services/tasks/members/GetMembersApi";

interface ModalProps {
  task: Task | null;
  onClose: () => void;
  isOpen: boolean;
}

const SkeletonLoader = () => (
  <div className="flex flex-col space-y-2">
    <div className="h-12 bg-gray-300 rounded-xl w-full p-4 animate-pulse"></div>
  </div>
);



const Modal: React.FC<ModalProps> = ({ task, onClose, isOpen }) => {
  const commentInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [loadingComments, setLoadingComments] = useState<boolean>(true);
  const user = useSelector((state: RootState) => state.user);
  const [viewers, setViewers] = useState<any[]>([]);
  const [loadingViewers, setLoadingViewers] = useState<boolean>(true);
  


  
  useEffect(() => {
    if (commentInputRef.current) {
      commentInputRef.current.focus();
    }
}, []);



  const handlePostComment = async () => {
    const commentText = commentInputRef.current?.value.trim();

    if (!commentText) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Please enter a comment before posting.',
        customClass: {
          confirmButton: 'custom-no-button',
        },
      });
      return;
    }

    if (task?.id === undefined) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Task ID is missing.',
      });
      return;
    }

    try {
      await addComment({ id: task.id, text: commentText });

      Swal.fire({
        icon: 'success',
        title: 'Comment Added',
        text: 'Your comment was added successfully!',
        customClass: {
          confirmButton: 'custom-ok-button',
        },
      });

      if (commentInputRef.current) {
        commentInputRef.current.value = '';
      }

      // Fetch updated comments after adding a new one
      handleGetComments();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to add comment. Please try again later.',
        customClass: {
          confirmButton: 'custom-no-button',
        },
      });
    }
  };

  const handleGetComments = async () => {
    if (task) {
      setLoadingComments(true);
      try {
        const comments = await getComments(task.id);
        setComments(comments);
      } catch (error) {
        console.error('Failed to fetch comments:', error);
      } finally {
        setLoadingComments(false);
      }
    } else {
      console.error('Task is null');
    }
  };


  const handleAddViewer = async () => {
    if (task && user) {
      try {
        await addViewer(task.id);
      } catch (error) {
        console.error('Failed to add viewer:', error);
      }
    }
  };


  useEffect(() => {
    if (isOpen && task) {
      handleGetComments();
      handleGetViewers();
      handleAddViewer(); 
    }
  }, [isOpen, task]);


  useEffect(() => {
    if (commentInputRef.current) {
      commentInputRef.current.focus();
    }
  }, []);


  const handleGetViewers = async () => {
    if (task) {
      setLoadingViewers(true);
      try {
        const viewers = await getViewers(task.id);
        setViewers(viewers);
      } catch (error) {
        console.error('Failed to fetch viewers:', error);
      } finally {
        setLoadingViewers(false);
      }
    } else {
      console.error('Task is null');
    }
  };

  

  if (!isOpen || !task) return null;

  const priorityTextColor = "text-white";

  const handleImageClick = (url: string) => {
    setSelectedImage(url);
  };

  const handleCloseImageModal = () => {
    setSelectedImage(null);
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white overflow-y-auto custom-scrollbar  max-h-[95%] items-center justify-center rounded-xl shadow-lg w-[550px]">
        <div className="flex items-center mb-2 p-4">
          <FaWindowClose className="text-3xl cursor-pointer" onClick={onClose} />
          <h2 className="text-xl font-bold mx-auto">{task.title}</h2>
        </div>
        <div className="bg-[#F4F4F4] p-4 rounded-b-xl ">
          <p
            className="text-lg text-black font-semibold mb-4"
            dangerouslySetInnerHTML={{ __html: task.description }}
          />

<div className="flex bg-white rounded-md p-4">
            {/* Labels Column */}
            <div className="w-1/2 pr-4">
              <div className="flex items-center mb-2">
                <Image src="/assignedby.svg" alt="Assigned By Icon" width={16} height={16} className="mr-2" />
                <span className="font-semibold">Assigned By</span>
              </div>
              <div className="flex items-center mb-2">
                <Image src="/assignee.svg" alt="Assignee Icon" width={16} height={16} className="mr-2" />
                <span className="font-semibold">Assignee</span>
              </div>
              <div className="flex items-center mb-2">
                <Image src="/priority.svg" alt="Priority Icon" width={16} height={16} className="mr-2" />
                <span className="font-semibold">Priority</span>
              </div>
              <div className="flex items-center mb-2">
                <Image src="/status.svg" alt="Status Icon" width={16} height={16} className="mr-2" />
                <span className="font-semibold">Status</span>
              </div>
              <div className="flex items-center mb-2">
                <Image src="/duedate.svg" alt="Created Date Icon" width={16} height={16} className="mr-2" />
                <span className="font-semibold">Created Date</span>
              </div>
              <div className="flex items-center mb-2">
                <Image src="/viewers.svg" alt="Due Date Icon" width={16} height={16} className="mr-2" />
                <span className="font-semibold">Viewers</span>
              </div>
            </div>

            {/* Details Column */}
            <div className="w-1/2 text-[#606060]">
              <div className="flex items-center mb-2">
                <div className="flex items-center">
                <img src={task.assignedBy.image || "/defaultBee.jpg"} alt="Assignee" className="w-6 h-6 rounded-full mr-2" />
                  <span>{task.assignedBy.firstName} {task.assignedBy.lastName}</span>
                </div>
              </div>
              <div className="flex items-center mb-2">
                <div className="flex items-center">
                  <img src={task.assignee.image || "/defaultBee.jpg"} alt="Assignee" className="w-6 h-6 rounded-full mr-2" />
                  <span>{task.assignee.firstName} {task.assignee.lastName}</span>
                </div>
              </div>
              <div className="flex items-center mb-2">
              <div
                  className={`flex items-center text-white rounded-xl py-1 px-2 ${
                    task.priority === 'urgent'
                      ? 'bg-red-600'
                      : task.priority === 'high'
                      ? 'bg-red-500'
                      : task.priority === 'medium'
                      ? 'bg-blue-500'
                      : task.priority === 'low'
                      ? 'bg-yellow-500'
                      : 'bg-gray-300'
                  }`}
                >
                  <span className={`text-xs ${priorityTextColor}`}>{task.priority}</span>
                </div>
              </div>
              <div className="flex items-center mb-2">
              <div
    className={`flex items-center ${
      task.status?.color ? '' : 'bg-gray-300'
    } bg-opacity-20 rounded-xl py-1 px-2`}
    style={{ backgroundColor: task.status?.color || "black" }}
  >
    {/* Display status name */}
    <span className="text-xs text-white">
      {task.status?.name || "No Status"}
    </span>
  </div>

              </div>
              <div className="flex items-center mb-2">
                <div className="flex items-center">
                  <span className="ml-2">{task.createdDate}</span>
                </div>
              </div>
              <div className="flex items-center mt-1">
  <div className="flex items-start flex-col justify-start">
    {/* Displaying viewers or a skeleton loader */}
    {loadingViewers ? (
      <SkeletonLoader /> // Show skeleton loader while fetching viewers
    ) : viewers.length > 0 ? (
      viewers.map((viewer) => (
        <div key={viewer.id} className="flex items-start my-1">
          <img src={viewer.image || "/defaultBee.png"} alt={viewer.name} className="w-6 h-6 rounded-full mr-2" />
          <span>{viewer.firstName} {viewer.lastName}</span>
        </div>
      ))
    ) : (
      <p>No viewers found.</p> // Message if no viewers are available
    )}
  </div>
</div>

            </div>
          </div>
{/* Attachments */}
{task.attachments && task.attachments.length > 0 && (
  <div className="bg-white rounded-b-lg p-4">
    <h3 className="text-lg font-semibold mb-2">Attachments</h3>
    <div className="flex flex-col justify-start space-x-2">
    {task.attachments.map((attachment) => {
  // Extract the file extension from the path
  const fileExtension = attachment.path?.split('.').pop()?.toLowerCase() || '';

  // Check if the file is an image
  const isImage = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg'].includes(fileExtension);

  // Check if the file is a voice note
  const isVoice = ['mp3', 'wav'].includes(fileExtension);

  return (
    <div key={attachment.id} className="flex flex-col items-start mb-4">
      {isImage ? (
        <>
        <div className='flex items-center flex-row'>
          <img
            src={attachment.path}
            alt={attachment.fileName || 'Attachment'}
            className="w-12 h-12 object-cover cursor-pointer"
            onClick={() => handleImageClick(attachment.path)}
          />
          <h1 className='ml-2'>Download</h1>
          </div>
          {selectedImage === attachment.path && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
              <div className="relative">
                <button
                  className="absolute top-2 right-2 text-white text-2xl font-bold"
                  onClick={() => setSelectedImage(null)}
                >
                  &times;
                </button>
                <img
                  src={attachment.path}
                  alt="Large View"
                  className="max-w-full max-h-screen object-contain"
                />
                <a
                  href={attachment.path}
                  download
                  className="absolute bottom-2 right-2 bg-[#FDC90E] text-black py-1 px-4 rounded"
                >
                  Download
                </a>
              </div>
            </div>
          )}
        </>
      ) : isVoice ? (
        <div className="flex flex-col items-center">
          <audio controls className="w-32">
            <source src={attachment.path} type={`audio/${fileExtension}`} />
            Your browser does not support the audio element.
          </audio>
          <a
            href={attachment.path}
            download={attachment.fileName}
            className="text-blue-500 mt-2"
          >
            Download
          </a>
        </div>
      ) : (
        <div className="flex items-center">
          {getIconForFile(attachment.path)}
          <a
            href={attachment.path}
            download={attachment.fileName}
            className="text-blue-500 mt-2 ml-2"
          >
            {attachment.fileName || 'Download'}
          </a>
        </div>
      )}
    </div>
  );
})}
    </div>
  </div>
)}

    {/* Comments Section */}
 <div className="flex bg-white rounded-b-lg flex-col p-4 mt-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex flex-row">
          <img src={user.image || "/defaultBee.png"} alt="User" className="w-6 h-6 rounded-full mr-2" />
          <span>{user.firstName} {user.lastName}</span>
        </div>
        <div>
          <button onClick={handlePostComment} className="bg-[#FDC90E] font-semibold text-black hover:text-[#FDC90E] hover:bg-black py-1 px-4 rounded">
            Post
          </button>
        </div>
      </div>
      <div className="flex flex-col mt-1">
        <input
          type="text"
          className="w-full p-4 border rounded-xl border-[#CFCFCF]"
          placeholder="Post Your Comment.."
          ref={commentInputRef}
        />

        {/* Display comments or skeleton loader */}
        <div className="mt-4">
          {loadingComments ? (
            <SkeletonLoader />
          ) : (
            <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
              {comments.map((comment) => (
                <div key={comment.id} className="p-4 bg-gray-100 rounded-xl">
                  <div className="flex items-center mb-2">
                    <img src={user.image || "/defaultBee.png"} alt="User" className="w-6 h-6 rounded-full mr-2" />
                    <span className="font-semibold">{user.firstName} {user.lastName}</span>
                  </div>
                  <p>{comment.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>

              </div>
            </div>
          </div>
  );
};

export default Modal;
