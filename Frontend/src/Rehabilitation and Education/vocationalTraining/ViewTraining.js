import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaWindowClose } from "react-icons/fa";
import { useReactToPrint } from 'react-to-print';
import { toast } from 'react-toastify';

const ViewTraining = ({ isOpen, onClose, refreshList, trainingId }) => {
    const [trainingDetails, setTrainingDetails] = useState(null);
    const componentRef = React.useRef();

    useEffect(() => {
        if (isOpen && trainingId) {
            getTrainingDetails(trainingId);
        }
    }, [isOpen, trainingId]);

    const getTrainingDetails = async (trainingId) => {
        try {
            const response = await axios.get(`http://localhost:3500/api/vocationaltraining/${trainingId}`);
            setTrainingDetails(response.data);
        } catch (error) {
            console.error('Error fetching training details:', error.message);
        }
    }

    const handleDelete = async () => {
        if (!trainingId) return; // Ensure trainingId is available
        if (!window.confirm("Are you sure you want to delete?")) return; // Confirm deletion
        try {
            await axios.delete(`http://localhost:3500/api/vocationaltraining/delete/${trainingId}`);
            console.log('Training deleted successfully');
            toast.success('Training Successfully Deleted ', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            onClose(); // Close the training details modal after deletion
            refreshList(); // Refresh the list of trainings
        } catch (error) {
            console.error('Error deleting training:', error);
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
                {trainingDetails ? (
                    <div>
                        <div className='w-[400px]' ref={componentRef}>
                            <h1 className="mb-4 text-xl font-bold text-center">Training Details</h1>

                            <div className='flex flex-col gap-2'>
                                <p><strong>Training Name:</strong> {trainingDetails.trainingName}</p>
                                <p><strong>Vocational Field:</strong> {trainingDetails.vocationalField}</p>
                                <p><strong>Date:</strong> {new Date(trainingDetails.date).toLocaleDateString()}</p>
                                <p><strong>Time:</strong> {trainingDetails.time}</p>
                                <p><strong>Location:</strong> {trainingDetails.location}</p>
                                <p><strong>Duration (Hours):</strong> {trainingDetails.durationHours}</p>
                                <p><strong>Lead Instructor:</strong> {trainingDetails.leadInstructor}</p>
                                <p><strong>Max Participants:</strong> {trainingDetails.maxParticipants}</p>
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

export default ViewTraining;
