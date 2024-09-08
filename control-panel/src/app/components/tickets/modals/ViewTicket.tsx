"use client";
import React, { useEffect, useRef } from 'react';
import { FaWindowClose } from 'react-icons/fa';
import Image from 'next/image';

export interface Ticket {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  assignees: { name: string; photo: string }[];
  date: string;
}

interface ViewTicketModalProps {
  ticket: Ticket | null;
  onClose: () => void;
}

const colorClasses: Record<string, { circle: string; text: string }> = {
  'Opened': { circle: 'bg-[#FDC90E]', text: 'text-[#FDC90E]' },
  'Closed': { circle: 'bg-[#19B600]', text: 'text-[#19B600]' },
  'Urgent': { circle: 'bg-red-600', text: 'text-red-600' },
  'High': { circle: 'bg-red-500', text: 'text-red-500' },
  'Medium': { circle: 'bg-blue-500', text: 'text-blue-500' },
  'Low': { circle: 'bg-yellow-500', text: 'text-yellow-500' },
  'To Do': { circle: 'bg-red-500', text: 'text-red-500' },
  'In Progress': { circle: 'bg-blue-500', text: 'text-blue-500' },
  'QA': { circle: 'bg-yellow-500', text: 'text-yellow-500' },
  'Completed': { circle: 'bg-green-500', text: 'text-green-500' },
};

  
  const ViewTicketModal: React.FC<ViewTicketModalProps> = ({ ticket, onClose }) => {
  const commentInputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (commentInputRef.current) {
      commentInputRef.current.focus();
    }
  }, []);

  if (!ticket) return null;

  const statusColorClass = colorClasses[ticket.status]?.circle || "bg-gray-300";
  const priorityColorClass = colorClasses[ticket.priority]?.circle || "bg-gray-300";
  const priorityTextColor = colorClasses[ticket.priority]?.text || "text-black";

  return (

      <div className="bg-white rounded-xl shadow-lg w-[550px]">
        <div className="flex items-center mb-2 p-4">
          <FaWindowClose className="text-3xl cursor-pointer" onClick={onClose} />
          <h2 className="text-xl font-bold mx-auto">{ticket.title}</h2>
        </div>
        <div className="bg-[#F4F4F4] p-4 rounded-b-xl">
          <p className="text-lg text-black font-semibold mb-4">{ticket.description}</p>
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
                <Image
                  src="/priority.svg"
                  alt="Priority Icon"
                  width={16}
                  height={16}
                  className="mr-2"
                />
                <span className="font-semibold">Priority</span>
              </div>
              <div className="flex items-center mb-2">
                <Image
                  src="/status.svg"
                  alt="Status Icon"
                  width={16}
                  height={16}
                  className="mr-2"
                />
                <span className="font-semibold">Status</span>
              </div>
              <div className="flex items-center mb-2">
                <Image
                  src="/duedate.svg"
                  alt="Created Date Icon"
                  width={16}
                  height={16}
                  className="mr-2"
                />
                <span className="font-semibold">Created Date</span>
              </div>
              <div className="flex items-center mb-2">
                <Image
                  src="/viewers.svg"
                  alt="Due Date Icon"
                  width={16}
                  height={16}
                  className="mr-2"
                />
                <span className="font-semibold">Viewers</span>
              </div>
            </div>
            {/* Details Column */}
            <div className="w-1/2 text-[#606060]">
              <div className="flex items-center mb-2">
                <div className="flex items-center">
                  <img src="/profile.png" alt="John Smith" className="w-6 h-6 rounded-full mr-2" />
                  <span>John Smith</span>
                </div>
              </div>
              <div className="flex items-center mb-2">
                <div className="flex items-center">
                  <img src={ticket.assignees[0]?.photo || "/path/to/default.jpg"} alt="Assignee" className="w-6 h-6 rounded-full mr-2" />
                  <span>{ticket.assignees[0]?.name || "N/A"}</span>
                </div>
              </div>
              <div className="flex items-center mb-2">
                <div className="flex items-center">
                  <div
                    className={`flex items-center ${priorityColorClass} bg-opacity-20 rounded-xl py-1 px-2`}
                  >
                    <span className={`text-xs ${priorityTextColor}`}>
                      {ticket.priority}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center mb-2">
                <div
                  className={`flex items-center ${statusColorClass} bg-opacity-20 rounded-xl py-1 px-2`}
                >
                  <span
                    className={`text-xs ${colorClasses[ticket.status]?.text}`}
                  >
                    {ticket.status}
                  </span>
                </div>
              </div>
              <div className="flex items-center mb-2">
                <div className="flex items-center">
                  <span className="ml-2">Jun 19, 2024 at 9:00 AM</span>
                </div>
              </div>
              <div className="flex items-center mt-1">
                <div className="flex items-start flex-col justify-start">
                <div className="flex items-start mb-2">
              <img
                src="/profile image.png"
                alt="John Smith"
                className="w-6 h-6 rounded-full mr-2"
              />
              <span>John Smith</span>
            </div>
            <div className="flex items-center mb-2">
              <img
                src="/profile.png"
                alt="Angelina Smith"
                className="w-6 h-6 rounded-full mr-2"
              />
              <span>Angelina Smith</span>
            </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex bg-white rounded-b-lg flex-col p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex flex-row">
                <img src="/profile.png" alt="Angelina Smith" className="w-6 h-6 rounded-full mr-2" />
                <h1>Angelina Smith</h1>
              </div>
              <div>
                <button className="bg-yellow-500 font-semibold text-black hover:text-yellow-500 hover:bg-black py-1 px-4 rounded">
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
              <div className="bg-gray-100 w-full mt-4 rounded-lg p-1">
                <div className="flex items-center mb-2 mt-2">
                  <img src="/profile image.png" alt="John Smith" className="w-6 h-6 rounded-full mx-2" />
                  <span className="text-[#606060] text-sm font-semibold">John Smith</span>
                </div>
                <p className="p-1 w-full rounded-lg text-xs text-black">
                  Lorem ipsum dolor sit amet consectetur. Dui sit pulvinar facilisi nec.
                  <br />
                  <span className="text-[#0583D2]">@JohnSmith</span>
                </p>
                <div className="flex justify-end">
                  <span className="text-xs text-[#606060] mt-2">Mar 15, 2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default ViewTicketModal;
