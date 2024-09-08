"use client";

import React, { useEffect, useRef, useState } from 'react';
import dragula from 'dragula';
import 'dragula/dist/dragula.css';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import tasksData from './tickets.json';
import { CiEdit } from 'react-icons/ci';
import { HiDotsVertical } from 'react-icons/hi';
import Image from 'next/image';
import TaskMenu from '../taskboard/modals/TaskMenu';
import Portal from '../taskboard/Portal';
import { useModalContext } from '@/context/ModalContext';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import ViewTicketModal from './modals/ViewTicket';

type Ticket = {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  assignees: { name: string; photo: string }[];
  date: string;
};

type Column = {
  id: number;
  title: string;
  tasks: Ticket[];
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
      assignees: task.assignees,
      date: task.date,
    });
  });

  return Object.values(columns);
};


const initialColumns: Column[] = transformData(tasksData);

const colorClasses: Record<string, { circle: string; text: string }> = {
  'Opened': { circle: 'bg-[#FDC90E]', text: 'text-[#FDC90E]' },
  'Closed': { circle: 'bg-[#19B600]', text: 'text-[#19B600]' },
  QA: { circle: "bg-yellow-500", text: "text-yellow-500" },
  Completed: { circle: "bg-green-500", text: "text-green-500" },
  Urgent: { circle: "bg-red-600", text: "text-red-600" },
  High: { circle: "bg-red-500", text: "text-red-500" },
  Medium: { circle: "bg-blue-500", text: "text-blue-500" },
  Low: { circle: "bg-yellow-500", text: "text-yellow-500" },
};

const ItemTypes = {
  COLUMN: 'column',
};

type TicketsProps = {
  setSelectedTicket: (ticket: Ticket) => void;
  setShowModal: (show: boolean) => void;
};

