import React, { useState, useEffect } from 'react';
import { HiPlus } from "react-icons/hi";
import Image from 'next/image';
import CategoryFormModal from '../forms/CategoryForm';
import DepartmentFormModal from '../forms/DepartmentForm';
import ClientForm from './CreateUserForm';
// import image from '../../../../public/image.svg';
import { IoIosArrowDown } from "react-icons/io";
import { FaWindowClose } from "react-icons/fa";
import FileAttachment from '@/components/common/FileAttachement';
import { getCurrencies } from '../../../services/finance/GetCurrency';
import { editProject } from '../../../services/projects/EditProject';
import SelectCategoryForm from './SelectCategoryForm';
import SelectDepartmentForm from './SelectDepartmentForm';
import SelectClientModal from '../../modals/SelectClientModal';
import SelectMembersModal from '../../modals/SelectMembers';
// import defaultProfile from "../../../../../../public/Frame 8520.png";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getProjectDetails } from "@/services/projects/GetSingleProject"; 


interface Option {
  label: string;
  color: string;
}
interface CurrencyOption {
  id: number;
  value: string;
  label: string;
}

interface Client {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  image: string;
}

interface EditProjectFormProps {
  onClose: () => void;
  projectId?: number;
}

const EditProjectForm: React.FC<EditProjectFormProps> = ({ onClose, projectId }) => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState<string>('');
  const [isSelectCategoryModalOpen, setIsSelectCategoryModalOpen] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [showDepartmentForm, setShowDepartmentForm] = useState(false);
  const [isSelectDepartmentModalOpen, setIsSelectDepartmentModalOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<number | null>(null);
  const [startDate, setStartDate] = useState<string>('');
  const [dueDate, setDueDate] = useState<string>('');
  const [isSelectClientModalOpen, setIsSelectClientModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<string>('');
  const [showAddClientForm, setShowAddClientForm] = useState(false);
  const [budget, setBudget] = useState<number>(0);
  const [description, setDescription] = useState<string>('');
  const [selectedCurrency, setSelectedCurrency] = useState<string>('');
  const [currencies, setCurrencies] = useState<CurrencyOption[]>([]);
  const [selectedCurrencyId, setSelectedCurrencyId] = useState<number | null>(null);
  const [selectedClients, setSelectedClients] = useState<Client[]>([]); 
  const [clientsIds, setClientsIds] = useState<number[]>([]);
  const [isSelectMemberModalOpen, setIsSelectMemberModalOpen] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<Client[]>([]); // Assuming members have the same structure as clients
  const [membersIds, setMembersIds] = useState<number[]>([]);
  const [isPersonal, setIsPersonal] = useState<boolean>(false);
  const [project, setProject] = useState<any>(null); // State for project details
  const [loading, setLoading] = useState(false); // State for loading status
  const [error, setError] = useState<string | null>(null); // State for error message
  const [id , setId] = useState<number>(0);


  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const currenciesData = await getCurrencies();
        const formattedCurrencies = currenciesData.map((currency: any) => ({
          id: currency.id,
          value: currency.code,
          label: currency.name,
        }));
        setCurrencies(formattedCurrencies);
      } catch (error) {
        console.error("Failed to fetch currencies", error);
      }
    };
  
    fetchCurrencies();
  }, []);

  useEffect(() => {
    if (projectId) {
        setLoading(true);
        getProjectDetails(projectId)
            .then((data) => {
                setProject(data);

                // Populate form fields with existing data
                setName(data.name || '');
                setStatus(data.status || '');
                setSelectedCategory(data.categoryName || '');
                setSelectedCategoryId(data.categoryId || null);
                setSelectedDepartment(data.departmentName || '');
                setSelectedDepartmentId(data.departmentId || null);
                setStartDate(data.startDate || '');
                setDueDate(data.dueDate || '');
                setBudget(data.budget || 0);
                setDescription(data.description || '');
                setSelectedCurrencyId(data.currency);
                setSelectedClients(data.clients || []);
                setSelectedMembers(data.members || []);
                setIsPersonal(data.isPersonal);
                setId(projectId);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }
}, [projectId]);

  const handleCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    const selectedCurrency = currencies.find(currency => currency.value === selectedValue);
    setSelectedCurrency(selectedValue);
    setSelectedCurrencyId(selectedCurrency ? selectedCurrency.id : null);
  };
  
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStatus = event.target.value;
    setStatus(selectedStatus);
  };
  
  const handleCategorySelect = (categoryId: number, categoryName: string) => {
    setSelectedCategory(categoryName);
    setSelectedCategoryId(categoryId);
    setIsSelectCategoryModalOpen(false);
  };

  const handleCategoryModalToggle = () => {
    setIsSelectCategoryModalOpen(!isSelectCategoryModalOpen);
  };

  const handleDepartmentSelect = (departmentId: number, departmentName: string) => {
    setSelectedDepartment(departmentName);
    setSelectedDepartmentId(departmentId); 
    setIsSelectDepartmentModalOpen(false);
  };

  const handleDepartmentModalToggle = () => {
    setIsSelectDepartmentModalOpen(!isSelectDepartmentModalOpen);
  };

  const handleClientModalToggle = () => {
    setIsSelectClientModalOpen(!isSelectClientModalOpen);
  };

  const handleClientSelection = (clients: Client[]) => {
    // Update state with selected clients
    setSelectedClients(clients);
    
    // Extract only the ids from the selected clients and convert them to numbers
    const clientIds = clients.map(client => Number(client.id));
    setClientsIds(clientIds);
    
  };

  const handleMemberModalToggle = () => {
    setIsSelectMemberModalOpen(!isSelectMemberModalOpen);
  };

  const handleMemberSelection = (members: Client[]) => {
    setSelectedMembers(members);
    const memberIds = members.map(member => Number(member.id));
    setMembersIds(memberIds);
   
  };

  const handleIsPersonalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsPersonal(event.target.checked);
  };
  
  const handleSave = async () => {
    
    if (selectedCategoryId === null) {
      toast.error('Please select a category.');
      return;
    }

    if (selectedDepartmentId === null) {
      toast.error('Please select a department.');
      return;
    }
  
    if (selectedCurrencyId === null) {
      toast.error('Please select a currency.');
      return;
    }

  try {
    const payload = {
      id,
      name,
      budget,
      description,
      categoryId: selectedCategoryId,
      currencyId: selectedCurrencyId,
      departmentId: selectedDepartmentId,
      startDate,
      dueDate,
      status: status.toLowerCase() || 'not started',
      clients: JSON.stringify(clientsIds), 
      members: JSON.stringify(membersIds),
      isPersonal: JSON.stringify(isPersonal),
    };
    
    console.log(payload);

    // Call your API or service to save the project data
    await editProject(payload);
    toast.success('Project was edited successfully!');
    onClose(); // Close the form/modal
  } catch (error) {
    console.error('Failed to edit project', error);
    toast.error('Failed to edit project.');
  }
};


  return (
    <section>
      <div className="fixed inset-0 flex items-end justify-end">
        <div className="w-[750px] h-screen bg-white shadow-md overflow-y-auto relative custom-scrollbar">
          <div className="flex justify-between items-center h-[70px] px-2 md:px-[30px]">
            <button className="text-2xl" onClick={onClose}>
              <FaWindowClose className="text-3xl cursor-pointer" />
            </button>
            <h1 className="text-[20px] font-bold">Edit Project</h1>
            <button
              className="bg-[#FDC90E] px-10 py-2 rounded-md flex justify-center items-center font-semibold text-[15px] h-[35px] hover:bg-black hover:text-[#FDC90E]"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
          <div className="bg-[#F4F4F4] px-2 md:px-[30px] py-[15px] w-full h-full">
            <form className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-black font-bold mb-1">
                  Project Name 
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  placeholder="Project Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-black font-bold mb-1">
                  Status
                </label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={status}
                  onChange={handleStatusChange}
                >
                  <option value="" disabled>Select Status</option>
                  <option value="completed">Completed</option>
                  <option value="in progress">In Progress</option>
                  <option value="not started">Not Started</option>
                  <option value="on hold">On Hold</option>
                  <option value="canceled">Canceled</option>
                </select>
              </div>

              <div>
                <label className="block text-black font-bold mb-1">
                  Category
                </label>
                <div className="flex">
                  <div
                    className="w-full flex flex-row justify-between px-2 bg-white py-2 border rounded-md cursor-pointer"
                    onClick={handleCategoryModalToggle}
                  >
                    {selectedCategory || 'Select Category'}
                    <IoIosArrowDown size={20} className="text-black mt-1" />
                  </div>
                  <button
                    type="button"
                    className="flex justify-center items-center ml-2 p-1 mt-2 w-[30px] h-[30px] bg-black rounded-md text-white"
                    onClick={() => setShowCategoryForm(true)}
                  >
                    <HiPlus size={30} className="font-bold" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-black font-bold mb-1">Clients</label>
                <div className="flex cursor-pointer">
                  <div className="w-full flex flex-row justify-between px-2 bg-white py-2 border rounded-md" onClick={handleClientModalToggle}>
                    {selectedClients.length > 0 ? selectedClients.map(client => client.firstName).join(', ') : 'Select Client'}
                    <IoIosArrowDown size={20} className="text-black mt-1" />
                  </div>
                  <button
                    type="button"
                    className="flex justify-center items-center p-1 ml-2 mt-2 w-[30px] h-[30px] bg-black rounded-md text-white"
                    onClick={() => setShowAddClientForm(true)}
                  >
                    <HiPlus size={30} className="font-bold" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-black font-bold mb-1">Departments</label>
                <div className="flex cursor-pointer">
                  <div className="w-full flex flex-row justify-between px-2 bg-white py-2 border rounded-md" onClick={handleDepartmentModalToggle}>
                    {selectedDepartment || 'Select Department'}
                    <IoIosArrowDown size={20} className="text-black mt-1" />
                  </div>
                  <button
                    type="button"
                    className="flex justify-center items-center ml-2 p-1 mt-2 w-[30px] h-[30px] bg-black rounded-md text-white"
                    onClick={() => setShowDepartmentForm(true)}
                  >
                    <HiPlus size={30} className="font-bold" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-black font-bold mb-1">Members</label>
                <div className="flex cursor-pointer">
                  <div className="w-full flex flex-row justify-between px-2 bg-white py-2 border rounded-md" onClick={handleMemberModalToggle}>
                    {selectedMembers.length > 0 ? selectedMembers.map(member => member.firstName).join(', ') : 'Select Members'}
                    <IoIosArrowDown size={20} className="text-black mt-1" />
                  </div>
                  <button
                    type="button"
                    className="flex justify-center items-center p-1 ml-2 mt-2 w-[30px] h-[30px] bg-black rounded-md text-white"
                    onClick={() => setShowAddClientForm(true)}
                  >
                    <HiPlus size={30} className="font-bold" />
                  </button>
                </div>
              </div>

              <div className="col-span-2 flex my-1">
      <label className="block text-black font-bold">Is Personal?</label>
      <label className="switch ml-3 cursor-pointer mt-1">
        <input
          type="checkbox"
          checked={isPersonal}
          onChange={handleIsPersonalChange}
        />
        <span className="slider"></span>
      </label>
    </div>

              <div>
                <label className="block text-black font-bold mb-1">Start Date</label>
                <div className="flex items-center">
                  <input type="date" 
                    className="w-full px-2 py-2 border rounded-md" 
                    value={startDate} 
                    onChange={(e) => setStartDate(e.target.value)} 
                  />
                </div>
              </div>

              <div>
                <label className="block text-black font-bold mb-1">Due Date</label>
                <div className="flex items-center">
                  <input type="date" 
                    className="w-full px-2 py-2 border rounded-md" 
                    value={dueDate} 
                    onChange={(e) => setDueDate(e.target.value)} 
                  />
                </div>
              </div>

              <div>
                <label className="block text-black font-bold mb-1">Currency</label>
                <select
                  value={selectedCurrency}
                  onChange={handleCurrencyChange}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="" disabled>Select Currency</option>
                  {currencies.map((currency) => (
                    <option key={currency.id} value={currency.value}>
                      {currency.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-black font-bold mb-1">Project Budget</label>
                <input type="text" 
                className="w-full px-2 py-2 border rounded-md bg-white" 
                placeholder="Project Budget" 
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}/>
              </div>

              <div className="col-span-2">
                <label className="block text-black font-bold mb-1">Project Description</label>
                <textarea placeholder='Project Description' 
                className="w-full px-4 py-2 border rounded-md bg-white"
                value={description}
                onChange={(e) => setDescription(e.target.value)}>
                </textarea>
              </div>
              
              <div>
                <label className="block text-black font-bold mb-1">Project Logo</label>
                <div className="flex items-center">
                  <input type="file" className="hidden" id="project-logo-upload" />
                  <label htmlFor="project-logo-upload" className="w-10 h-10 border rounded-full bg-[#19B600] 
                  bg-opacity-20 flex justify-center items-center cursor-pointer">
                    <Image
                      src={""}
                      alt="image"
                      width={20}
                      height={20}
                    />
                  </label>
                </div>
              </div>
            </form>

            {isSelectCategoryModalOpen && (
              <div className="fixed inset-0 flex items-center justify-end bg-black bg-opacity-50 z-50">
                <SelectCategoryForm
                  toggleModal={() => setIsSelectCategoryModalOpen(false)}
                  onSelect={handleCategorySelect}
                />
              </div>
            )}

            {showCategoryForm && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-8 rounded-lg shadow-lg relative">
                  <CategoryFormModal
                    onClose={() => setShowCategoryForm(false)}
                    onCategoryAdded={() => {
                      handleCategoryModalToggle();
                    }}
                  />
                </div>
              </div>
            )}

            {isSelectDepartmentModalOpen && (
              <div className="fixed inset-0 flex items-end justify-end bg-black bg-opacity-50 z-40">
                <SelectDepartmentForm
                  toggleModal={() => setIsSelectDepartmentModalOpen(false)}
                  onSelect={handleDepartmentSelect}
                />
              </div>
            )}

            {showDepartmentForm && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-8 rounded-lg shadow-lg relative">
                  <DepartmentFormModal onClose={() => setShowDepartmentForm(false)} />
                </div>
              </div>
            )}

            {showAddClientForm && (
              <div className="fixed inset-0 flex items-center justify-end bg-black bg-opacity-50 z-80">
                <div className="bg-white shadow-lg relative w-[650px] rounded-lg">
                  <ClientForm onClose={() => setShowAddClientForm(false)} />
                </div>
              </div>
            )}

{isSelectClientModalOpen && (
              <div className="fixed inset-0 flex items-center justify-end bg-black bg-opacity-50 z-50">
                <SelectClientModal
                  toggleModal={handleClientModalToggle}
                  onSelectUsers={handleClientSelection}
                  selectedClients={new Set(selectedClients.map(client => client.id))} // Convert array to set for initial selection
                />
              </div>
            )}

{isSelectMemberModalOpen && (
              <div className="fixed inset-0 flex items-center justify-end bg-black bg-opacity-50 z-50">
                <SelectMembersModal
                  toggleModal={handleMemberModalToggle}
                  onSelectUsers={handleMemberSelection}
                  selectedMembers={new Set(selectedMembers.map(member => member.id))}
                />
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
};

export default EditProjectForm;
