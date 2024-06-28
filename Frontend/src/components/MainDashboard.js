import React from 'react'
import { Link } from 'react-router-dom'

const MainDashboard = () => {
  return (
    <div className='flex items-center justify-center w-screen h-screen'>
      <div className='flex gap-6 text-lg text-white'>

        <Link to='/rehabilitationDashboard'><button className='px-4 py-2 bg-green-600 rounded-md hover:shadow-lg'>Rehabilitation  Management</button></Link>
       
      </div>
    </div>
  )
}

export default MainDashboard