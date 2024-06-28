import React, { useState, useEffect } from 'react';
import RehabilitationSidebar from '../RehabilitationSidebar';
import axios from 'axios';
import { IoEyeOutline } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import AddTraining from './AddTraining';
import UpdateTraining from './UpdateTraining';
import ViewTraining from './ViewTraining';
import ConfirmationModal from '../../components/ConfirmationModal';

const AllTrainings = () => {
    const [trainings, setTrainings] = useState([]); // State to store training records
    const [searchQuery, setSearchQuery] = useState(''); // State for search query
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [showDetailDialog, setShowDetailDialog] = useState(false);
    const [showUpdateDialog, setShowUpdateDialog] = useState(false);
    const [selectedTrainingId, setSelectedTrainingId] = useState(null);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [deletingTrainingId, setDeletingTrainingId] = useState(null);

    const toggleAddDialog = () => {
        setShowAddDialog(!showAddDialog);
    };

    const toggleDetailDialog = () => {
        setShowDetailDialog(!showDetailDialog);
    };

    const toggleUpdateDialog = () => {
        setShowUpdateDialog(!showUpdateDialog);
    };

    const toggleConfirmationModal = () => {
        setShowConfirmationModal(!showConfirmationModal);
    };

    // Function to fetch all training records from the API
    const fetchTrainings = async () => {
        try {
            const response = await axios.get('http://localhost:3500/api/vocationaltraining');
            setTrainings(response.data);
        } catch (error) {
            console.error('Error fetching training records:', error);
        }
    };

    useEffect(() => {
        fetchTrainings();
    }, []);

    // Function to filter training records based on search query
    const filteredTrainings = trainings.filter(training =>
        training.trainingName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDelete = (id) => {
        setDeletingTrainingId(id);
        toggleConfirmationModal();
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:3500/api/vocationaltraining/delete/${deletingTrainingId}`);
            fetchTrainings();
            console.log('Training deleted successfully');
        } catch (error) {
            console.error('Error deleting training:', error);
        }
        toggleConfirmationModal();
    };

    const handleUpdate = (id) => {
        setSelectedTrainingId(id);
        toggleUpdateDialog();
    };

    const handleView = (id) => {
        setSelectedTrainingId(id);
        toggleDetailDialog();
    };

    const handleCreate = () => {
        toggleAddDialog();
    };

    return (
        <div className='w-[100%] h-auto'>
            <div className='flex gap-2'>
                <RehabilitationSidebar />
                <div>
                    <div className='w-full'>
                        <h1 className='py-6 text-2xl font-bold text-center'>All Vocational Trainings</h1>
                        <div className='flex justify-end w-[100%] p-4 '>
                            <div className='flex flex-col gap-2'>
                                <input
                                    className='px-6 py-2 text-black bg-gray-200 border-2 rounded-lg outline-none border-primary'
                                    type="text"
                                    placeholder='Search Trainings'
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <button onClick={toggleAddDialog} className='px-4 py-3 bg-primary text-white hover:bg-[#0369a1] duration-150 font-semibold w-[50%]'>Add</button>
                            </div>
                        </div>
                        <div className="overflow-x-auto w-[100%] mx-auto">
                            <table className="able-auto mw-full">
                                <thead>
                                    <tr className="leading-normal text-gray-800 uppercase bg-gray-200 text-md">
                                        <th className="px-6 py-3 text-left">Training Name</th>
                                        <th className="px-6 py-3 text-left">Field</th>
                                        <th className="px-6 py-3 text-left">Date</th>
                                        <th className="px-6 py-3 text-left">Time</th>
                                        <th className="px-6 py-3 text-left">Location</th>
                                        <th className="px-6 py-3 text-left">Duration (Hours)</th>
                                        <th className="px-6 py-3 text-left">Lead Instructor</th>
                                        <th className="px-6 py-3 text-left">Max Participants</th>
                                        <th className="px-6 py-3 text-left">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm font-normal text-gray-900">
                                    {filteredTrainings.map(training => (
                                        <tr key={training._id} className="border-b border-gray-200 hover:bg-gray-100">
                                            <td className="px-6 py-3 text-left whitespace-nowrap">{training.trainingName}</td>
                                            <td className="px-6 py-3 text-left whitespace-nowrap">{training.vocationalField}</td>
                                            <td className="px-6 py-3 text-left whitespace-nowrap">{new Date(training.date).toLocaleDateString()}</td>
                                            <td className="px-6 py-3 text-left whitespace-nowrap">{training.time}</td>
                                            <td className="px-6 py-3 text-left whitespace-nowrap">{training.location}</td>
                                            <td className="px-6 py-3 text-left whitespace-nowrap">{training.durationHours}</td>
                                            <td className="px-6 py-3 text-left whitespace-nowrap">{training.leadInstructor}</td>
                                            <td className="px-6 py-3 text-left whitespace-nowrap">{training.maxParticipants}</td>
                                            <td className='flex items-center gap-2 px-6 py-3 text-left whitespace-nowrap'>
                                                <button className="" onClick={() => handleView(training._id)}><IoEyeOutline color='green' size={20} /></button>
                                                <button className="" onClick={() => handleUpdate(training._id)}><FaEdit color='blue' size={20} /></button>
                                                <button className="" onClick={() => handleDelete(training._id)}><MdDeleteOutline color='red' size={20} /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <AddTraining isOpen={showAddDialog} onClose={toggleAddDialog} refreshList={fetchTrainings} />
            <ViewTraining isOpen={showDetailDialog} onClose={toggleDetailDialog} refreshList={fetchTrainings} trainingId={selectedTrainingId} />
            <UpdateTraining isOpen={showUpdateDialog} onClose={toggleUpdateDialog} refreshList={fetchTrainings} trainingId={selectedTrainingId} />
            <ConfirmationModal
                isOpen={showConfirmationModal}
                onClose={toggleConfirmationModal}
                onConfirm={confirmDelete}
                message="Are you sure you want to delete?"
            />
        </div>
    );
};

export default AllTrainings;
