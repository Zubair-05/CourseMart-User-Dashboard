import React, { useEffect } from 'react';
import { Navigate, NavLink } from 'react-router-dom';
import profileImage from '../assets/images/profileImage.jpeg';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userState, userSelector } from '../store/user';
import { BASE_URL } from "../../config";

function Profile() {
  const token = localStorage.getItem('userToken');
  if (!token) {
    return <Navigate to="/login" />;
  }

  const [userData, setUserData] = useRecoilState(userState);
  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/users/profile`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        });
        const data = await response.json();
        console.log('response from the server');
        console.log(data.user);
        setUserData(data.user);
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, []);

  const user = useRecoilValue(userSelector);
  console.log(user);

  return (
    <div className="container mx-auto flex flex-col justify-center">
      <div className="flex justify-center items-center my-8">
        <div className="flex items-center bg-white rounded-lg shadow-lg p-4">
          <div className="mr-6">
            <img src={profileImage} alt="Profile" className="w-24 h-24 rounded-full" />
          </div>
          <div>
            <h1 className="text-3xl font-semibold">{userData.username}</h1>
            <h2 className="text-xl text-gray-600">{userData.email}</h2>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <NavLink
          to="/update-profile" // Set the path of the "Update Profile" page
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Update Profile
        </NavLink>
      </div>
    </div>
  );
}

export default Profile;
