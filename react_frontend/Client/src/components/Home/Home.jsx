import React, { useState, useEffect } from 'react';
import { useAuth } from '../../creatContext';
import { ReactTyped } from "react-typed";
import { useTheme } from '../../usetheamContext';
import axios from 'axios';
import moment from 'moment';
import './Home.css'
import { truthStages } from '../content.js';
import { improvementTips } from '../content.js';
import { Link } from 'react-router-dom';


const HoverCard = ({ title, description, image }) => {
  return (
    <div className="max-w-2xl rounded overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2">
      <div className="relative overflow-hidden">
        <img className="w-full object-cover transition-transform duration-300 transform hover:scale-110" src={image} alt={title} />
      </div>
      <div className="px-6 py-4 bg-white">
        <div className="font-bold text-xl mb-2 text-gray-800">{title}</div>
        <p className="text-gray-700 text-base h-0 opacity-0 transition-all duration-300 overflow-hidden group-hover:h-auto group-hover:opacity-100">{description}</p>
      </div>
    </div>
  );
};


function Home() {
  const [auth] = useAuth();
  const [events, setEvents] = useState([]);
  const [stories, setStories] = useState([]);
  const [News, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);

  axios.defaults.withCredentials = true;



  useEffect(() => {
    setLoading(true);

    axios.get('http://localhost:5000/api/events')
      .then(response => {
        const today = moment().startOf('day');
        const upcomingEvents = response.data.filter(event => moment(event.date).isAfter(today));
        const sortedEvents = upcomingEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
        setEvents(sortedEvents);
      })
      .catch(error => console.error(error));

    axios.get('http://localhost:5000/stories')
      .then(response => {
        const sortedStories = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setStories(sortedStories || []);
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));

    axios.get('http://localhost:5000/news')
      .then(response => {
        const sortedNews = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setNews(sortedNews || []);
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));

      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % upcomingEvents.length);
      }, 2500);
      return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? upcomingEvents.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % upcomingEvents.length);
  };

  const upcomingEvents = events.slice(0, 3);
  const lastFiveStories = stories.slice(0, 5);
  const displayNews = News.slice(0, 3);

  const storyStyles = [
    "bg-yellow-300 rotate-2",
    "bg-pink-200 -rotate-1",
    "bg-blue-200 rotate-1",
    "bg-green-200 -rotate-2",
    "bg-purple-200 rotate-3",
  ];

  const containerClass = `max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center items-center ${theme === 'blue' ? 'text-blue-text-light' : 'text-dark-text-light'}`;
  const sectionClass = `w-full py-16 px-4 ${theme === 'blue' ? 'bg-blue-primary-bg' : 'bg-dark-primary-bg'} text-white`;
  const goalItemClass = `flex items-center mb-2 animate-fadeIn ${theme === 'blue' ? 'bg-blue-highlight' : 'bg-dark-highlight'} rounded-lg shadow-md p-4 md:p-6 lg:p-8`;
  const upcomingEventsClass = `py-16 px-4 ${theme === 'blue' ? 'bg-blue-primary-bg' : 'bg-dark-primary-bg'} text-white`;
  const latestStoriesClass = `py-16 px-4 ${theme === 'blue' ? 'bg-blue-primary-bg' : 'bg-dark-primary-bg'} text-white`;

  
  return (
    <div className='overflow-hidden'>

      <div className="textContainer h-[710px] flex items-center justify-center relative">
        <div className="reactText bg-gradient-to-r from-blue-500 via-blue-300 to-blue-500 bg-opacity-30 backdrop-filter backdrop-blur-2xl p-4 rounded-lg shadow-lg w-auto">
          <ReactTyped
            className="md:text-3xl font-bold md:py-6 text-white text-center"
            strings={[
              "Welcome to the Epsilon Program!",
              "Discover cosmic truths and transcend the ordinary.",
              "Join our journey to spiritual enlightenment.",
              "Explore our beliefs and embrace inner peace.",
              "Become a member today and start your transformation!"
            ]}
            typeSpeed={120}
            backSpeed={180}
            loop
          />
        </div>

        {/* vertical */}
        <div className='grids absolute top-0 w-screen h-screen opacity-5 flex'>
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
        <div className='grids absolute top-0 w-screen h-screen opacity-5 flex flex-col'>
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


      {/* Three Events Section */}
      <div className='eventsContainer relative h-[70vh] m-auto'>
        <h2 className="text-white text-4xl font-extrabold mb-6 p-4 text-center">Events</h2>
        {loading ? (
          <p>Loading events...</p>
        ) : (
        <div id="default-carousel" className="eventsPage p-4 relative max-w-screen-xl m-auto" data-carousel="slide">
          <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
            <div className="flex transition-transform ease-in-out duration-500" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {upcomingEvents.map((event, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <img src={event.image} alt={event.title} className="w-full h-60 object-cover mb-2"/>
                  <h3 className="text-xl font-bold">{event.title}</h3>
                  <p>{moment(event.date).format('DD MMMM YYYY')}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
            {upcomingEvents.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-blue-950' : 'bg-white'}`}
                aria-current={index === currentSlide}
                aria-label={`Slide ${index + 1}`}
                onClick={() => goToSlide(index)}
              ></button>
            ))}
          </div>

          <button
            type="button"
            className="eventsButton absolute top-0 -start-20 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none bg-transparent focus:bg-transparent active:bg-transparent hover:bg-transparent"
            onClick={prevSlide}
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 ">
              <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
              </svg>
              <span className="sr-only">Previous</span>
            </span>
          </button>
          <button
            type="button"
            className="eventsButton absolute top-0 -end-20 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none bg-transparent focus:bg-transparent active:bg-transparent hover:bg-transparent"
            onClick={nextSlide}
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30">
              <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
              </svg>
              <span className="sr-only">Next</span>
            </span>
          </button>
        </div>
        )}
        
        {/* vertical */}
        <div className='absolute top-0 w-screen h-screen opacity-5 flex'>
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
        <div className='absolute top-0 w-screen h-screen opacity-5 flex flex-col'>
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

      {/* Latest Stories */}
      <div className='storiesContainer relative'>
        <h2 className="text-white text-4xl font-extrabold mb-6 p-4 text-center">Latest Stories</h2>
        {loading ? (
          <p>Loading stories...</p>
        ) : (
          <div className="relative flex flex-wrap justify-center gap-8 max-w-screen-xl m-auto">
            {lastFiveStories.map((story, index) => (

              <div key={story._id} className={`stories rounded-none text-white relative w-96 p-4 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300`}>
                    <img src={story.image} alt={story.username} className='h-14 w-14 rounded-full' />
                    <p className="text-white mb-2 w-50">{story.story}</p>
                <p className="text-lg mb-2 text-white text-right">-{story.username}</p>
                <p className="text-white text-sm italic text-right">{moment(story.date).fromNow()}</p>
             
              </div>
            ))}
          </div>
        )}

 
        {/* vertical */}
        <div className='absolute top-0 w-screen  opacity-5 flex'>
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
        <div className='absolute top-0 w-screen  opacity-5 flex flex-col'>
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

        <div>
          <div className={sectionClass}>
            <div>
                  <div className={`flex flex-col items-center justify-center min-h-screen   p-8`}>
                  <h1 className=" font-bold mb-10">Epsilon News </h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {displayNews.map((card, index) => (
                      <div key={index} className="group">
                        <HoverCard {...card} />
                      </div>
                    ))}
                  </div>
                </div>
            </div>
            </div>
      
        {/* vertical */}
        <div className='absolute top-0 w-screen  opacity-5 flex'>
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
        <div className='absolute top-0 w-screen  opacity-5 flex flex-col'>
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


    <div className="bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold text-center mb-12 animate-fadeIn">Epsilon Program Truth Stages</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {truthStages.slice(0, 2).map((stage) => (
      <div key={stage.id} className="bg-gray-800 p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 animate-slideUp">
        <img src={stage.image} alt={stage.name} className="w-full h-48 object-cover rounded-t-lg mb-4" />
        <h2 className="text-2xl font-semibold mb-2">{stage.name}</h2>
        <p className="text-lg mb-4">{stage.description}</p>
        <ul className="list-disc pl-5 mb-4">
          {stage.objectives.map((objective, index) => (
            <li key={index}>{objective}</li>
          ))}
        </ul>
        <div className="text-right">
          <span className="bg-blue-500 text-white px-3 py-1 rounded-full">{stage.difficulty}</span>
        </div>
      </div>
    ))}
      </div>
      <div className="text-center mt-8">
    <Link to="/about" className="bg-zinc-900 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-600 transition-colors">
      Read More
    </Link>
  </div>
    </div>
 
    <div className="p-6 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 animate-fadeIn">Improvement Tips</h1>
      <div className="space-y-8">
      {improvementTips && improvementTips.map((category, index) => (
  <div key={index} className="shadow-lg rounded-lg overflow-hidden animate-fadeIn">
    <h2 className="text-2xl font-semibold p-4  text-white">{category.category}</h2>
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
      {Array.isArray(category.tips) && category.tips.slice(0, 1).map((tip, i) => (
        <div key={i} className="border border-gray-200 rounded-lg p-4 flex flex-col items-start">
          <img src={tip.image} alt={tip.title} className="w-full h-48 object-cover rounded-t-lg mb-4" />
          <h3 className="text-xl font-semibold mb-2">{tip.title}</h3>
          <p className=" mb-4">{tip.description}</p>
          <ul className="list-disc pl-5 space-y-2">
            {Array.isArray(tip.actions) && tip.actions.map((action, j) => (
              <li key={j} className="">{action}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    <Link to="/about" className="bg-zinc-900 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-300 transition-colors">
      Read More
    </Link>
  </div>
))}


      </div>
    </div>


      </div>
          
      </div>
      </div>
  
  );
}

export default Home;

