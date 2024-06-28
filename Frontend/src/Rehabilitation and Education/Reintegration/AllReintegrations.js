import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { IoEyeOutline } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import AddReintegration from './AddReintegration';
import UpdateReintegration from './UpdateReintegration';
import ViewReintegration from './ViewReintegration';
import RehabilitationSidebar from '../RehabilitationSidebar';
import ConfirmationModal from '../../components/ConfirmationModal';


const AllReintergrations = () => {
    const [reintegrations, setReintegrations] = useState([]); // State to store reintegration records
    const [searchQuery, setSearchQuery] = useState(''); // State for search query
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [showDetailDialog, setShowDetailDialog] = useState(false);
    const [showUpdateDialog, setShowUpdateDialog] = useState(false);
    const [selectedReintegrationId, setSelectedReintegrationId] = useState(null);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [deletingReintegrationId, setDeletingReintegrationId] = useState(null);

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

    // Function to fetch all reintegration records from the API
    const fetchReintegrations = async () => {
        try {
            const response = await axios.get('http://localhost:3500/api/registration/');
            setReintegrations(response.data);
        } catch (error) {
            console.error('Error fetching reintegration records:', error);
        }
    };

    useEffect(() => {
        fetchReintegrations();
    }, []);

    // Function to filter reintegration records based on search query
    const filteredReintegrations = reintegrations.filter(reintegration =>
        reintegration.recordName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDelete = (id) => {
        setDeletingReintegrationId(id);
        toggleConfirmationModal();
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:3500/api/registration/delete/${deletingReintegrationId}`);
            fetchReintegrations();
            console.log('Reintegration deleted successfully');
        } catch (error) {
            console.error('Error deleting reintegration:', error);
        }
        toggleConfirmationModal();
    };

    const handleUpdate = (id) => {
        setSelectedReintegrationId(id);
        toggleUpdateDialog();
    };

    const handleView = (id) => {
        setSelectedReintegrationId(id);
        toggleDetailDialog();
    };

    const handleCreate = () => {
        toggleAddDialog();
    };

    return (
        <div className='w-full h-auto'>
            <div className='flex gap-2'>
                <RehabilitationSidebar/>
                <div>
                    <div className='w-full'>
                        <h1 className='py-6 text-2xl font-bold text-center'>All Reintegrations</h1>
                        <div className='flex justify-end w-[100%] p-4 '>
                            <div className='flex flex-col gap-2'>
                                <input
                                    className='px-6 py-2 text-black bg-gray-200 border-2 rounded-lg outline-none border-primary'
                                    type="text"
                                    placeholder='Search Reintegrations'
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
                                        <th className="px-6 py-3 text-left">Record Name</th>
                                        <th className="px-6 py-3 text-left">Record Type</th>
                                        <th className="px-6 py-3 text-left">Start Date</th>
                                        <th className="px-6 py-3 text-left">End Date</th>
                                        <th className="px-6 py-3 text-left">Program Location</th>
                                        <th className="px-6 py-3 text-left">Program Coordinator</th>
                                        <th className="px-6 py-3 text-left">Preferred Language</th>
                                        <th className="px-6 py-3 text-left">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm font-normal text-gray-900">
                                    {filteredReintegrations.map(reintegration => (
                                        <tr key={reintegration._id} className="border-b border-gray-200 hover:bg-gray-100">
                                            <td className="px-6 py-3 text-left whitespace-nowrap">{reintegration.recordName}</td>
                                            <td className="px-6 py-3 text-left whitespace-nowrap">{reintegration.recordType}</td>
                                            <td className="px-6 py-3 text-left whitespace-nowrap">{new Date(reintegration.startDate).toLocaleDateString()}</td>
                                            <td className="px-6 py-3 text-left whitespace-nowrap">{new Date(reintegration.endDate).toLocaleDateString()}</td>
                                            <td className="px-6 py-3 text-left whitespace-nowrap">{reintegration.programLocation}</td>
                                            <td className="px-6 py-3 text-left whitespace-nowrap">{reintegration.programCoordinator}</td>
                                            <td className="px-6 py-3 text-left whitespace-nowrap">{reintegration.preferredLanguage}</td>
                                            <td className='flex items-center gap-2 px-6 py-3 text-left whitespace-nowrap'>
                                                <button className="" onClick={() => handleView(reintegration._id)}><IoEyeOutline color='green' size={20} /></button>
                                                <button className="" onClick={() => handleUpdate(reintegration._id)}><FaEdit color='blue' size={20} /></button>
                                                <button className="" onClick={() => handleDelete(reintegration._id)}><MdDeleteOutline color='red' size={20} /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <AddReintegration isOpen={showAddDialog} onClose={toggleAddDialog} refreshList={fetchReintegrations} />
            <ViewReintegration isOpen={showDetailDialog} onClose={toggleDetailDialog} refreshList={fetchReintegrations} reintegrationId={selectedReintegrationId} />
            <UpdateReintegration isOpen={showUpdateDialog} onClose={toggleUpdateDialog} refreshList={fetchReintegrations} reintegrationId={selectedReintegrationId} />
            <ConfirmationModal
                isOpen={showConfirmationModal}
                onClose={toggleConfirmationModal}
                onConfirm={confirmDelete}
                message="Are you sure you want to delete?"
            />
        </div>
    );
};

export default AllReintergrations;
