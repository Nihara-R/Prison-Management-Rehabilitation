import React, { useState, useEffect } from 'react';
import RehabilitationSidebar from '../RehabilitationSidebar';
import axios from 'axios';
import Image from '../../images/Pastevents.jpg'

const PastEvents = () => {
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

    // Function to filter past events
    const filterPastEvents = () => {
        const currentDate = new Date();
        const pastEvents = events.filter(event => new Date(event.date) < currentDate);
        return pastEvents;
    };

    // Sort past events by date
    const sortedPastEvents = filterPastEvents().sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <div className='w-full h-full'>
            <div className='flex'>
                <RehabilitationSidebar />
                <div className='flex-grow'>
                    <div className='w-full'>
                        <h1 className='py-6 text-2xl font-bold text-center'>Past Events</h1>
                        <div className="w-[90%] mx-auto overflow-x-auto grid grid-cols-4 gap-4">
                            {sortedPastEvents.length > 0 ? (
                                sortedPastEvents.map((event, i) => (
                                    <div key={i} className="p-4 mb-4 duration-150 border border-gray-200 rounded-md cursor-pointer bg-primary hover:shadow-xl hover:scale-105">
                                        <img src={Image} alt="past events" />
                                        <h2 className="text-lg font-semibold">{event.eventName}</h2>
                                        <p className="mb-2 text-gray-600">Date: {new Date(event.date).toLocaleDateString()}</p>
                                        <p className="mb-2 text-gray-600">Time: {event.time}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center">No past events</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PastEvents;
