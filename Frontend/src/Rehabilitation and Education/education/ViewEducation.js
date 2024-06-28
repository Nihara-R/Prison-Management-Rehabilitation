import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaWindowClose } from "react-icons/fa";
import { useReactToPrint } from 'react-to-print';
import { toast } from 'react-toastify';

const ViewEducation = ({ isOpen, onClose, refreshList, educationId }) => {
    const [educationDetails, setEducationDetails] = useState(null);
    const componentRef = React.useRef();

    useEffect(() => {
        if (isOpen && educationId) {
            getEducationDetails(educationId);
        }
    }, [isOpen, educationId]);

    const getEducationDetails = async (educationId) => {
        try {
            const response = await axios.get(`http://localhost:3500/api/education/${educationId}`);
            setEducationDetails(response.data);
        } catch (error) {
            console.error('Error fetching education details:', error.message);
        }
    }

    const handleDelete = async () => {
        if (!educationId) return; // Ensure educationId is available
        if (!window.confirm("Are you sure you want to delete?")) return; // Confirm deletion
        try {
            await axios.delete(`http://localhost:3500/api/education/delete/${educationId}`);
            console.log('Education deleted successfully');
            toast.success('Education Successfully Deleted ', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            onClose(); // Close the education details modal after deletion
            refreshList(); // Refresh the list of educations
        } catch (error) {
            console.error('Error deleting education:', error);
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
                {educationDetails ? (
                    <div>
                        <div className='w-[400px]' ref={componentRef}>
                            <h1 className="mb-4 text-xl font-bold text-center">Education Details</h1>

                            <div className='flex flex-col gap-2'>
                                <p><strong>Program Name:</strong> {educationDetails.programName}</p>
                                <p><strong>Category:</strong> {educationDetails.category}</p>
                                <p><strong>Date:</strong> {new Date(educationDetails.date).toLocaleDateString()}</p>
                                <p><strong>Time:</strong> {educationDetails.time}</p>
                                <p><strong>Location:</strong> {educationDetails.location}</p>
                                <p><strong>Age Group:</strong> {educationDetails.ageGroup}</p>
                                <p><strong>Instructors:</strong> {educationDetails.instructors}</p>
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

export default ViewEducation;
