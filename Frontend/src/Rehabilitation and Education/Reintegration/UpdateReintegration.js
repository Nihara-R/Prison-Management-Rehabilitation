import React, { useState, useEffect } from 'react';
import { FaWindowClose } from "react-icons/fa";
import axios from 'axios';
import { toast } from 'react-toastify';

const UpdateReintegration = ({ isOpen, onClose, refreshList, reintegrationId }) => {
    const [reintegrationData, setReintegrationData] = useState({
        recordName: '',
        recordType: '',
        startDate: '',
        endDate: '',
        programLocation: '',
        programCoordinator: '',
        preferredLanguage: '',
        specialAccommodations: '',
        participation: ''
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (isOpen && reintegrationId) {
            fetchReintegrationDetails(reintegrationId);
        }
    }, [isOpen, reintegrationId]);

    const fetchReintegrationDetails = async (id) => {
        try {
            const response = await axios.get(`http://localhost:3500/api/registration//${id}`);
            const reintegration = response.data;
            const startDate = new Date(reintegration.startDate).toISOString().split('T')[0];
            const endDate = new Date(reintegration.endDate).toISOString().split('T')[0];
            setReintegrationData({
                recordName: reintegration.recordName,
                recordType: reintegration.recordType,
                startDate: startDate,
                endDate: endDate,
                programLocation: reintegration.programLocation,
                programCoordinator: reintegration.programCoordinator,
                preferredLanguage: reintegration.preferredLanguage,
                specialAccommodations: reintegration.specialAccommodations,
                participation: reintegration.participation
            });
        } catch (error) {
            console.error('Error fetching reintegration details:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReintegrationData({ ...reintegrationData, [name]: value });
    };

    const validateForm = () => {
        const errors = {};

        if (!reintegrationData.recordName.trim()) {
            errors.recordName = 'Record Name is required';
        }

        if (!reintegrationData.recordType.trim()) {
            errors.recordType = 'Record Type is required';
        }

        if (!reintegrationData.startDate) {
            errors.startDate = 'Start Date is required';
        }

        if (!reintegrationData.endDate) {
            errors.endDate = 'End Date is required';
        }

        if (!reintegrationData.programLocation.trim()) {
            errors.programLocation = 'Program Location is required';
        }

        if (!reintegrationData.programCoordinator.trim()) {
            errors.programCoordinator = 'Program Coordinator is required';
        }

        if (!reintegrationData.preferredLanguage.trim()) {
            errors.preferredLanguage = 'Preferred Language is required';
        }

        if (!reintegrationData.specialAccommodations.trim()) {
            errors.specialAccommodations = 'Special Accommodations is required';
        }

        if (!reintegrationData.participation.trim()) {
            errors.participation = 'Participation is required';
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            await axios.put(`http://localhost:3500/api/registration/update/${reintegrationId}`, reintegrationData);
            toast.success('Reintegration Successfully Updated ', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            onClose(); // Close the dialog after successful update
            refreshList(); // Refresh the reintegration list
        } catch (error) {
            console.error('Error updating reintegration:', error);
        }
    };

    return (
        <div className={`fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50 ${isOpen ? 'block' : 'hidden'}`}>
            <div className="bg-white p-6 rounded-lg max-w-[50%] relative" >
                <FaWindowClose size={25} color='red' onClick={onClose} className="absolute duration-150 cursor-pointer right-1 top-1 hover:scale-110" />
                <div>
                    <h2 className='p-4 text-xl font-semibold text-center'>Update Reintegration Details</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="flex items-center gap-6 mb-2">
                            <label className="text-gray-700">Record Name:</label>
                            <div>
                                <input type="text" name="recordName" value={reintegrationData.recordName} onChange={handleChange} className={`border ${errors.recordName ? 'border-red-500' : 'border-gray-300'} rounded-md py-1 px-3 block`} />
                                {errors.recordName && <span className="text-red-500">{errors.recordName}</span>}
                            </div>
                        </div>

                        <div className="flex items-center gap-6 mb-2">
                            <label className="text-gray-700">Record Type:</label>
                            <div>
                                <input type="text" name="recordType" value={reintegrationData.recordType} onChange={handleChange} className={`border ${errors.recordType ? 'border-red-500' : 'border-gray-300'} rounded-md py-1 px-3 block`} />
                                {errors.recordType && <span className="text-red-500">{errors.recordType}</span>}
                            </div>
                        </div>

                        <div className="flex items-center gap-6 mb-2">
                            <label className="text-gray-700">Start Date:</label>
                            <div>
                                <input type="date" name="startDate" value={reintegrationData.startDate} onChange={handleChange} className={`border ${errors.startDate ? 'border-red-500' : 'border-gray-300'} rounded-md py-1 px-3 block`} />
                                {errors.startDate && <span className="text-red-500">{errors.startDate}</span>}
                            </div>
                        </div>

                        <div className="flex items-center gap-6 mb-2">
                            <label className="text-gray-700">End Date:</label>
                            <div>
                                <input type="date" name="endDate" value={reintegrationData.endDate} onChange={handleChange} className={`border ${errors.endDate ? 'border-red-500' : 'border-gray-300'} rounded-md py-1 px-3 block`} />
                                {errors.endDate && <span className="text-red-500">{errors.endDate}</span>}
                            </div>
                        </div>

                        <div className="flex items-center gap-6 mb-2">
                            <label className="text-gray-700">Program Location:</label>
                            <div>
                                <input type="text" name="programLocation" value={reintegrationData.programLocation} onChange={handleChange} className={`border ${errors.programLocation ? 'border-red-500' : 'border-gray-300'} rounded-md py-1 px-3 block`} />
                                {errors.programLocation && <span className="text-red-500">{errors.programLocation}</span>}
                            </div>
                        </div>

                        <div className="flex items-center gap-6 mb-2">
                            <label className="text-gray-700">Program Coordinator:</label>
                            <div>
                                <input type="text" name="programCoordinator" value={reintegrationData.programCoordinator} onChange={handleChange} className={`border ${errors.programCoordinator ? 'border-red-500' : 'border-gray-300'} rounded-md py-1 px-3 block`} />
                                {errors.programCoordinator && <span className="text-red-500">{errors.programCoordinator}</span>}
                            </div>
                        </div>

                        <div className="flex items-center gap-6 mb-2">
                            <label className="text-gray-700">Preferred Language:</label>
                            <div>
                                <input type="text" name="preferredLanguage" value={reintegrationData.preferredLanguage} onChange={handleChange} className={`border ${errors.preferredLanguage ? 'border-red-500' : 'border-gray-300'} rounded-md py-1 px-3 block`} />
                                {errors.preferredLanguage && <span className="text-red-500">{errors.preferredLanguage}</span>}
                            </div>
                        </div>

                        <div className="flex items-center gap-6 mb-2">
                            <label className="text-gray-700">Special Accommodations:</label>
                            <div>
                                <input type="text" name="specialAccommodations" value={reintegrationData.specialAccommodations} onChange={handleChange} className={`border ${errors.specialAccommodations ? 'border-red-500' : 'border-gray-300'} rounded-md py-1 px-3 block`} />
                                {errors.specialAccommodations && <span className="text-red-500">{errors.specialAccommodations}</span>}
                            </div>
                        </div>

                        <div className="flex items-center gap-6 mb-2">
                            <label className="text-gray-700">Participation:</label>
                            <div>
                                <input type="text" name="participation" value={reintegrationData.participation} onChange={handleChange} className={`border ${errors.participation ? 'border-red-500' : 'border-gray-300'} rounded-md py-1 px-3 block`} />
                                {errors.participation && <span className="text-red-500">{errors.participation}</span>}
                            </div>
                        </div>

                        <div className="flex items-center justify-end mt-4">
                            <button type="submit" className="px-4 py-2 bg-primary text-white rounded-md hover:bg-[#0369a1] duration-150 font-semibold">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateReintegration;
