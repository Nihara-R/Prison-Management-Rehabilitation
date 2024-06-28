import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaWindowClose } from "react-icons/fa";
import { useReactToPrint } from 'react-to-print';
import { toast } from 'react-toastify';

const ViewReintegration = ({ isOpen, onClose, refreshList, reintegrationId }) => {
    const [reintegrationDetails, setReintegrationDetails] = useState(null);
    const componentRef = React.useRef();

    useEffect(() => {
        if (isOpen && reintegrationId) {
            getReintegrationDetails(reintegrationId);
        }
    }, [isOpen, reintegrationId]);

    const getReintegrationDetails = async (reintegrationId) => {
        try {
            const response = await axios.get(`http://localhost:3500/api/registration/${reintegrationId}`);
            setReintegrationDetails(response.data);
        } catch (error) {
            console.error('Error fetching reintegration details:', error.message);
        }
    }

    const handleDelete = async () => {
        if (!reintegrationId) return; // Ensure reintegrationId is available
        if (!window.confirm("Are you sure you want to delete?")) return; // Confirm deletion
        try {
            await axios.delete(`http://localhost:3500/api/registration/delete/${reintegrationId}`);
            console.log('Reintegration deleted successfully');
            toast.success('Reintegration Successfully Deleted ', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            onClose(); // Close the reintegration details modal after deletion
            refreshList(); // Refresh the list of reintegrations
        } catch (error) {
            console.error('Error deleting reintegration:', error.message);
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
                {reintegrationDetails ? (
                    <div>
                        <div className='w-[400px]' ref={componentRef}>
                            <h1 className="mb-4 text-xl font-bold text-center">Reintegration Details</h1>

                            <div className='flex flex-col gap-2'>
                                <p><strong>Record Name:</strong> {reintegrationDetails.recordName}</p>
                                <p><strong>Record Type:</strong> {reintegrationDetails.recordType}</p>
                                <p><strong>Start Date:</strong> {new Date(reintegrationDetails.startDate).toLocaleDateString()}</p>
                                <p><strong>End Date:</strong> {new Date(reintegrationDetails.endDate).toLocaleDateString()}</p>
                                <p><strong>Program Location:</strong> {reintegrationDetails.programLocation}</p>
                                <p><strong>Program Coordinator:</strong> {reintegrationDetails.programCoordinator}</p>
                                <p><strong>Preferred Language:</strong> {reintegrationDetails.preferredLanguage}</p>
                                <p><strong>Special Accommodations:</strong> {reintegrationDetails.specialAccommodations}</p>
                                <p><strong>Participation:</strong> {reintegrationDetails.participation}</p>
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

export default ViewReintegration;
