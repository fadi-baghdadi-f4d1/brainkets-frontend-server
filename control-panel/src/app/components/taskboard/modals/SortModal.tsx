"use client";
import React, { useEffect, useState } from 'react';
import { FaWindowClose } from "react-icons/fa";
import Image from 'next/image';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { getStatus } from "@/services/tasks/status/GetStatusApi";

interface SortModalProps {
  onClose: () => void; 
  projectId: number | null;
}

const SortModal: React.FC<SortModalProps> = ({ onClose, projectId }) => {
  const [sortedColumns, setSortedColumns] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch the status columns when the modal opens
  useEffect(() => {
    if (projectId) {
      getStatus(projectId, false)
        .then((response) => {
          setSortedColumns(response.boards); // Assuming the response contains the boards array
          setLoading(false);
        })
        .catch((error) => {
          console.error('Failed to fetch status:', error);
          setLoading(false);
        });
    }
  }, [projectId]);

  const handleSubmit = () => {
    console.log("Sorted Columns:", sortedColumns);
    onClose();
  };

  if (loading) {
    return <div>Loading...</div>; // Display loading indicator
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-lg shadow-lg relative w-1/3">
          <div className='flex flex-row p-4 justify-between border-b-2'>
            <h2 className="text-xl font-bold">Sort Task Status</h2>
            <div className='bg-white'>
            <FaWindowClose
              className="absolute top-4 right-4 text-2xl cursor-pointer rounded-md"
              onClick={onClose}
            />
            </div>
          </div>
          <div className="flex flex-row justify-between items-center p-4 space-x-4">
            {sortedColumns.map((column, index) => (
              <SortableItem
                key={column.id}
                index={index}
                column={column}
                columns={sortedColumns}
                moveColumn={(dragIndex, hoverIndex) => {
                  const newColumns = [...sortedColumns];
                  [newColumns[dragIndex], newColumns[hoverIndex]] = [newColumns[hoverIndex], newColumns[dragIndex]];
                  setSortedColumns(newColumns);
                }}
              />
            ))}
          </div>
          <div className='flex flex-row justify-end p-4 border-t'>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-[#FDC90E] text-black font-semibold rounded-lg hover:bg-black hover:text-[#FDC90E]"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

interface SortableItemProps {
  index: number;
  column: { id: number; name: string };
  columns: { id: number; name: string }[];
  moveColumn: (dragIndex: number, hoverIndex: number) => void;
}

const SortableItem: React.FC<SortableItemProps> = ({ index, column, columns, moveColumn }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [, drop] = useDrop({
    accept: 'COLUMN',
    hover(item: { index: number }) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      moveColumn(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'COLUMN',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // Combine the drag and drop refs into a single callback ref
  drag(drop(ref));

  return (
    <div ref={ref} className="flex justify-center items-center space-x-2">
      <div
        className={`border font-medium h-[100px] w-[100px] flex items-center justify-center rounded-lg p-2 text-center ${isDragging ? 'opacity-50' : 'opacity-100'}`}
      >
        {column.name}
      </div>
      {index < columns.length - 1 && (
        <div className="flex-shrink-0">
          <Image src="/sort.svg" alt="Arrow Icon" width={20} height={20} />
        </div>
      )}
    </div>
  );
};

export default SortModal;
