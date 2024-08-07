import React, { useState, useEffect } from 'react';
import { useAuth } from '../../creatContext'; // Correct the import path if needed
import { useTheme } from '../../usetheamContext'; // Correct the import path if needed
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Home/Home.jsx'; // Correct the import path if needed
import { MdDeleteSweep } from "react-icons/md";
import { ImQuotesLeft } from "react-icons/im";
import Swal from 'sweetalert2'

const StoryPage = () => {
  const [stories, setStories] = useState([]);
  const [newStory, setNewStory] = useState('');
  const [auth] = useAuth();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [colors, setColors] = useState([]);
  axios.defaults.withCredentials = true;

  useEffect(() => { 
    const fetchStories = async () => {
      try {
        setLoading(true); // Start loading
        const response = await fetch('http://localhost:5000/stories');
        if (!response.ok) {
          throw new Error('Failed to fetch stories');
        }
        const data = await response.json();
        setStories(data);
         console.log('Fetched stories:', data); // Log the data for debugging
        // Generate random colors for each story
        const newColors = data.map(() => getRandomColor());
        setColors(newColors);
      } catch (error) {
        console.error('Error fetching stories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  const handleAddStory = async () => {
    if (!newStory) return;

    try {
      const response = await fetch('http://localhost:5000/stories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: auth.username, story: newStory }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error);
      }

      const addedStory = await response.json();
      setStories([...stories, addedStory]);
      setNewStory('');
    } catch (error) {
      console.error('Error adding story:', error);
    }
  };

  const handleRemoveStory = async (id) => {
    try {
      // Show confirmation dialog
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "This action cannot be undone!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
      });
  
      if (result.isConfirmed) {
        // Proceed with deletion
        const response = await fetch(`http://localhost:5000/stories/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: auth.username }), // Sending the username for authorization
        });
  
        if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(errorResponse.error);
        }
  
        // Show success notification
        await Swal.fire({
          title: 'Deleted!',
          text: 'The story has been removed.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
  
        // Remove the story from state after successful deletion
        setStories(stories.filter(story => story._id !== id));
      }
    } catch (error) {
      // Show error notification
      await Swal.fire({
        title: 'Error!',
        text: `Error removing story: ${error.message}`,
        icon: 'error',
        confirmButtonText: 'OK'
      });
  
      console.error('Error removing story:', error);
    }
  };

  // const handleRemoveStory = async (id) => {
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: 'This event will be removed from events.',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: 'Yes',
  //     cancelButtonText: 'No',
  //     reverseButtons: true
  //   }).then((result) => {
  //     const response = await fetch(`http://localhost:5000/stories/${id}`, {
  //       method: 'DELETE',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ username: auth.username }), // Sending the username for authorization
  //     });
  //     if (result.isConfirmed) {
  //       axios.delete(`http://localhost:5000/api/events/${id}`)
  //       .then(() => {
  //         setEvents(events.filter(event => event._id !== id));
  //       })
  //       .catch(error => {
  //         console.error('Error removing event:', error);
  //         alert('Error removing event: ' + error.message);
  //       });
  
  //       Swal.fire(
  //         'Removed!',
  //         'Event has been removed.',
  //         'success'
  //       );
  //     }
  //   });

  //   try {
  //     const response = await fetch(`http://localhost:5000/stories/${id}`, {
  //       method: 'DELETE',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ username: auth.username }), // Sending the username for authorization
  //     });
  
  //     if (!response.ok) {
  //       const errorResponse = await response.json();
  //       throw new Error(errorResponse.error);
  //     }
  
  //     // Remove the story from state after successful deletion
  //     setStories(stories.filter(story => story._id !== id));
  //   } catch (error) {
  //     console.error('Error removing story:', error);
  //   }
  // };

  // const handleRemoveEvent = (id) => {
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: 'This event will be removed from events.',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: 'Yes',
  //     cancelButtonText: 'No',
  //     reverseButtons: true
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       axios.delete(`http://localhost:5000/api/events/${id}`)
  //       .then(() => {
  //         setEvents(events.filter(event => event._id !== id));
  //       })
  //       .catch(error => {
  //         console.error('Error removing event:', error);
  //         alert('Error removing event: ' + error.message);
  //       });
  
  //       Swal.fire(
  //         'Removed!',
  //         'Event has been removed.',
  //         'success'
  //       );
  //     }
  //   });
  // };

  const containerBgColor = theme === 'blue' ? 'bg-blue-primary-bg' : 'bg-dark-primary-bg';
  const textPrimary = theme === 'blue' ? 'text-blue-text-light' : 'text-dark-text-light';
  const textSecondary = theme === 'blue' ? 'text-blue-text-blue' : 'text-dark-text-blue';
  const overlay = theme === 'blue' ? 'bg-blue-overlay' : 'bg-dark-overlay';

  return (
    <div className='storyContainer relative flex justify-end p-8 min-h-screen overflow-hidden'>
          <div className='fixed left-0 top-30 flex flex-col p-8'>
            <h1 className='text-6xl text-left text-white m-0 p-0'>Stories</h1>
          </div>
      <div className='max-w-screen-2xl'>
        <div className={`storyPart ${overlay} w-[1000px] mx-auto py-8 px-4 sm:px-6 lg:px-8 relative`}>
          {auth.isLoggedIn ? (
            <>
              <div className="addstoryPart mb-12 bg-zinc-800 rounded-lg shadow-xl p-6">
                <h2 className={`text-3xl font-bold mb-4 ${textSecondary}`}>Add Your Story</h2>
                <textarea
                  className="w-full p-4 border bg-gray-600 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  rows="5"
                  placeholder="Share your story..."
                  value={newStory}
                  onChange={(e) => setNewStory(e.target.value)}
                />
                <button
                  className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
                  onClick={handleAddStory}
                >
                  Submit Story
                </button>
              </div>
            </>
          ) : (
            <div className="mt-8 text-center">
              <h2 className={`text-2xl font-bold mb-4 ${textSecondary}`}>Sign in to Add Your Story</h2>
              <p className="text-gray-600">Please sign in to share your story and contribute to our community.</p>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg mt-4"
                onClick={() => {
                  navigate(`/Login`);
                }}
              >
                Sign In
              </button>
            </div>
          )}

          <h1 className="mt-12 text-3xl font-bold text-center mb-8">Stories</h1>

          {loading ? (
            <div className="text-center py-8">
              <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
              <p>Loading stories...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {stories.map((story, index) => (
                <div
                  key={story._id}
                  className="stories relative bg-white p-4 rounded-lg shadow-lg transform transition-transform hover:shadow-2xl w-72"
                >
                  <p className="text-white font-serif mb-4 leading-7"><ImQuotesLeft />{story.story}</p>
                  <div className='flex gap-2 h-10 m-auto'>
                    <img src={story.image} alt={story.username} className='h-10 w-10 rounded-full' />
                    <div className='flex flex-col'>
                      <h4 className="text-lg text-white m-0">{story.username}</h4>
                      <p className="text-white text-[10px] -mt-2 opacity-50">{new Date(story.date).toLocaleString()}</p>
                    </div>
                  </div>
                  {auth.username === story.username && (
                    <button
                      className="absolute top-0 right-0 hover:bg-red-400 text-white font-medium rounded-3xl"
                      onClick={() => handleRemoveStory(story._id)}
                    >
                      <MdDeleteSweep />
                    </button>
                  )}
                </div>
              ))}
            </div>
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
    </div>
  );
};

export default StoryPage;
