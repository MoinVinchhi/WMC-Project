import React, { useState, useEffect } from 'react';
import { useAuth } from '../../creatContext';
import { RiEye2Fill, RiEyeCloseFill } from "react-icons/ri";

const ProfilePage = () => {
  const [userData, setUserData] = useAuth();
  const [auth] = useAuth();
  const [edit, setEdit] = useState(true);
  const [showPassword, setShowPassword] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    gender: '',
    phone: '',
    password: '',
    image: ''
  });

  const handleEditToggle = () => {
    if (edit) {
      setFormData({
        name: userData.name,
        dob: userData.dob || '',
        gender: userData.gender || '',
        phone: userData.phone || '',
        password: userData.password || '',
        image: userData.image || '',
      });
    }
    setEdit(!edit);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:5000/updateuser/${auth.email}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedData = await response.json();
      setUserData(updatedData);
      setEdit(false);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  if (!userData) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-yellow-500"></div>
      </div>
    );
  }

  const cursorStyle = edit ? 'cursor-text border-gray-300' : 'cursor-not-allowed';
  const textColor = edit ? 'text-white' : 'text-gray-100';

  return (
    <div className='profileContainer relative flex justify-end p-10 min-h-screen overflow-hidden'>
        <div className='fixed z-[5] left-0 top-30 flex flex-col p-16'>
          <h1 className='sideText  text-6xl text-left text-white m-0 p-0 select-none'>Profile</h1>
        </div>
      <div className='h-screen p-8'>
        <div className="mr-96 border profilePart flex flex-col max-w-screen-md m-auto h-auto bg-gray-800 text-white rounded-lg p-6 relative">
              <img
                className="h-80 my-6 rounded-full object-cover"
                src={auth.image}
                alt='profile picture'
              />
            <h4 className='text-xl m-auto mb-4'>Username: {auth.username}</h4>
            <h4 className='text-xl m-auto'>Email: {auth.email}</h4>
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

export default ProfilePage;
