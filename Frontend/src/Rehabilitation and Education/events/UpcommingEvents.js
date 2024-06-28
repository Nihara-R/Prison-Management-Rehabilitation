import React, { useState, useEffect } from 'react';
import RehabilitationSidebar from '../RehabilitationSidebar';
import axios from 'axios';
import Image from '../../images/upcomming.jpg'

const UpcomingEvents = () => {
    const [events, setEvents] = useState([]); // State to store event records
    
    // Function to fetch all event records from the API
    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:3500/api/event'); 
            console.log(response.data);
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching event records:', error);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    // Function to filter today's events
    const filterTodayEvents = () => {
        const currentDate = new Date();
        const todayEvents = events.filter(event => new Date(event.date).toDateString() === currentDate.toDateString());
        return todayEvents;
    };

    // Function to filter upcoming events
    const filterUpcomingEvents = () => {
        const currentDate = new Date();
        const upcomingEvents = events.filter(event => new Date(event.date) > currentDate);
        return upcomingEvents;
    };

    // Combine today's events and upcoming events, sort them by date
    const sortedEvents = [...filterTodayEvents(), ...filterUpcomingEvents()].sort((a, b) => new Date(a.date) - new Date(b.date));

    return (
        <div className='w-full h-full'>
            <div className='flex'>
                <RehabilitationSidebar />
                <div className='flex-grow'>
                    <div className='w-full'>
                        <h1 className='py-6 text-2xl font-bold text-center'>Upcoming Events</h1>
                        <div className="w-[90%] mx-auto overflow-x-auto grid grid-cols-4 gap-4">
                            {sortedEvents.length > 0 ? (
                                sortedEvents.map((event, i) => (
                                    <div key={i} className="p-4 mb-4 duration-150 border border-gray-200 rounded-md cursor-pointer bg-primary hover:shadow-xl hover:scale-105">
                                        <img src={Image} alt="image" />
                                        <h2 className="text-lg font-semibold">{event.eventName}</h2>
                                        <p className="mb-2 text-gray-600">Date: {new Date(event.date).toLocaleDateString()}</p>
                                        <p className="mb-2 text-gray-600">Time: {event.time}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center">No upcoming events</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpcomingEvents;
