import React from 'react'
import TopBar from './Topbar'
import RehabilitationSidebar from './RehabilitationSidebar'
import RehabilitationHome from './RehabilitationHome'


const RehabilitationDashboard = () => {
  return (
    <div className='w-screen h-screen'>
        <div className='flex w-full'>
            <RehabilitationSidebar/>
            <div className='w-full'>
                <TopBar/>
                <RehabilitationHome/>
            </div>
        </div>
    </div>
  )
}

export default RehabilitationDashboard