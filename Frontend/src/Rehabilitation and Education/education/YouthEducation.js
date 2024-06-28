import React, { useState, useEffect } from 'react';
import RehabilitationSidebar from '../RehabilitationSidebar';
import axios from 'axios';
import { IoEyeOutline } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";


const YouthEducation = () => {
    const [educations, setEducations] = useState([]); // State to store education records
    const [searchQuery, setSearchQuery] = useState(''); // State for search query

    // Function to fetch all education records from the API
    const fetchEducations = async () => {
        try {
            const response = await axios.get('http://localhost:3500/api/education'); // Adjust the API endpoint as per your backend route
            setEducations(response.data);
        } catch (error) {
            console.error('Error fetching education records:', error);
        }
    };

    useEffect(() => {
        fetchEducations();
    }, []);

    // Function to filter education records based on search query and category
    const filteredEducations = educations.filter(education =>
        education.programName.toLowerCase().includes(searchQuery.toLowerCase()) && education.category === 'Youth Empowerment'
    );

    return (
        <div className='w-[100%] h-auto'>
            <div className='flex gap-2'>
                <RehabilitationSidebar />
                <div>
                    <div className='w-full'>
                        <h1 className='py-6 text-2xl font-bold text-center'>Youth Empowerment Program</h1>
                        <div className='flex justify-end w-[100%] p-4 '>
                            <div className='flex flex-col gap-2'>
                                <input
                                    className='px-6 py-2 text-black bg-gray-200 border-2 rounded-lg outline-none border-primary'
                                    type="text"
                                    placeholder='Search Educations'
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="overflow-x-auto w-[100%] mx-auto">
                            <table className="able-auto mw-full">
                                <thead>
                                    <tr className="leading-normal text-gray-800 uppercase bg-gray-200 text-md">
                                        <th className="px-6 py-3 text-left">Program Name</th>
                                        <th className="px-6 py-3 text-left">Category</th>
                                        <th className="px-6 py-3 text-left">Date</th>
                                        <th className="px-6 py-3 text-left">Time</th>
                                        <th className="px-6 py-3 text-left">Location</th>
                                        <th className="px-6 py-3 text-left">Age Group</th>
                                        <th className="px-6 py-3 text-left">Instructors</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm font-normal text-gray-900">
                                    {filteredEducations.map(education => (
                                        <tr key={education._id} className="border-b border-gray-200 hover:bg-gray-100">
                                            <td className="px-6 py-3 text-left whitespace-nowrap">{education.programName}</td>
                                            <td className="px-6 py-3 text-left whitespace-nowrap">{education.category}</td>
                                            <td className="px-6 py-3 text-left whitespace-nowrap">{new Date(education.date).toLocaleDateString()}</td>
                                            <td className="px-6 py-3 text-left whitespace-nowrap">{education.time}</td>
                                            <td className="px-6 py-3 text-left whitespace-nowrap">{education.location}</td>
                                            <td className="px-6 py-3 text-left whitespace-nowrap">{education.ageGroup}</td>
                                            <td className="px-6 py-3 text-left whitespace-nowrap">{education.instructors}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default YouthEducation;
