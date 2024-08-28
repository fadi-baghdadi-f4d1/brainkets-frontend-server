import React, { useState } from 'react';
import { ChromePicker } from 'react-color';

interface AddBoardFormProps {
  onClose: () => void;
  onAddBoard: (name: string, color: string) => void;
}

const AddBoardForm: React.FC<AddBoardFormProps> = ({ onClose, onAddBoard }) => {
  const [boardName, setBoardName] = useState<string>('');
  const [boardColor, setBoardColor] = useState<string>('#000000');

  const handleAddBoard = () => {
    if (boardName) {
      onAddBoard(boardName, boardColor);
      onClose();
    }
  };

  const handleColorChange = (color: any) => {
    setBoardColor(color.hex);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="flex flex-col space-y-7 items-center bg-white p-6 rounded-md shadow-lg w-[500px]">
        <h2 className="text-[25px] font-bold">Add</h2>
        <div className="mb-4 w-[90%]">
  
          <input
            type="text"
            className="w-full border border-[##CFCFCF] rounded-lg px-3 py-2"
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
            placeholder='Board Name'
          />
        </div>
        <div className="mb-4">

          <ChromePicker color={boardColor} onChange={handleColorChange}/>
        </div>
        <div className="flex justify-between w-[90%] space-x-5">
          <button className="bg-transparent border border-black hover:bg-black hover:text-[#FDC90E] text-black
           font-semibold rounded-lg py-1 px-4 w-[220px] mt-5" onClick={onClose}>
            Cancel
          </button>
          <button className="bg-[#FDC90E] border border-[#FDC90E] hover:bg-black hover:text-[#FDC90E] text-black
           font-semibold rounded-lg py-1 px-4 w-[220px] mt-5" onClick={handleAddBoard}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBoardForm;
