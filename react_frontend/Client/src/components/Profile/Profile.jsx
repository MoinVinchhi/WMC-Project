import React, { useState, useEffect } from 'react';
import { useAuth } from '../../creatContext';
import { RiEye2Fill, RiEyeCloseFill } from "react-icons/ri";

const ProfilePage = () => {
  const [userData, setUserData] = useAuth();
  const [auth] = useAuth();
  const [edit, setEdit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    gender: '',
    phone: '',
    password: '',
    image: ''
  });

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

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

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (auth.email) {
  //       try {
  //         const response = await fetch(`http://localhost:5000/getalluser/${auth.email}`, {
  //           method: 'GET',
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //         });

  //         if (!response.ok) {
  //           throw new Error(`HTTP error! status: ${response.status}`);
  //         }

  //         const data = await response.json();
  //         setUserData(data);
          
  //       } catch (error) {
  //         console.error('Error fetching user data:', error);
  //       }
  //     }
  //   };

  //   fetchData();
  // }, [auth.email]);

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
    <div className='profileContainer relative flex justify-end p-10 min-h-screen'>
        <div className='fixed z-[5] left-0 top-30 flex flex-col p-16'>
          <h1 className='sideText  text-6xl text-left text-white m-0 p-0 select-none'>Profile</h1>
        </div>
      <div className='h-screen p-8'>
        <div className=" profilePart max-w-screen-md m-auto h-auto bg-gray-800 text-white rounded-lg p-6 flex relative">
            <div className="flex flex-col items-center">
              <img
                className="h-80 rounded-lg object-cover"
                src={formData.image}
                alt='profile picture'
              />
              <div className="mt-4 flex flex-col gap-4">
                <button
                  className="bg-yellow-500 text-gray-900 font-semibold py-1 px-2 rounded-lg mr-2"
                  onClick={() => edit && setFormData({ ...formData, image: 'new_image_url' })}
                  disabled={!edit}
                >
                  Change
                </button>
                <button
                  className="bg-gray-600 text-white font-semibold py-1 px-2 rounded-lg"
                  onClick={() => edit && setFormData({ ...formData, image: '' })}
                  disabled={!edit}
                >
                  Remove
                </button>
              </div>
            </div>

            <div className='px-16'>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-1 gap-4">
                <div>
                  <label className={`block text-gray-500 ${textColor}`}>Display Name</label>
                  <input
                    className={`w-full mt-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-500 ${cursorStyle}`}
                    type="text"
                    name="name"
                    placeholder={userData.name}
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!edit}
                  />
                </div>
                <div>
                  <label className={`block text-gray-500 ${textColor}`}>Date of Birth</label>
                  <input
                    className={`w-full mt-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-500 ${cursorStyle}`}
                    type="text"
                    name="dob"
                    placeholder={userData.dob || 'Not added yet!'}
                    value={formData.dob}
                    onChange={handleChange}
                    disabled={!edit}
                  />
                </div>
                <div>
                  <label className={`block text-gray-500 ${textColor}`}>Gender</label>
                  <div className="mt-1 flex items-center space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        className="form-radio text-yellow-500"
                        name="gender"
                        value="male"
                        checked={formData.gender === 'male'}
                        onChange={handleChange}
                        disabled={!edit}
                      />
                      <span className="ml-2">Male</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        className="form-radio text-yellow-500"
                        name="gender"
                        value="female"
                        checked={formData.gender === 'female'}
                        onChange={handleChange}
                        disabled={!edit}
                      />
                      <span className="ml-2">Female</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        className="form-radio text-yellow-500"
                        name="gender"
                        value="other"
                        checked={formData.gender === 'other'}
                        onChange={handleChange}
                        disabled={!edit}
                      />
                      <span className="ml-2">Other</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className={`block text-gray-500 ${textColor}`}>Phone Number</label>
                  <input
                    className={`w-full mt-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-500 ${cursorStyle}`}
                    type="text"
                    name="phone"
                    placeholder={userData.phone || 'Not added yet!'}
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!edit}
                  />
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-xl text-gray-300 mb-4">Password</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white">Current Password</label>
                    <input
                      className="w-full mt-1 px-4 py-2 bg-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500"
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      placeholder="********"
                      value={formData.password}
                      onChange={handleChange}
                      disabled={!edit}
                    />
                  </div>
                  <div>
                    <label className={`block text-gray-500 ${textColor}`}>Change Password</label>
                    <input
                      className={`w-full mt-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-500 ${cursorStyle}`}
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      placeholder="********"
                      value={formData.password}
                      onChange={handleChange}
                      disabled={!edit}
                    />
                    <button
                      type="button"
                      onClick={handleShowPassword}
                      className={`border w-7 rounded mt-4 p-1 ${!edit && 'cursor-not-allowed'}`}
                      disabled={!edit}
                    >
                      {showPassword ? <RiEye2Fill /> : <RiEyeCloseFill />}
                    </button>
                  </div>
                </div>
              </div>

              {edit && (
                <div className='mt-8'>
                  <button
                    className='bg-blue-500 text-gray-900 font-semibold py-2 px-4 rounded-lg mr-2'
                    onClick={handleSave}
                  >
                    Save
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center justify-center mt-4">
              <button
                onClick={handleEditToggle}
                className={`m-auto w-30 py-2 px-4 rounded ${edit ? 'bg-red-500 hover:bg-red-600' : 'bg-yellow-500 hover:bg-yellow-600'}`}
              >
                {edit ? 'Cancel' : 'Edit'}
              </button>
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
    </div>
  );
};

export default ProfilePage;
