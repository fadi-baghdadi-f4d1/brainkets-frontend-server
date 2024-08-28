"use client";
import React, { useEffect, useRef, useState } from "react";
import dragula from "dragula";
import "dragula/dist/dragula.css";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import tasksData from "./tasks.json";
import { CiEdit } from "react-icons/ci";
import { HiDotsVertical } from "react-icons/hi";
import Image from "next/image";
import TaskMenu from "./modals/TaskMenu";
import Portal from "./Portal";
import { useModalContext } from '@/context/ModalContext';
import { FaFilePdf, FaFileWord, FaFileExcel, FaFilePowerpoint, FaFileVideo } from 'react-icons/fa';
import { IoDocumentTextSharp } from 'react-icons/io5';
import { PiFileZipDuotone } from 'react-icons/pi';
import { FaWindowClose } from 'react-icons/fa';
import { getStatus } from "../../services/tasks/status/GetStatusApi";


type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
  attachments: { type: string; url: string }[];
  priority: string;
  assignees: { name: string; photo: string }[];
};

export type Column = {
  id: number;
  title: string;
  tasks: Task[];
};



const transformData = (data: any[]): Column[] => {
  const columns: { [key: string]: Column } = {};

  data.forEach((task) => {
    if (!columns[task.status]) {
      columns[task.status] = {
        id: Object.keys(columns).length + 1,
        title: task.status,
        tasks: [],
      };
    }

    columns[task.status].tasks.push({
      id: task.id,
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
      attachments: task.attachments,
      assignees: task.assignees,
    });
  });

  return Object.values(columns);
};

const initialColumns: Column[] = transformData(tasksData);

type ColorClass = {
  circle: string;
  text: string;
};

const colorClasses: Record<string, ColorClass> = {
  "To Do": { circle: "bg-red-500", text: "text-red-500" },
  "In Progress": { circle: "bg-blue-500", text: "text-blue-500" },
  QA: { circle: "bg-yellow-500", text: "text-yellow-500" },
  Completed: { circle: "bg-green-500", text: "text-green-500" },
  Urgent: { circle: "bg-red-600", text: "text-red-600" },
  High: { circle: "bg-red-500", text: "text-red-500" },
  Medium: { circle: "bg-blue-500", text: "text-blue-500" },
  Low: { circle: "bg-yellow-500", text: "text-yellow-500" },
};

const ItemTypes = {
  COLUMN: "column",
};

