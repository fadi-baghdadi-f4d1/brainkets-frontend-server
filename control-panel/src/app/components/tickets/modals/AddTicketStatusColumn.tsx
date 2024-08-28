import React, { useEffect, useRef, useState } from 'react';
import { FaWindowClose } from 'react-icons/fa';
import { BlockPicker, CirclePicker, CompactPicker, TwitterPicker } from 'react-color';

interface AddTicketStatusColumnModalProps {
  onClose: () => void;
}

const AddTicketStatusColumn: React.FC<AddTicketStatusColumnModalProps> = ({ onClose }) => {
  const columnNameRef = useRef<HTMLInputElement>(null);
  const [color, setColor] = useState('#000000');
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  useEffect(() => {
    if (columnNameRef.current) {
      columnNameRef.current.focus();
    }
  }, []);

  const handleColorChange = (color: any) => {
    setColor(color.hex);
  };

  const toggleColorPicker = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg relative w-1/3">
        <div className="flex justify-between items-center p-4 border-b-2">
          <h2 className="text-xl font-bold">Add Status Column</h2>
          <FaWindowClose
            className="text-2xl cursor-pointer"
            onClick={onClose}
          />
        </div>
        <div className="p-4">
          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2">
              Column Name
            </label>
            <input
              type="text"
              placeholder="Enter Column Name"
              className="w-full px-3 py-2 border border-[#CFCFCF] rounded-lg focus:outline-none"
              ref={columnNameRef}
            />
          </div>
          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2">
              Colour Code<span className="text-red-500">*</span>
            </label>
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Select a colour"
                value={color}
                readOnly
                className="w-full px-3 py-2 border border-[#CFCFCF] rounded-lg focus:outline-none"
                onClick={toggleColorPicker}
              />
              <div
                className="ml-2 w-10 h-10 border rounded"
                style={{ backgroundColor: color }}
                onClick={toggleColorPicker}
              />
            </div>
            {displayColorPicker && (
              <div className="absolute z-10">
                <div
                  className="fixed inset-0"
                  onClick={toggleColorPicker}
                />
                <TwitterPicker color={color} onChange={handleColorChange} />
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-between p-4 border-t">
          <button
            className="px-4 mx-1 py-2 bg-white w-1/2 text-black font-semibold rounded-lg border border-black hover:bg-black hover:text-[#FDC90E]"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 mx-1 bg-[#FDC90E] w-1/2 text-black font-semibold rounded-lg hover:bg-black hover:text-[#FDC90E]"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTicketStatusColumn;
