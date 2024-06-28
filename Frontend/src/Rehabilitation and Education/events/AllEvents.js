import React, { useState, useEffect } from 'react';
import RehabilitationSidebar from '../RehabilitationSidebar';
import axios from 'axios';
import { IoEyeOutline } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import AddEvent from './AddEvent';
import UpdateEvents from './UpdateEvents';
import ViewEvent from './ViewEvent';
import ConfirmationModal from '../../components/ConfirmationModal';

const AllEvents = () => {
    const [events, setEvents] = useState([]); // State to store event records
    const [searchQuery, setSearchQuery] = useState(''); // State for search query
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [showDetailDialog, setShowDetailDialog] = useState(false);
    const [showUpdateDialog, setShowUpdateDialog] = useState(false);
    const [selectedEventId, setSelectedEventId] = useState(null);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [deletingEventId, setDeletingEventId] = useState(null);

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

    // Function to fetch all event records from the API
    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:3500/api/event');
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching event records:', error);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    // Function to filter event records based on search query
    const filteredEvents = events.filter(event =>
        event.eventName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDelete = (id) => {
        setDeletingEventId(id);
        toggleConfirmationModal();
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:3500/api/event/delete/${deletingEventId}`);
            fetchEvents();
            console.log('Event deleted successfully');
        } catch (error) {
            console.error('Error deleting event:', error);
        }
        toggleConfirmationModal();
    };

    const handleUpdate = (id) => {
        setSelectedEventId(id);
        toggleUpdateDialog();
    };

    const handleView = (id) => {
        setSelectedEventId(id);
        toggleDetailDialog();
    };

    const handleCreate = (id) => {
        setSelectedEventId(id);
        toggleAddDialog();
    };

    return (
        <div className='w-[100%] h-auto'>
            <div className='flex gap-2'>
                <RehabilitationSidebar />
                <div>
                    <div className='w-full'>
                        <h1 className='py-6 text-2xl font-bold text-center'>All Events</h1>
                        <div className='flex justify-end w-[100%] p-4 '>
                            <div className='flex flex-col gap-2'>
                                <input
                                    className='px-6 py-2 text-black bg-gray-200 border-2 rounded-lg outline-none border-primary'
                                    type="text"
                                    placeholder='Search Events'
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
                                        <th className="px-6 py-3 text-left">Event Name</th>
                                        <th className="px-6 py-3 text-left">Category</th>
                                        <th className="px-6 py-3 text-left">Date</th>
                                        <th className="px-6 py-3 text-left">Time</th>
                                        <th className="px-6 py-3 text-left">Organizer</th>
                                        <th className="px-6 py-3 text-left">Target Audience</th>
                                        <th className="px-6 py-3 text-left">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm font-normal text-gray-900">
                                    {filteredEvents.map(event => (
                                        <tr key={event._id} className="border-b border-gray-200 hover:bg-gray-100">
                                            <td className="px-6 py-3 text-left whitespace-nowrap">{event.eventName}</td>
                                            <td className="px-6 py-3 text-left whitespace-nowrap">{event.category}</td>
                                            <td className="px-6 py-3 text-left whitespace-nowrap">{new Date(event.date).toLocaleDateString()}</td>
                                            <td className="px-6 py-3 text-left whitespace-nowrap">{event.time}</td>
                                            <td className="px-6 py-3 text-left whitespace-nowrap">{event.organizer}</td>
                                            <td className="px-6 py-3 text-left whitespace-nowrap">{event.targetAudience}</td>
                                            <td className='flex items-center gap-2 px-6 py-3 text-left whitespace-nowrap'>
                                                <button className="" onClick={() => handleView(event._id)}><IoEyeOutline color='green' size={20} /></button>
                                                <button className="" onClick={() => handleUpdate(event._id)}><FaEdit color='blue' size={20} /></button>
                                                <button className="" onClick={() => handleDelete(event._id)}><MdDeleteOutline color='red' size={20} /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <AddEvent isOpen={showAddDialog} onClose={toggleAddDialog} refreshList={fetchEvents} />
            <ViewEvent isOpen={showDetailDialog} onClose={toggleDetailDialog} refreshList={fetchEvents} eventId={selectedEventId} />
            <UpdateEvents isOpen={showUpdateDialog} onClose={toggleUpdateDialog} refreshList={fetchEvents} eventId={selectedEventId} />
            <ConfirmationModal
                isOpen={showConfirmationModal}
                onClose={toggleConfirmationModal}
                onConfirm={confirmDelete}
                message="Are you sure you want to delete?"
            />
        </div>
    );
};

export default AllEvents;