const DraggableColumn: React.FC<{
  column: Column;
  index: number;
  moveColumn: (dragIndex: number, hoverIndex: number) => void;
  toggleMenu: (event: React.MouseEvent) => void;
  showMenu: boolean;
  menuPosition: { top: number; left: number };
  menuRef: React.RefObject<HTMLDivElement>;
  setSelectedTicket: (ticket: Ticket) => void;
  setShowModal: (show: boolean) => void;
}> = ({ column, index, moveColumn, toggleMenu, showMenu, menuPosition, menuRef, setSelectedTicket, setShowModal }) => {
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

  const handleViewTicket = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setShowModal(true);
  };
  
  const { toggleEditTicketModal } = useModalContext();

  const handleEditTicket = (event: React.MouseEvent) => {
    event.stopPropagation();
    toggleEditTicketModal();
  };

  return (
    <div className="w-1/4">
    <div className={`column-title sticky w-full top-0 z-10 bg-white p-2 rounded-t-md ${colorClasses[column.title]?.text || 'text-gray-500'}`}>
        <h2 className="text-lg font-semibold flex items-center">
          <span className={`rounded-full w-3 h-3 block ${colorClasses[column.title]?.circle || 'bg-gray-300'} mr-2`} />
          {column.title}
          <span className="text-black bg-[#E7E7E7] py-1 px-3 rounded-md mx-2 text-xs">{column.tasks.length}</span>
        </h2>
      </div>
    <div ref={combinedRef} className={`column mb-10  overflow-y-auto min-w-[25%] custom-scrollbar  z-0 bg-white rounded-b-md flex flex-col h-[840px] w-full overflow-hidden`} >
      
      {column.tasks.map((task) => {
        const priorityColorClass = colorClasses[task.priority]?.circle || 'bg-gray-300';
        const priorityTextColor = colorClasses[task.priority]?.text || 'text-black';
        const statusColorClass = colorClasses[task.status]?.circle || 'bg-gray-300';
        return (
          <div
            key={task.id}
            className="relative mx-4 bg-[#f4f4f4] z-0 rounded-lg shadow-md p-4 mb-4 transition-transform transform hover:scale-95 overflow-visible task-card group"
            onClick={() => handleViewTicket(task)}
          >
            <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${statusColorClass} rounded-l-lg`}></div>
            <div className="pl-4">
              <div className='flex flex-row justify-between'>
                <h3 className="font-bold text-2xl">{task.title}</h3>
                <div className='relative'>
                  <div className='relative'>
                    <div className='absolute flex flex-row z-10 right-6 invisible group-hover:visible transition-opacity duration-300'>
                      <button onClick={handleEditTicket} className="transform right-0 mt-1 text-black">
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
                          {/* <TaskMenu entityId={123} entityType="ticket" modalType="ticket" showMenu={showMenu} toggleMenu={toggleMenu} /> */}
                        </div>
                      </Portal>
                    )}
                </div>
              </div>
              <p className="text-sm text-gray-600">{task.description}</p>
              <div className="flex items-start mt-2 flex-col">
                {task.assignees.map((assignee, index) => (
                  <div key={index} className="flex items-center mr-2 p-2">
                    <Image src="/blueBoy.svg" alt={assignee.name} width={12} height={12} className="w-4 h-4 mr-2" />
                    <img src={assignee.photo} alt={assignee.name} className="w-6 h-6 rounded-full mr-2" />
                    <span className="text-gray-800 text-xs font-semibold">{assignee.name}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-end items-end mt-2 flex-row">
                <div className='bg-white items-center rounded-[14px]'>
                  <Image src="/attach.svg" alt="Delete" width={16} height={16} className="w-6 h-6 p-1" />
                </div>
                <div
                  className={`flex items-center ${priorityColorClass} bg-opacity-20 rounded-xl py-1 px-2`}
                >
                  <span className={`text-xs ${priorityTextColor}`}>
                    {task.priority}
                  </span>
                </div>
                <div className="text-xs text-gray-500 flex items-center rounded-xl mx-1 p-1 bg-white">
                  <img src="/calendar.svg" alt="calendar" className="w-3 h-3 mr-1" />
                  {task.date}
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

const Tickets: React.FC<TicketsProps> = ({ setSelectedTicket, setShowModal }) => {
  const columnsRef = useRef<HTMLDivElement>(null);

  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const menuRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState<Column[]>(initialColumns);

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
  

  useOnClickOutside([menuRef], () => {
    setShowMenu(false);
  });

  const [activeColumnId, setActiveColumnId] = useState<number | null>(null);

const toggleColumnView = (columnId: number) => {
  if (activeColumnId === columnId) {
    setActiveColumnId(null);
  } else {
    setActiveColumnId(columnId);
  }
};



return (
  <DndProvider backend={HTML5Backend}>
    <div className="hidden sm:flex mx-[40px] mt-6 space-x-4 overflow-x-auto" ref={columnsRef}>
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
          setSelectedTicket={setSelectedTicket}
          setShowModal={setShowModal}
        />
      ))}
    </div>
    <div className="flex sm:hidden flex-row items-center justify-center space-y-4">
      {columns.map((column) => (
        <button 
          key={column.id} 
          className={`flex items-center justify-center w-40 py-2 px-4 rounded-full text-white ${colorClasses[column.title]?.circle || 'bg-gray-300'}`}
          onClick={() => toggleColumnView(column.id)}
        >
          <span className="text-xl font-semibold">{column.tasks.length}</span>
          <span className="ml-2">{column.title}</span>
        </button>
      ))}
    </div>
    {activeColumnId !== null && (
      <div className="sm:hidden mt-4">
        {columns.find(col => col.id === activeColumnId)?.tasks.map((task) => (
          <div
            key={task.id}
            className="mx-4 bg-[#f4f4f4] z-0 rounded-lg shadow-md p-4 mb-4 transition-transform transform hover:scale-95 overflow-visible task-card group"
            // onClick={() => handleViewTicket(task)}
          >
            <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${colorClasses[task.status]?.circle || 'bg-gray-300'} rounded-l-lg`}></div>
            <div className="pl-4">
              <h3 className="font-bold text-2xl">{task.title}</h3>
              <p className="text-sm text-gray-600">{task.description}</p>
              {/* ... other task details ... */}
            </div>
          </div>
        ))}
      </div>
    )}

    </DndProvider>
  );
};

export default Tickets;
