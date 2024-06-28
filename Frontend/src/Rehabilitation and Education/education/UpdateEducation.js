import React, { useState, useEffect } from 'react';
import { FaWindowClose } from "react-icons/fa";
import axios from 'axios';
import { toast } from 'react-toastify';

const UpdateEducation = ({ isOpen, onClose, refreshList, educationId }) => {
    const [educationData, setEducationData] = useState({
        programName: '',
        category: '',
        date: '',
        time: '',
        location: '',
        ageGroup: '',
        instructors: ''
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (isOpen && educationId) {
            fetchEducationDetails(educationId);
        }
    }, [isOpen, educationId]);

    const fetchEducationDetails = async (id) => {
        try {
            const response = await axios.get(`http://localhost:3500/api/education/${id}`);
            const education = response.data;
            const date = new Date(education.date).toISOString().split('T')[0];
            setEducationData({
                programName: education.programName,
                category: education.category,
                date: date,
                time: education.time,
                location: education.location,
                ageGroup: education.ageGroup,
                instructors: education.instructors
            });
        } catch (error) {
            console.error('Error fetching education details:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEducationData({ ...educationData, [name]: value });
    };

    const validateForm = () => {
        const errors = {};

        if (!educationData.programName.trim()) {
            errors.programName = 'Program Name is required';
        }

        if (!educationData.category.trim()) {
            errors.category = 'Category is required';
        }

        if (!educationData.date) {
            errors.date = 'Date is required';
        }

       
        if (!educationData.time.trim()) {
            errors.time = 'Time is required';
        } 

        if (!educationData.location.trim()) {
            errors.location = 'Location is required';
        }

        if (!educationData.ageGroup.trim()) {
            errors.ageGroup = 'Age Group is required';
        }

        if (!educationData.instructors.trim()) {
            errors.instructors = 'Instructors is required';
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            await axios.put(`http://localhost:3500/api/education/update/${educationId}`, educationData);
            toast.success('Education Successfully Updated ', {
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
            refreshList(); // Refresh the education list
        } catch (error) {
            console.error('Error updating education:', error);
        }
    };

    return (
        <div className={`fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50 ${isOpen ? 'block' : 'hidden'}`}>
            <div className="bg-white p-6 rounded-lg max-w-[50%] relative" >
                <FaWindowClose size={25} color='red' onClick={onClose} className="absolute duration-150 cursor-pointer right-1 top-1 hover:scale-110" />
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className="flex items-center gap-6 mb-2">
                            <label className="text-gray-700">Program Name:</label>
                            <div>
                                <input type="text" name="programName" value={educationData.programName} onChange={handleChange} className={`border ${errors.programName ? 'border-red-500' : 'border-gray-300'} rounded-md py-1 px-3 block`} />
                                {errors.programName && <span className="text-red-500">{errors.programName}</span>}
                            </div>
                        </div>

                        <div className="flex items-center gap-6 mb-2">
                            <label className="text-gray-700">Category:</label>
                            <div>
                                <select name="category" value={educationData.category} onChange={handleChange} className={`border ${errors.category ? 'border-red-500' : 'border-gray-300'} rounded-md py-1 px-3 block`}>
                                <option value="">Select Category</option>
                                    <option value="Youth Empowerment">Youth Empowerment</option>
                                    <option value="Adult Basic Education Initiatiove">Adult Basic Education Initiatiove</option>
                                    <option value="Digital Literacy">Digital Literacy</option>
                                </select>
                                {errors.category && <span className="text-red-500">{errors.category}</span>}
                            </div>
                        </div>

                        <div className="flex items-center gap-6 mb-2">
                            <label className="text-gray-700">Date:</label>
                            <div>
                                <input type="date" name="date" value={educationData.date} onChange={handleChange} className={`border ${errors.date ? 'border-red-500' : 'border-gray-300'} rounded-md py-1 px-3 block`} />
                                {errors.date && <span className="text-red-500">{errors.date}</span>}
                            </div>
                        </div>

                        <div className="flex items-center gap-6 mb-2">
                            <label className="text-gray-700">Time:</label>
                            <div>
                                <input type="time" name="time" value={educationData.time} onChange={handleChange} className={`border ${errors.time ? 'border-red-500' : 'border-gray-300'} rounded-md py-1 px-3 block`} />
                                {errors.time && <span className="text-red-500">{errors.time}</span>}
                            </div>
                        </div>

                        <div className="flex items-center gap-6 mb-2">
                            <label className="text-gray-700">Location:</label>
                            <div>
                                <input type="text" name="location" value={educationData.location} onChange={handleChange} className={`border ${errors.location ? 'border-red-500' : 'border-gray-300'} rounded-md py-1 px-3 block`} />
                                {errors.location && <span className="text-red-500">{errors.location}</span>}
                            </div>
                        </div>

                        <div className="flex items-center gap-6 mb-2">
                            <label className="text-gray-700">Age Group:</label>
                            <div>
                                <select name="ageGroup" value={educationData.ageGroup} onChange={handleChange} className={`border ${errors.ageGroup ? 'border-red-500' : 'border-gray-300'} rounded-md py-1 px-3 block`}>
                                    <option value="">Select Age Group</option>
                                    <option value="18 - 25">18 - 25</option>
                                    <option value="26 - 35">26 - 35</option>
                                    <option value="36 - 50">36 - 50</option>
                                    <option value="Above 50">Above 50</option>
                                </select>
                                {errors.ageGroup && <span className="text-red-500">{errors.ageGroup}</span>}
                            </div>
                        </div>

                        <div className="flex items-center gap-6 mb-2">
                            <label className="text-gray-700">Instructors:</label>
                            <div>
                                <input type="text" name="instructors" value={educationData.instructors} onChange={handleChange} className={`border ${errors.instructors ? 'border-red-500' : 'border-gray-300'} rounded-md py-1 px-3 block`} />
                                {errors.instructors && <span className="text-red-500">{errors.instructors}</span>}
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

export default UpdateEducation;