const DraggableColumn: React.FC<{ 
  column: Column;
  index: number;
  moveColumn: (dragIndex: number, hoverIndex: number) => void;
  toggleMenu: (event: React.MouseEvent) => void;
  showMenu: boolean;
  menuPosition: { top: number; left: number };
  menuRef: React.RefObject<HTMLDivElement>;
  onCardClick: (task: Task) => void;
}> = ({
  column,
  index,
  moveColumn,
  toggleMenu,
  showMenu,
  menuPosition,
  menuRef,
  onCardClick,
}) => {
  const columnRef = useRef<HTMLDivElement | null>(null);
  const [, ref] = useDrag({
    type: ItemTypes.COLUMN,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemTypes.COLUMN,
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        moveColumn(item.index, index);
        item.index = index;
      }
    },
  });

  const combinedRef = (node: HTMLDivElement | null) => {
    ref(drop(node));
    columnRef.current = node;
  };

  const { toggleEditTaskModal } = useModalContext();

  const handleEditTask = (event: React.MouseEvent) => {
    event.stopPropagation();
    toggleEditTaskModal();
  };

  return (

    
    <div className="w-1/4">
      <div
        className={`column-title w-full top-0 z-10 bg-white p-2 rounded-t-md ${
          colorClasses[column.title]?.text || ""
        }`}

      > 
      <div className="flex flex-col items-center">
       <span
      className={`rounded-full w-3 h-3 block ${
        colorClasses[column.title]?.circle || "bg-gray-300"
      } mr-2`}
    />
        <h2 className="text-lg font-semibold flex items-center">
         
          {column.title}
          <span className="text-black bg-[#E7E7E7] py-1 px-3 rounded-md mx-2 text-xs">
            {column.tasks.length}
          </span>
        </h2>
        </div>
      </div>


      <div
        ref={combinedRef}
        className={`column mb-10  overflow-y-auto min-w-[25%] custom-scrollbar  z-0 bg-white rounded-b-md flex flex-col h-[840px] w-full overflow-hidden`}
      >
        {column.tasks.map((task) => {
          const priorityColorClass = colorClasses[task.priority]?.circle || "bg-gray-300";
          const priorityTextColor = colorClasses[task.priority]?.text || "text-black";
          const statusColorClass = colorClasses[task.status]?.circle || "bg-gray-300";
          const hasAttachments = task.attachments && task.attachments.length > 0;

          return (
            <div
              key={task.id}
              className="relative mx-4 bg-[#f4f4f4] z-0 rounded-lg shadow-md p-4 mb-4 transition-transform transform hover:scale-95 overflow-visible task-card group"
              onClick={() => onCardClick(task)}
            >
              <div
                className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                  statusColorClass
                } rounded-l-lg`}
              ></div>
              <div className="pl-4 cursor-pointer">
                <div className="flex flex-row justify-between">
                  <h3 className="font-bold text-2xl">{task.title}</h3>
                  <div className="relative">
                    <div className="relative">
                      <div className="absolute flex flex-row z-10 right-6 invisible group-hover:visible transition-opacity duration-300">
                        <button onClick={handleEditTask} className="transform right-3  text-black">
                          <CiEdit size={20} />
                        </button>
                      </div>
                    </div>
                    <div className="ml-4">
                    <HiDotsVertical
                      className="text-xl cursor-pointer"
                      onClick={toggleMenu}
                    />
                    </div>
                    {showMenu && (
                      <Portal>
                        <div
                          ref={menuRef}
                          style={{
                            position: "absolute",
                            top: `${menuPosition.top}px`,
                            left: `${menuPosition.left}px`,
                          }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          {/* <TaskMenu entityId={123} entityType="task" modalType="task" showMenu={showMenu} toggleMenu={toggleMenu} /> */}
                        </div>
                      </Portal>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-600">{task.description}</p>
                <div className="flex items-start mt-2 flex-col">
                  {task.assignees.map((assignee, index) => (
                    <div key={index} className="flex items-center mr-2 p-2">
                      <Image
                        src="/blueBoy.svg"
                        alt={assignee.name}
                        width={12}
                        height={12}
                        className="w-6 h-6 mr-2"
                      />
                      <img
                        src={assignee.photo}
                        alt={assignee.name}
                        className="w-6 h-6 rounded-full mr-2"
                      />
                      <span className="text-gray-800 text-xs font-semibold">
                        {assignee.name}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end items-end mt-2  flex-row">
                {hasAttachments && (
          <div className="bg-white items-center mr-2 rounded-[14px]">
            <Image
              src="/attach.svg"
              alt="Attachments"
              width={16}
              height={16}
              className="w-6 h-6 p-1"
            />
          </div>
        )}

                  <div
                    className={`flex items-center ${priorityColorClass} bg-opacity-20 rounded-xl py-1 px-2`}
                  >
                    <span className={`text-xs ${priorityTextColor}`}>
                      {task.priority}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 flex items-center rounded-xl mx-1 p-1 bg-white">
                    <img
                      src="/calendar.svg"
                      alt="calendar"
                      className="w-3 h-3 mr-1"
                    />
                    Mar 20, 2024
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};


const Modal: React.FC<{ task: Task | null; onClose: () => void }> = ({ task, onClose }) => {
  const commentInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (commentInputRef.current) {
      commentInputRef.current.focus();
    }
  }, []);

  if (!task) return null;

  const statusColorClass = colorClasses[task.status]?.circle || "bg-gray-300";
  const priorityColorClass = colorClasses[task.priority]?.circle || "bg-gray-300";
  const priorityTextColor = colorClasses[task.priority]?.text || "text-black";

  const handleImageClick = (url: string) => {
    setSelectedImage(url);
  };

  const handleCloseImageModal = () => {
    setSelectedImage(null);
  };


  const getIconForFileType = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FaFilePdf className="text-red-500 text-5xl" />;
      case 'doc':
      case 'docx':
        return <FaFileWord className="text-blue-500 text-4xl" />;
      case 'xls':
      case 'xlsx':
        return <FaFileExcel className="text-green-500 text-4xl" />;
      case 'ppt':
      case 'pptx':
        return <FaFilePowerpoint className="text-orange-500 text-4xl" />;
      case 'zip':
        return <PiFileZipDuotone className="text-yellow-500 text-4xl" />;
      case 'video':
        return <FaFileVideo className="text-blue-600 text-4xl" />;
      case 'txt':
        return <IoDocumentTextSharp className="text-gray-600 text-4xl" />;
      default:
        return <Image src="/file-icon.svg" alt="File Icon" width={24} height={24} />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-[550px]">
        <div className="flex items-center mb-2 p-4">
          <FaWindowClose className="text-3xl cursor-pointer" onClick={onClose} />
          <h2 className="text-xl font-bold mx-auto">{task.title}</h2>
        </div>
        <div className="bg-[#F4F4F4] p-4 rounded-b-xl">
          <p className="text-lg text-black font-semibold mb-4">{task.description}</p>
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
                  <img src="/profile.png" alt="John Smith" className="w-6 h-6 rounded-full mr-2" />
                  <span>John Smith</span>
                </div>
              </div>
              <div className="flex items-center mb-2">
                <div className="flex items-center">
                  <img src={task.assignees[0]?.photo || "/path/to/default.jpg"} alt="Assignee" className="w-6 h-6 rounded-full mr-2" />
                  <span>{task.assignees[0]?.name || "N/A"}</span>
                </div>
              </div>
              <div className="flex items-center mb-2">
                <div className={`flex items-center ${priorityColorClass} bg-opacity-20 rounded-xl py-1 px-2`}>
                  <span className={`text-xs ${priorityTextColor}`}>{task.priority}</span>
                </div>
              </div>
              <div className="flex items-center mb-2">
                <div className={`flex items-center ${statusColorClass} bg-opacity-20 rounded-xl py-1 px-2`}>
                  <span className={`text-xs ${colorClasses[task.status]?.text}`}>{task.status}</span>
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
                    <img src="/profile image.png" alt="John Smith" className="w-6 h-6 rounded-full mr-2" />
                    <span>John Smith</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <img src="/profile.png" alt="Angelina Smith" className="w-6 h-6 rounded-full mr-2" />
                    <span>Angelina Smith</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {task.attachments && task.attachments.length > 0 && (
            <div className="bg-white rounded-b-lg p-4">
              <h3 className="text-lg font-semibold mb-2">Attachments</h3>
              <div className="flex flex-row space-y-2">
              {task.attachments.map((attachment, index) => (
                  <div key={index} className="flex flex-row items-center space-x-2">
                    {attachment.type === 'image' ? (
                      <img
                        src={attachment.url}
                        alt="Attachment"
                        className="w-12 h-12 object-cover cursor-pointer"
                        onClick={() => handleImageClick(attachment.url)}
                      />
                    ) : (
                      <div className="flex items-center">
                        {getIconForFileType(attachment.type)}
                        <a
                          href={attachment.url}
                          download
                          className="text-blue-500 ml-2"
                        >
                          {/* {attachment.name || 'Download'} */}
                        </a>
                      </div>
                    )}
                    {/* <a href={attachment.url} download className="text-blue-500">
                      download
                    </a> */}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Image Modal */}
          {selectedImage && (
            <div
              className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center"
              onClick={handleCloseImageModal}
            >
              <img
                src={selectedImage}
                alt="Selected"
                className="max-w-full max-h-full"
              />
            </div>
          )}

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
    </div>
  );
};

////honnn
interface Status {
  id: number;
  name: string;
  color: string;
}

const TaskBoard: React.FC = () => {
  const columnsRef = useRef<HTMLDivElement>(null);

  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const menuRef = useRef<HTMLDivElement>(null);

  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [showSortModal, setShowSortModal] = useState(false);

  //honnn
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const projectIdString = sessionStorage.getItem('projectId');
        const projectId = projectIdString ? parseInt(projectIdString, 10) : null;

        if (projectId === null) {
          console.error('Project ID is null or invalid.');
          setLoading(false);
          return;
        }

        const response = await getStatus(projectId);

        console.log('API Response:', response);
        const statuses = response.boards;

        if (response && response.boards) {
          setStatuses(statuses);
        } else {
          console.error('Unexpected API response format:', response);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching statuses:', error);
        setLoading(false);
      }
    };

    fetchStatuses();
  }, []);




  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showModal, setShowModal] = useState(false);

  const moveColumn = (dragIndex: number, hoverIndex: number) => {
    const updatedColumns = [...columns];
    const [movedColumn] = updatedColumns.splice(dragIndex, 1);
    updatedColumns.splice(hoverIndex, 0, movedColumn);
    setColumns(updatedColumns);
  };

  const toggleMenu = (event: React.MouseEvent) => {
    event.stopPropagation();
    setShowMenu(!showMenu);
    setMenuPosition({ top: event.clientY, left: event.clientX });
  };

  const handleCardClick = (task: Task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTask(null);
  };

  const toggleSortModal = () => {
    setShowSortModal(!showSortModal);
  };

  
  const handleSortSubmit = (sortedColumns: Column[]) => {
    setColumns(sortedColumns);
    toggleSortModal(); // Close the modal after sorting
  };
  
  

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (columnsRef.current) {
        const columnContainers = Array.from(columnsRef.current.querySelectorAll('.column'));
        const taskContainers = Array.from(columnsRef.current.querySelectorAll('.task-card'));
  
        const taskDrake = dragula([...columnContainers], {
          moves: (el, source, handle, sibling) => {
            return (el?.classList.contains('task-card') ?? false) || (handle?.classList.contains('task-card') ?? false);
          },
        });
  
        columnContainers.forEach((container) => {
          const columnTitle = container.querySelector('.column-title') as HTMLElement;
          if (columnTitle) {
            columnTitle.style.pointerEvents = 'none';
          }
        });
  
        taskDrake.containers.push(...columnContainers);
  
        taskDrake.on('drop', (el, target, source, sibling) => {
          // Handle task drop
        });
  
        return () => {
          taskDrake.destroy();
        };
      }
    }
  }, [columns]);
  
  


  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex mx-[40px] mt-6 space-x-4 overflow-x-auto" ref={columnsRef}>
        {columns.map((column, index) => (
          <DraggableColumn
            key={column.id}
            column={column}
            index={index}
            moveColumn={moveColumn}
            toggleMenu={toggleMenu}
            showMenu={showMenu}
            menuPosition={menuPosition}
            menuRef={menuRef}
            onCardClick={handleCardClick}
          />
        ))}
      </div>
      {showModal && <Modal task={selectedTask} onClose={closeModal} />}
    </DndProvider>
  );
};
export default TaskBoard;
