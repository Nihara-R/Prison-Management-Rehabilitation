import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaWindowClose } from "react-icons/fa";
import { useReactToPrint } from 'react-to-print';
import { toast } from 'react-toastify';

const ViewEvent = ({ isOpen, onClose, refreshList, eventId }) => {
    const [eventDetails, setEventDetails] = useState(null);
    const componentRef = React.useRef();

    useEffect(() => {
        if (isOpen && eventId) {
            getEventDetails(eventId);
        }
    }, [isOpen, eventId]);

    const getEventDetails = async (eventId) => {
        try {
            const response = await axios.get(`http://localhost:3500/api/event/${eventId}`);
            setEventDetails(response.data);
        } catch (error) {
            console.error('Error fetching event details:', error.message);
        }
    }

    const handleDelete = async () => {
        if (!eventId) return; // Ensure eventId is available
        if (!window.confirm("Are you sure you want to delete?")) return; // Confirm deletion
        try {
            await axios.delete(`http://localhost:3500/api/event/delete/${eventId}`);
            console.log('Event deleted successfully');
            toast.success('Event Successfully Deleted ', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            onClose(); // Close the event details modal after deletion
            refreshList(); // Refresh the list of events
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    // Function to handle printing
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    
    return (
        <div className={`fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50 ${isOpen ? 'block' : 'hidden'}`}>
            <div className="bg-white p-6 rounded-lg max-w-[50%] relative" >
                <FaWindowClose size={25} color='red' onClick={onClose} className="absolute duration-150 cursor-pointer right-1 top-1 hover:scale-110" />
                {eventDetails ? (
                    <div>
                        <div className='w-[400px]' ref={componentRef}>
                            <h1 className="mb-4 text-xl font-bold text-center">Event Details</h1>

                            <div className='flex flex-col gap-2'>
                                <p><strong>Event Name:</strong> {eventDetails.eventName}</p>
                                <p><strong>Category:</strong> {eventDetails.category}</p>
                                <p><strong>Date:</strong> {new Date(eventDetails.date).toLocaleDateString()}</p>
                                <p><strong>Time:</strong> {eventDetails.time}</p>
                                <p><strong>Organizer:</strong> {eventDetails.organizer}</p>
                                <p><strong>Target Audience:</strong> {eventDetails.targetAudience}</p>
                            </div>
                        </div>
                        <div className='flex justify-end gap-4 p-2'>
                            <button onClick={handlePrint} className='bg-[#0e7490] px-4 py-2 text-lg text-white hover:shadow-xl hover:scale-105 duration-100'>Print</button>
                            <button onClick={handleDelete} className='px-4 py-2 text-lg text-white duration-100 bg-red-600 hover:shadow-xl hover:scale-105'>Delete</button>
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default ViewEvent;
