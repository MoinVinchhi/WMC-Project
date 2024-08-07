import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../creatContext';
import moment from 'moment';
import EventRegistrationForm from './RegistrationForm';
import Swal from 'sweetalert2';

function Blog() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
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
  }, []);

  const handleRegister = (event) => {
    setSelectedEvent(event);
  };

  const handleRemoveEvent = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This event will be removed from events.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/api/events/${id}`)
        .then(() => {
          setEvents(events.filter(event => event._id !== id));
        })
        .catch(error => {
          console.error('Error removing event:', error);
          alert('Error removing event: ' + error.message);
        });
  
        Swal.fire(
          'Removed!',
          'Event has been removed.',
          'success'
        );
      }
    });
  };

  const currentDate = moment();

  const currentEvents = events
    .filter(event => moment(event.date).isSame(currentDate, 'day'))
    .sort((a, b) => moment(a.date) - moment(b.date));

  const upcomingEvents = events
    .filter(event => moment(event.date).isAfter(currentDate, 'day'))
    .sort((a, b) => moment(a.date) - moment(b.date));

  const pastEvents = events
    .filter(event => moment(event.date).isBefore(currentDate))
    .sort((a, b) => moment(b.date) - moment(a.date));

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

              {auth.isAdmin && (
                <button
                  onClick={() => handleRemoveEvent(event._id)}
                  className="w-fit mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Remove Event
                </button>
              )}

              {moment(event.date).isSameOrAfter(currentDate) && (
                <button
                  onClick={() => handleRegister(event)}
                  className="w-fit mt-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Register
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className='eventContainer relative flex justify-end p-8 min-h-screen overflow-hidden'>
      {auth.isAdmin ? (
        <div className='fixed left-0 top-30 flex flex-col p-16'>
          <h1 className='text-6xl text-left text-white m-0 p-0'>EVENTS</h1>
        </div>
      ) : (
        <div className='fixed left-0 top-30 flex flex-col p-16'>
          <h1 className='text-6xl text-left text-white m-0 p-0'>EVENT</h1>
          <h1 className='text-5xl text-left text-white m-0 p-0'>CALENDAR</h1>
        </div>
      )}
      <div className="max-w-screen-lg justify-end w-full z-[1]">
        {loading ? (
          <div className="text-center py-16">
            <div className="spinner-border text-orange-500 mb-4" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p>Loading events...</p>
          </div>
        ) : (
          <>
            {currentEvents.length > 0 && (
              <div className="eventPart p-4 mb-12">
                <h3 className="sticky top-0 mt-0 text-white text-5xl font-semibold mb-6 text-center">Current Event</h3>
                {renderEvents(currentEvents)}
              </div>
            )}
            <div className="eventPart p-4 mb-12">
              <h3 className="sticky top-0 mt-0 text-white text-5xl font-semibold mb-6 text-center">Upcoming Events</h3>
              {upcomingEvents.length > 0 ? (
                renderEvents(upcomingEvents)
              ) : (
                <p className="text-gray-600 text-center">No upcoming events found.</p>
              )}
            </div>
            <div className='eventPart p-4'>
              <h3 className="text-5xl text-white font-semibold mb-6 text-center">Past Events</h3>
              {pastEvents.length > 0 ? (
                renderEvents(pastEvents)
              ) : (
                <p className="text-gray-600 text-center">No past events found.</p>
              )}
            </div>
          </>
        )}
        {selectedEvent && (
          <EventRegistrationForm
            isOpen={Boolean(selectedEvent)}
            onClose={() => setSelectedEvent(null)}
            event={selectedEvent}
          />
        )}
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

export default Blog;
