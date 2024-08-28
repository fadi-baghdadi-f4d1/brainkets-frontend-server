import React, { useState } from 'react';
import { highlightTask } from '@/services/tasks/highlight/HighlightTaskApi';
import { toast } from 'react-toastify';
import Loader from '@/components/common/loader/loader';

interface HighlightTaskProps {
  onClose: () => void;
  entityId: number;
}

const HighlightTask: React.FC<HighlightTaskProps> = ({ onClose, entityId }) => {
  const [highlight, setHighlight] = useState('None');
  const [loading, setLoading] = useState<boolean>(false);

  const highlightOptions = [
    { color: '#F4F4F4', label: 'None' },
    { color: '#FDE480', label: 'Yellow' },
    { color: '#ACFD9E', label: 'Green' },
    { color: '#FBAEA4', label: 'Red' },
    { color: '#97F1FC', label: 'Blue' },
  ];

  const handleButtonClick = async (label: string) => {
    const selectedColor = label === 'None' ? null : highlightOptions.find(option => option.label === label)?.color || null;
    
    try {
      setLoading(true);
      await highlightTask(entityId, selectedColor);
      toast.success('Highlight successfully updated');
      setHighlight(label);
    } catch (error) {
      toast.error('Failed to update highlight');
    } finally {
      onClose();
      setLoading(false);
    }
  };
  

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
       {loading && (
        <div className="absolute inset-0 flex justify-center items-center z-10">
          <Loader /> 
        </div>
      )}
      <div className="w-[350px] h-[400px] mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-center text-xl font-semibold mb-2">Highlight</h2>
        <div className="flex flex-col items-center justify-center space-y-4">
          {highlightOptions.map(({ color, label }) => (
            <div key={label} className="w-full flex justify-center">
              <button
                onClick={() => handleButtonClick(label)}
                className="w-full font-semibold p-1 h-12 rounded-lg transition duration-300 transform hover:scale-105"
                style={{ backgroundColor: color }}
              >
                {label === 'None' ? 'None' : ''}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HighlightTask;
