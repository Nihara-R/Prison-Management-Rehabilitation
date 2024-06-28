import React, { useState } from 'react';
import { FaWindowClose } from "react-icons/fa";
import axios from 'axios';
import { toast } from 'react-toastify';

const AddEvent = ({ isOpen, onClose, refreshList }) => {
  const [eventData, setEventData] = useState({
    eventName: '',
    category: '',
    date: '',
    time: '',
    organizer: '', // Added organizer field
    targetAudience: ''
  });

  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'eventName' && !/^[A-Za-z0-9\s]*$/.test(value)) {
      setShowAlert(true);
      return; // If event name contains symbols, don't update the state
    }
    setEventData({ ...eventData, [name]: value });
    setShowAlert(false);
  };

  const validateForm = () => {
    const errors = {};

    if (!eventData.eventName.trim()) {
      errors.eventName = 'Event Name is required';
    }

    if (!/^[A-Za-z0-9\s]+$/.test(eventData.eventName.trim())) { // Validate event name with only letters and numbers
      errors.eventName = 'Event Name should only contain letters and numbers';
    }

    if (!eventData.category.trim()) {
      errors.category = 'Category is required';
    }

    if (!eventData.date) {
      errors.date = 'Date is required';
    }

    if (!eventData.time.trim()) {
      errors.time = 'Time is required';
    }

    if (!/^[A-Za-z.]+$/.test(eventData.organizer.trim())) { // Validate organizer name with only letters and dot
      errors.organizer = 'Organizer should only contain letters and dots';
    }

    if (!eventData.targetAudience.trim()) {
      errors.targetAudience = 'Target Audience is required';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.post('http://localhost:3500/api/event/add', eventData);
      refreshList(); // Refresh the list after successful addition
      onClose(); // Close the modal after successful addition
      console.log('Event added successfully');
      toast.success('Event Successfully Added ', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      // Reset form fields
      setEventData({
        eventName: '',
        category: '',
        date: '',
        time: '',
        organizer: '', // Reset organizer field
        targetAudience: ''
      });
      setErrors({});
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  return (
    <div className={`fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50 ${isOpen ? 'block' : 'hidden'}`}>
      <div className="bg-white p-6 rounded-lg max-w-[50%] relative" >
        <FaWindowClose size={25} color='red' onClick={onClose} className="absolute duration-150 cursor-pointer right-1 top-1 hover:scale-110" />
        {showAlert && <div className="absolute top-0 right-0 m-4 bg-red-500 text-white px-4 py-2 rounded-md">Cannot add symbols in Event Name</div>}
        <div>
          <h2 className='p-4 text-xl font-semibold text-center'>Add New Event</h2>
          <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-6 mb-2">
              <label className="text-gray-700">Event Name:</label>
              <div>
                <input type="text" name="eventName" value={eventData.eventName} onChange={handleChange} className={`border ${errors.eventName ? 'border-red-500' : 'border-gray-300'} rounded-md py-1 px-3 block`} />
                {errors.eventName && <span className="text-red-500">{errors.eventName}</span>}
              </div>
            </div>

            <div className="flex items-center gap-6 mb-2">
              <label className="text-gray-700">Category:</label>
              <div>
                <select name="category" value={eventData.category} onChange={handleChange} className={`border ${errors.category ? 'border-red-500' : 'border-gray-300'} rounded-md py-1 px-3 block`}>
                  <option value="">Select Category</option>
                  <option value="Cultural">Cultural</option>
                  <option value="Religious">Religious</option>
                  <option value="Health and Wellness">Health and Wellness</option>
                  <option value="Professional Development">Professional Development</option>
                </select>
                {errors.category && <span className="text-red-500">{errors.category}</span>}
              </div>
            </div>

            <div className="flex items-center gap-6 mb-2">
              <label className="text-gray-700">Date:</label>
              <div>
                <input type="date" name="date" value={eventData.date} onChange={handleChange} className={`border ${errors.date ? 'border-red-500' : 'border-gray-300'} rounded-md py-1 px-3 block`} />
                {errors.date && <span className="text-red-500">{errors.date}</span>}
              </div>
            </div>

            <div className="flex items-center gap-6 mb-2">
              <label className="text-gray-700">Time:</label>
              <div>
                <input type="time" name="time" value={eventData.time} onChange={handleChange} className={`border ${errors.time ? 'border-red-500' : 'border-gray-300'} rounded-md py-1 px-3 block`} />
                {errors.time && <span className="text-red-500">{errors.time}</span>}
              </div>
            </div>

            <div className="flex items-center gap-6 mb-2">
              <label className="text-gray-700">Organizer:</label>
              <div>
                <input type="text" name="organizer" value={eventData.organizer} onChange={handleChange} className={`border ${errors.organizer ? 'border-red-500' : 'border-gray-300'} rounded-md py-1 px-3 block`} />
                {errors.organizer && <span className="text-red-500">{errors.organizer}</span>}
              </div>
            </div>

            <div className="flex items-center gap-6 mb-2">
              <label className="text-gray-700">Target Audience:</label>
              <div>
                <select name="targetAudience" value={eventData.targetAudience} onChange={handleChange} className={`border ${errors.targetAudience ? 'border-red-500' : 'border-gray-300'} rounded-md py-1 px-3 block`}>
                  <option value="">Select Target Audience</option>
                  <option value="Inmates">Inmates</option>
                  <option value="Staff">Staff</option>
                  <option value="Both">Both</option>
                </select>
                {errors.targetAudience && <span className="text-red-500">{errors.targetAudience}</span>}
              </div>
            </div>

            <div className="flex items-center justify-end mt-4">
              <button type="submit" className="px-4 py-2 bg-primary text-white rounded-md hover:bg-[#0369a1] duration-150 font-semibold">Add</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEvent;
