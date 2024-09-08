"use client";
import React, { useEffect, useState, useRef } from 'react';
import dragula from 'react-dragula';
import { getStatus } from "../../services/tasks/status/GetStatusApi";
import { moveTask } from "@/services/tasks/tasksCrud/MoveTaskApi";
import { Task, Status, ApiResponse } from "../../types/Task";

const Columns = () => {
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [tasksByStatus, setTasksByStatus] = useState<{ [key: number]: Task[] }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const containersRef = useRef<HTMLDivElement[]>([]); // Reference to columns

  useEffect(() => {
    const fetchStatusesAndTasks = async () => {
      try {
        const projectIdString = sessionStorage.getItem('projectId');
        const projectId = projectIdString ? parseInt(projectIdString, 10) : null;

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
    if (statuses.length > 0) {
      const drake = dragula(containersRef.current, {
        moves: (el) => el?.classList.contains('draggable-task') || false, // Only allow elements with class 'draggable-task' to be moved
        accepts: (el, target) => !!target, // Accept drop in any column
        revertOnSpill: true, // Revert task to original column if dropped outside any valid column
      });
  
      drake.on('drop', async (el, target, source) => {
        const taskId = el.getAttribute('data-task-id');
        const targetStatusId = target?.getAttribute('data-status-id');
  
        if (taskId && targetStatusId) {
          try {
            const taskIdNumber = Number(taskId);
            await moveTask(taskIdNumber, targetStatusId);
  
            setTasksByStatus((prevTasks) => {
              const updatedTasks = { ...prevTasks };
              const sourceStatusId = parseInt(source.getAttribute('data-status-id')!, 10);
              const targetStatusIdNumber = parseInt(targetStatusId, 10);
  
              const taskIndex = updatedTasks[sourceStatusId].findIndex(task => task.id === taskIdNumber);
              const [movedTask] = updatedTasks[sourceStatusId].splice(taskIndex, 1);
              updatedTasks[targetStatusIdNumber].push(movedTask);
  
              return updatedTasks;
            });
          } catch (error) {
            console.error('Failed to move task:', error);
          }
        }
      });
  
      return () => drake.destroy(); // Cleanup dragula on component unmount
    }
  }, [statuses]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {statuses.map((status, index) => (
        <div
          key={status.id}
          data-status-id={status.id}
          className="p-4 rounded shadow"
          style={{ backgroundColor: status.color }}
          ref={(el) => { containersRef.current[index] = el!; }}
        >
          <h2 className="font-bold text-lg mb-4">{status.name}</h2>
          <div className="p-4 rounded shadow">
            {tasksByStatus[status.id]?.map((task) => (
              <div
                key={task.id}
                data-task-id={task.id}
                className="draggable-task relative bg-[#f4f4f4] rounded-lg shadow-md p-4 mb-4 transition-transform transform hover:scale-95"
              >
                <h3 className="font-bold text-xl">{task.title}</h3>
                <p className="text-sm text-gray-600">{task.description}</p>
                <div className="flex items-center mt-2">
                  <img
                    src={task.assignee.image}
                    alt={`${task.assignee.firstName} ${task.assignee.lastName}`}
                    className="w-6 h-6 rounded-full mr-2"
                  />
                  <span className="text-gray-800 text-xs font-semibold">
                    {task.assignee.userName}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  {task.attachments.length > 0 && (
                    <div className="bg-white rounded p-1">
                      <img src="/attach.svg" alt="Attachments" className="w-6 h-6" />
                    </div>
                  )}
                  <div className={`flex items-center ${task.priority === 'high' ? 'bg-red-500' : 'bg-gray-300'} text-white rounded-xl py-1 px-2`}>
                    <span className="text-xs">{task.priority}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Columns;
