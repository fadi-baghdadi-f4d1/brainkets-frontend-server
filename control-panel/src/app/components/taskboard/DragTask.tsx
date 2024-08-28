import React, { useEffect, useRef, useState } from 'react';
import dragula from 'dragula';
import { getStatus } from "../../services/tasks/status/GetStatusApi";
import { Task, Status, ApiResponse } from "../../types/Task";
import { moveTask } from "@/services/tasks/tasksCrud/MoveTaskApi";
import ViewTask from "./modals/ViewTask";
import { CiEdit } from "react-icons/ci";
import EditTaskModal from './modals/EditTaskModal';
import TaskMenu from "./modals/TaskMenu";
import { HiDotsVertical } from "react-icons/hi";
import Portal from "./Portal";

interface DragTaskProps {
  projectId: number | null; 
}


const DragTask: React.FC<DragTaskProps> = ({ projectId }) => {
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [tasksByStatus, setTasksByStatus] = useState<{ [key: number]: Task[] }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null); 
  const [isViewTaskModalOpen, setIsViewTaskModalOpen] = useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] = useState<number | null>(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const columnRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [editTaskModalOpen, setEditTaskModalOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [currentTaskId, setCurrentTaskId] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = (event: React.MouseEvent, task: Task) => {
    event.stopPropagation();
    setSelectedTask(task); // Update selectedTask here
    setCurrentTaskId(task.id);
    setShowMenu(!showMenu);
    setMenuPosition({ top: event.clientY, left: event.clientX });
  };
  
  const handleEditTask = (task: Task, event: React.MouseEvent) => {
    setSelectedTask(task); 
    setEditTaskModalOpen(true); 
    event.stopPropagation(); 
  };
  
  
  

  const handleResize = () => {
    if (window.innerWidth <= 1220) { 
      setIsSmallScreen(true);
      if (!selectedStatus && statuses.length > 0) {
        setSelectedStatus(statuses[0].id);
      }
    } else {
      setIsSmallScreen(false);
      setSelectedStatus(null); 
    }
  };


  const closeEditTaskModal = () => {
    setEditTaskModalOpen(false);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    // Trigger the resize handler on component mount to set the initial state
    handleResize();

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [statuses, selectedStatus]); // Add dependencies to re-run when statuses change


  useEffect(() => {
    const fetchStatusesAndTasks = async () => {
      try {

        if (projectId === null) {
          setLoading(false);
          return;
        }

        const response: ApiResponse = await getStatus(projectId);
        const { boards, data } = response;

        if (boards && data) {
          setStatuses(boards);
          const tasksByStatusInit: { [key: number]: Task[] } = {};
          boards.forEach(status => {
            tasksByStatusInit[status.id] = [];
          });

          Object.keys(data).forEach(statusId => {
            const statusIdNumber = parseInt(statusId, 10);
            tasksByStatusInit[statusIdNumber] = data[statusIdNumber].tasks;
          });

          setTasksByStatus(tasksByStatusInit);
        } else {
          console.error('Unexpected API response format:', response);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching statuses and tasks:', error);
        setLoading(false);
      }
    };

    fetchStatusesAndTasks();
  }, []);

  useEffect(() => {
    if (!isSmallScreen) {
      // Initialize Dragula on large screens only
      const containers = columnRefs.current.filter(Boolean) as HTMLDivElement[];
      const drake = dragula(containers);

      drake.on('drop', (el, target) => {
        const idString = el.getAttribute('data-task-id');
        const status = target.id.replace('column-', '');

        if (idString) {
          const id = parseInt(idString, 10); // Convert id to number
          moveTask(id, status)
            .then(() => {
              console.log('Task moved successfully');
            })
            .catch((error) => {
              console.error('Error moving task:', error);
            });
        }
      });

      return () => {
        drake.destroy(); // Cleanup dragula on unmount
      };
    }
  }, [isSmallScreen, statuses]);

  const openViewTaskModal = (task: Task) => {
    setSelectedTask(task); // Set the selected task
    setIsViewTaskModalOpen(true); // Open the modal
  };

  const closeViewTaskModal = () => {
    setIsViewTaskModalOpen(false); // Close the modal
  };




  if (loading) {
    // Ensure statuses is always an array (even if empty)
    const skeletonStatuses = statuses.length > 0 ? statuses : [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
  
    return (
      <div className="p-4">
        <div className="flex gap-4 p-4">
          {skeletonStatuses.map((status) => (
            <div
              key={status.id}
              className="flex-1 min-h-screen border border-gray-300 rounded-lg p-4 bg-gray-50 shadow-md min-w-[200px] column"
            >
              <div className="flex flex-col items-center">
                <div className="w-full min-h-screen bg-gray-200 rounded-md animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  
  

  return (
    <div className="p-4">
      {/* Display Status Buttons on Small Screens */}
      <div className="flex gap-1 w-full px-4 overflow-x-auto xl:hidden whitespace-nowrap custom-scrollbar">
        {statuses.map((status) => (
          <button
            key={status.id}
            onClick={() => setSelectedStatus(status.id)}
            className={`flex-grow min-w-[100px] bg-white rounded-lg p-1 shadow-md text-center ${selectedStatus === status.id ? 'border border-black' : 'border border-gray-300'
              }`}
          >
            <div className="flex items-center justify-center">
              <span
                className="rounded-full w-4 h-4 block mr-2"
                style={{ backgroundColor: status.color || "black" }}
              />
              <h2 className="text-sm xl:text-md md:text-md font-semibold">{status.name}</h2>
            </div>
          </button>
        ))}
      </div>






      {/* Display Columns on Large Screens or Selected Tasks on Small Screens */}
      <div className="flex gap-4 p-4">
        {statuses.map((status, index) =>
          (selectedStatus === status.id || selectedStatus === null) ? (
            <div
              key={status.id}
              ref={(el) => {
                if (el) {
                  columnRefs.current[index] = el;
                }
              }}
              style={{ backgroundColor: "white" }}
              id={`column-${status.id}`}
              className="flex-1 border border-gray-300 rounded-lg p-4 bg-gray-50 shadow-md min-w-[200px] column"
            >
              <div className=" flex-row hidden lg:flex pb-1 items-center">
                <span
                  className="rounded-full w-4 h-4 block mr-2"
                  style={{ backgroundColor: status.color || "black" }}
                />
                <h2 className="text-xl font-semibold handle">{status.name}</h2>
                <span className="text-black bg-[#E7E7E7] py-1 px-3 rounded-md mx-2 text-xs">
                  {tasksByStatus[status.id]?.length}
          </span>
              </div>
              {tasksByStatus[status.id]?.map((task) => (
            <div
            key={task.id}
            data-task-id={task.id}
            onClick={() => openViewTaskModal(task)}
            style={{ backgroundColor: task.highlight ? task.highlight : '#f4f4f4' }}
            className="task-card relative rounded-lg shadow-md p-4 mb-4 transition-transform transform hover:scale-95 cursor-pointer"
          >
          
             
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1.5 rounded-l-lg"
                    style={{ backgroundColor: status.color || "black" }}
                  ></div>
                  <div className='flex flex-row justify-between'>
                  <h3 className="font-bold text-xl">{task.title}</h3>
                  <div className="relative">
  <div className="flex flex-row z-80 right-0 group-hover:visible transition-opacity duration-300">
    <button onClick={(event) => handleEditTask(task, event)} className="transform right-3 text-black">
      <CiEdit size={20} />
    </button>
    <div className="ml-4">
      <HiDotsVertical
        className="text-xl cursor-pointer"
        onClick={(event) => toggleMenu(event, task)} // Pass task here
      />
    </div>
    {showMenu && currentTaskId === task.id && (
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
      <TaskMenu 
        task={selectedTask} // Ensure this is the updated task
        entityId={currentTaskId} 
        entityType="task" 
        modalType="task" 
        showMenu={showMenu} 
        toggleMenu={toggleMenu} 
      />
    </div>
  </Portal>
)}


  </div>
</div>
                  </div>

                  <div className="flex items-center mt-2">
                    <img
                      src={"/blueBoy.svg"}
                      alt={"assignedBy"}
                      className="w-4 h-4 mr-2"
                    />
                    <img
                      src={task.assignedBy.image}
                      alt={`${task.assignedBy.firstName} ${task.assignedBy.lastName}`}
                      className="w-6 h-6 rounded-full mr-2"
                    />
                    <span className="text-gray-800 text-xs font-semibold">
                      {task.assignedBy.firstName} {task.assignedBy.lastName}
                    </span>
                  </div>
                  <div className="flex items-center mt-2">
                    <img
                      src={"/purplePeople.svg"}
                      alt={"assignee"}
                      className="w-4 h-4 mr-2"
                    />
                    <img
                      src={task.assignee.image || "/defaultBee.png"}
                      alt={`${task.assignee.firstName} ${task.assignee.lastName}`}
                      className="w-6 h-6 rounded-full mr-2"
                    />
                    <span className="text-gray-800 text-xs font-semibold">
                      {task.assignee.firstName} {task.assignee.lastName}
                    </span>
                  </div>
                 
                  <div className='flex flex-row items-end justify-end'>
                  <div className="flex justify-between items-center mt-2 mr-1">
                  {task.hasComments === true && (
                      <div className="bg-[#D1F0CC] rounded-full p-1">
                        <img
                          src="/comment.svg"
                          alt="comment"
                          className="w-4 h-4"
                        />
                      </div>
                    )}
                    {task.attachments.length > 0 && (
                      <div className="bg-white rounded-full p-1">
                        <img
                          src="/attach.svg"
                          alt="Attachments"
                          className="w-4 h-4"
                        />
                      </div>
                    )}
             
             

                  </div>
                      <div
                        className={`flex items-center text-white rounded-xl py-1 px-2 ${task.priority === 'urgent'
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
                        <span className="text-xs">{task.priority}</span>
                      </div>

                      <div className="text-xs text-gray-500 flex items-center rounded-xl mx-1 p-1 bg-white">
                        <img
                          src="/calendar.svg"
                          alt="calendar"
                          className="w-3 h-3 mr-1"
                        />
                        {new Intl.DateTimeFormat('en-US', {
                          month: 'short',
                          day: '2-digit',
                          year: 'numeric',
                        }).format(new Date(task.createdDate))}
                      </div>
                    </div>
                </div>
                
              ))}
            </div>
          ) : null
        )}
      </div>

      {/* ViewTask Modal */}
      {selectedTask && (
        <ViewTask
          task={selectedTask}
          isOpen={isViewTaskModalOpen}
          onClose={closeViewTaskModal}
        />
      )}

      {editTaskModalOpen && (
         <div className="fixed inset-0 flex items-end justify-end bg-black bg-opacity-50 z-50">
        <EditTaskModal
          actiontype="edit"
          task={selectedTask}
          onClose={closeEditTaskModal}
        />
      </div>
      )}
    </div>
  );
};



export default DragTask;
