import React, { useState, useEffect } from 'react';
import { FaWindowClose } from "react-icons/fa";
import axios from 'axios';
import { toast } from 'react-toastify';

const UpdateTraining = ({ isOpen, onClose, refreshList, trainingId }) => {
    const [trainingData, setTrainingData] = useState({
        trainingName: '',
        vocationalField: '',
        date: '',
        time: '',
        location: '',
        durationHours: '',
        leadInstructor: '',
        maxParticipants: ''
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (isOpen && trainingId) {
            fetchTrainingDetails(trainingId);
        }
    }, [isOpen, trainingId]);

    const fetchTrainingDetails = async (id) => {
        try {
            const response = await axios.get(`http://localhost:3500/api/vocationaltraining/${id}`);
            const training = response.data;
            console.log(response.data);
            const date = new Date(training.date).toISOString().split('T')[0];
            setTrainingData({
                trainingName: training.trainingName,
                vocationalField: training.vocationalField,
                date: date,
                time: training.time,
                location: training.location,
                durationHours: training.durationHours,
                leadInstructor: training.leadInstructor,
                maxParticipants: training.maxParticipants
            });
        } catch (error) {
            console.error('Error fetching training details:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTrainingData({ ...trainingData, [name]: value });
    };

    const validateForm = () => {
        const errors = {};

        if (!trainingData.trainingName.trim()) {
            errors.trainingName = 'Training Name is required';
        }

        if (!trainingData.vocationalField.trim()) {
            errors.vocationalField = 'Vocational Field is required';
        }

        if (!trainingData.date) {
            errors.date = 'Date is required';
        }

        
        if (!trainingData.time.trim()) {
          errors.time = 'Time is required';
        } 
        if (!trainingData.location.trim()) {
            errors.location = 'Location is required';
        }

        if (!trainingData.durationHours) {
            errors.durationHours = 'Duration (Hours) is required';
        }

        if (!trainingData.leadInstructor.trim()) {
            errors.leadInstructor = 'Lead Instructor is required';
        }

        if (!trainingData.maxParticipants) {
            errors.maxParticipants = 'Max Participants is required';
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            await axios.put(`http://localhost:3500/api/vocationaltraining/update/${trainingId}`, trainingData);
            toast.success('Training Successfully Updated ', {
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
            refreshList(); // Refresh the training list
        } catch (error) {
            console.error('Error updating training:', error);
        }
    };

    return (
        <div className={`fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50 ${isOpen ? 'block' : 'hidden'}`}>
            <div className="bg-white p-6 rounded-lg max-w-[50%] relative" >
                <FaWindowClose size={25} color='red' onClick={onClose} className="absolute duration-150 cursor-pointer right-1 top-1 hover:scale-110" />
                <div>
                    <h2 className='p-4 text-xl font-semibold text-center'>Update Training Details</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="flex items-center gap-6 mb-2">
                            <label className="text-gray-700">Training Name:</label>
                            <div>
                                <input type="text" name="trainingName" value={trainingData.trainingName} onChange={handleChange} className={`border ${errors.trainingName ? 'border-red-500' : 'border-gray-300'} rounded-md py-1 px-3 block`} />
                                {errors.trainingName && <span className="text-red-500">{errors.trainingName}</span>}
                            </div>
                        </div>

                        <div className="flex items-center gap-6 mb-2">
                            <label className="text-gray-700">Vocational Field:</label>
                            <div>
                                <input type="text" name="vocationalField" value={trainingData.vocationalField} onChange={handleChange} className={`border ${errors.vocationalField ? 'border-red-500' : 'border-gray-300'} rounded-md py-1 px-3 block`} />
                                {errors.vocationalField && <span className="text-red-500">{errors.vocationalField}</span>}
                            </div>
                        </div>

                        <div className="flex items-center gap-6 mb-2">
                            <label className="text-gray-700">Date:</label>
                            <div>
                                <input type="date" name="date" value={trainingData.date} onChange={handleChange} className={`border ${errors.date ? 'border-red-500' : 'border-gray-300'} rounded-md py-1 px-3 block`} />
                                {errors.date && <span className="text-red-500">{errors.date}</span>}
                            </div>
                        </div>

                        <div className="flex items-center gap-6 mb-2">
                            <label className="text-gray-700">Time:</label>
                            <div>
                                <input type="time" name="time" value={trainingData.time} onChange={handleChange} className={`border ${errors.time ? 'border-red-500' : 'border-gray-300'} rounded-md py-1 px-3 block`} />
                                {errors.time && <span className="text-red-500">{errors.time}</span>}
                            </div>
                        </div>

                        <div className="flex items-center gap-6 mb-2">
                            <label className="text-gray-700">Location:</label>
                            <div>
                                <input type="text" name="location" value={trainingData.location} onChange={handleChange} className={`border ${errors.location ? 'border-red-500' : 'border-gray-300'} rounded-md py-1 px-3 block`} />
                                {errors.location && <span className="text-red-500">{errors.location}</span>}
                            </div>
                        </div>

                        <div className="flex items-center gap-6 mb-2">
                            <label className="text-gray-700">Duration (Hours):</label>
                            <div>
                                <input type="number" name="durationHours" value={trainingData.durationHours} onChange={handleChange} className={`border ${errors.durationHours ? 'border-red-500' : 'border-gray-300'} rounded-md py-1 px-3 block`} />
                                {errors.durationHours && <span className="text-red-500">{errors.durationHours}</span>}
                            </div>
                        </div>

                        <div className="flex items-center gap-6 mb-2">
                            <label className="text-gray-700">Lead Instructor:</label>
                            <div>
                                <input type="text" name="leadInstructor" value={trainingData.leadInstructor} onChange={handleChange} className={`border ${errors.leadInstructor ? 'border-red-500' : 'border-gray-300'} rounded-md py-1 px-3 block`} />
                                {errors.leadInstructor && <span className="text-red-500">{errors.leadInstructor}</span>}
                            </div>
                        </div>

                        <div className="flex items-center gap-6 mb-2">
                            <label className="text-gray-700">Max Participants:</label>
                            <div>
                                <input type="number" name="maxParticipants" value={trainingData.maxParticipants} onChange={handleChange} className={`border ${errors.maxParticipants ? 'border-red-500' : 'border-gray-300'} rounded-md py-1 px-3 block`} />
                                {errors.maxParticipants && <span className="text-red-500">{errors.maxParticipants}</span>}
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

export default UpdateTraining;
