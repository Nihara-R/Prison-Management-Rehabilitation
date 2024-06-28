import React, { useEffect, useState } from 'react'
import axios from 'axios';
import RehabilitationSidebar from '../RehabilitationSidebar';
import Digital from '../../images/digital.jpg';
import Adult from '../../images/educ.jpg';
import Youth from '../../images/youth.jpg';
import { Link } from 'react-router-dom';


const EducationHome = () => {

    const [educations, setEducations] = useState([]);

    // Function to fetch all education records from the API
    const fetchEducations = async () => {
        try {
            const response = await axios.get('http://localhost:3500/api/education'); // Adjust the API endpoint as per your backend route
            console.log(response.data);
            setEducations(response.data);
        } catch (error) {
            console.error('Error fetching education records:', error);
        }
    };

    useEffect(() => {
        fetchEducations();
    }, []);


    return (
        <div className='w-full h-full'>
            <div className='flex gap-2'>
                <RehabilitationSidebar />
                <div className='flex'>
                    <div className='w-full'>
                        <h1 className='py-6 text-2xl font-bold text-center'>Education Categories</h1>
                        <div className="w-[80%] mx-auto  grid grid-cols-3 gap-4">

                            <Link to="/youthEducation">
                                <div className="p-4 mb-4 duration-150 border border-gray-200 rounded-md cursor-pointer bg-primary hover:shadow-xl hover:scale-105">
                                    <img src={Youth} alt="image" />
                                    <h2 className="p-4 text-xl text-center font-semibol">Youth Empowerment Program</h2>
                                </div>
                            </Link>
                            <Link to="/adultEducation">
                                <div className="p-4 mb-4 duration-150 border border-gray-200 rounded-md cursor-pointer bg-primary hover:shadow-xl hover:scale-105">
                                    <img src={Adult} alt="image" />
                                    <h2 className="p-4 text-xl text-center font-semibol">Adult Basic Education Program</h2>
                                </div>
                            </Link>
                            <Link to="/digitalEducation">
                                <div className="p-4 mb-4 duration-150 border border-gray-200 rounded-md cursor-pointer bg-primary hover:shadow-xl hover:scale-105">
                                    <img src={Digital} alt="image" />
                                    <h2 className="p-4 text-xl text-center font-semibol">Digital Literacy Program</h2>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EducationHome