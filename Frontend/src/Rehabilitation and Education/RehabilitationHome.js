import React from 'react'
import { MdEmojiEvents } from "react-icons/md";
import { GiGraduateCap } from "react-icons/gi";
import { GiTeacher } from "react-icons/gi";
import { FaPeoplePulling } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const RehabilitationHome = () => {
    return (
        <div className='w-full h-auto'>
            <div className='grid grid-cols-2 gap-6 w-[80%] mx-auto mt-6'>
                <Link to="/allEvents">
                    <div className='bg-[#0369a1] flex flex-col gap-2 items-center h-[200px] justify-center cursor-pointer transition duration-300 ease-in-out hover:bg-blue-800 hover:bg-opacity-90 hover:shadow-xl'>
                        <MdEmojiEvents size={50} />
                        <p className='text-xl font-bold text-white'>Events</p>
                    </div>
                </Link>
                <Link to="/allEducation">
                    <div className='bg-[#0369a1] flex flex-col gap-2 items-center h-[200px] justify-center cursor-pointer transition duration-300 ease-in-out hover:bg-blue-800 hover:bg-opacity-90 hover:shadow-xl'>
                        <GiGraduateCap size={50} />
                        <p className='text-xl font-bold text-white'>Education</p>
                    </div>
                </Link>
                <Link to="/allTrainings">
                    <div className='bg-[#0369a1] flex flex-col gap-2 items-center h-[200px] justify-center cursor-pointer transition duration-300 ease-in-out hover:bg-blue-800 hover:bg-opacity-90 hover:shadow-xl'>
                        <GiTeacher size={50} />
                        <p className='text-xl font-bold text-white'>Vocational Training</p>
                    </div>
                </Link>
                <Link to="/allReintegrations">
                    <div className='bg-[#0369a1] flex flex-col gap-2 items-center h-[200px] justify-center cursor-pointer transition duration-300 ease-in-out hover:bg-blue-800 hover:bg-opacity-90 hover:shadow-xl'>
                        <FaPeoplePulling size={50} />
                        <p className='text-xl font-bold text-white'>Reintegrations</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default RehabilitationHome;
