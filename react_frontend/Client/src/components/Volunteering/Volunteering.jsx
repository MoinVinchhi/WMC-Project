import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../creatContext';
import moment from 'moment';
import VolunteeringForm from './VolunteeringForm';

function Volunteering() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [volunteerStatus, setVolunteerStatus] = useState({});
  const [auth] = useAuth();

  useEffect(() => {
    axios.get('http://localhost:5000/api/events')
      .then(response => {
        setEvents(response.data || []);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        alert('Error loading events: ' + error.message);
        setLoading(false);
      });

    axios.get('http://localhost:5000/api/volunteers')
      .then(response => {
        const statusMap = {};
        response.data.forEach(volunteer => {
          statusMap[volunteer.eventId] = volunteer.status;
        });
        setVolunteerStatus(statusMap);
      })
      .catch(error => {
        console.error(error);
        alert('Error loading volunteer status: ' + error.message);
      });
  }, []);

  const handleShowInterest = (event) => {
    setSelectedEvent(event);
    setVolunteerStatus(prevStatus => ({
      ...prevStatus,
      [event._id]: 'Pending'
    }));
  };
  

  const renderEvents = (eventsList) => (
    <div className='flex justify-end gap-8'>
      <div className="space-y-8 relative right-0 w-full">
        {eventsList.map((event) => (
          <div
            key={event._id}
            className="eventCard flex bg-zinc-800 shadow-lg rounded-lg overflow-hidden transform transition-all duration-300"
          >
            <div className="w-52 bg-gray-800 text-white flex-shrink-0 p-4 text-center flex flex-col justify-center items-center relative">
              <img src={event.image || './src/assets/images/blank.png'} className="absolute inset-0 object-cover w-full h-full opacity-30" />
              <p className="text-5xl font-bold">{moment(event.date).format('D')}</p>
              <p className="text-4xl">{moment(event.date).format('MMM')}</p>
            </div>

            <div className="flex flex-col justify-items-start p-4 flex-1">
              <h4 className="text-left text-2xl m-0 p-0 font-semibold text-gray-300 mb-2">{event.title}</h4>
              <hr className='bg-black mb-2 opacity-25' />
              <p className="text-left text-md leading-7 text-gray-300 mb-5">{event.description}</p>
              <p className='text-left text-sm leading-6 text-gray-300 mb-2'>
                <h4 className=''>Time: {event.time}</h4>
                <h4 className=''>Venue: {event.venue}</h4>
                <h4 className=''>Duration: {event.duration}</h4>
              </p>
              <button
                onClick={() => handleShowInterest(event)}
                className={`w-fit mt-2 px-4 py-2 text-white rounded-lg ${volunteerStatus[event._id] === 'Pending' ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                disabled={volunteerStatus[event._id] === 'Pending'}
              >
                {volunteerStatus[event._id] === 'Pending' ? 'Pending' : 'Show Interest in this Event'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className='profileContainer'>
    <div className='relative flex justify-end p-8 min-h-screen overflow-hidden'>
      <div className='fixed left-0 top-30 flex flex-col p-16'>
        <h1 className='text-3xl text-left text-white m-0 p-0'>VOLUNTEERING</h1>
      </div>
      <div className="max-w-screen-lg justify-end w-full z-[1]">
        {loading ? (
          <div className="text-center py-16">
            <div className="spinner-border text-orange-500 mb-4" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p>Loading events...</p>
          </div>
        ) : (
          <div className="eventPart p-4 mb-12">
            {renderEvents(events)}
          </div>
        )}
        {selectedEvent && (
          <VolunteeringForm
            isOpen={Boolean(selectedEvent)}
            onClose={() => setSelectedEvent(null)}
            event={selectedEvent}
          />
        )}
      </div>
    </div>
    {/* vertical */}
    <div className='absolute top-0 left-0 w-screen h-screen opacity-5 flex'>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
        </div>

        {/* horizontal */}
        <div className='absolute top-0 left-0 w-screen h-screen opacity-5 flex flex-col'>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
        </div>
    </div>
  );
}

export default Volunteering;
