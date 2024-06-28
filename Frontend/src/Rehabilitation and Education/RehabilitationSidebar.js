import React from 'react'
import { Link } from 'react-router-dom'

const RehabilitationSidebar = () => {
  return (
    <div className='h-screen w-[250px] bg-primary'>
        <div>
            <Link to="/rehabilitationDashboard"><h1 className='px-4 pt-8 pb-4 text-xl font-semibold cursor-pointer hover:underline'>Rehabilitation Dashboard</h1></Link>
            <hr className='bg-black h-[3px] border-none'/>
            <ul className='flex flex-col gap-4 px-6 py-6 text-lg'>
                <Link to="/allEvents"><li className='duration-200 cursor-pointer hover:underline hover:scale-105'>Events</li></Link>
                <ul className='ml-6'>
                   <Link to="/upcommongEvents"><li className='cursor-pointer hover:underline'>Upcoming</li></Link>
                   <Link to="/pastEvents"><li className='cursor-pointer hover:underline'>Past</li></Link>
                   <Link to="/allEvents"><li className='cursor-pointer hover:underline'>All</li></Link>
                </ul>
                <Link to="/educationHome"><li className='duration-200 cursor-pointer hover:underline hover:scale-105'>Education</li></Link>
                <ul className='ml-6'>
                   <Link to="/allEducation"><li className='cursor-pointer hover:underline'>All Educations</li></Link>
                </ul>
                <Link to="/allTrainings"><li className='duration-200 cursor-pointer hover:underline hover:scale-105'>Vocational Training</li></Link>
                <Link to="/allReintegrations"><li className='duration-200 cursor-pointer hover:underline hover:scale-105'>Reintegration</li></Link>
            </ul>
        </div>
    </div>
  )
}

export default RehabilitationSidebar;
