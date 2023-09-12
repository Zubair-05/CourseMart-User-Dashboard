import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { useRecoilValue } from 'recoil';
import { userState } from '../store/user';
import { BASE_URL } from "../../config";
import Menu from './Menu.jsx';
import Sidebar from './Sidebar.jsx';
import Searchbar from './Searchbar.jsx';
import { BsSearch } from 'react-icons/bs'
// import { react } from '@vitejs/plugin-react';
const Navbar = () => {
  const token = localStorage.getItem('userToken');
  const navigate = useNavigate();
  const location = useLocation();

  const userData = useRecoilValue(userState);
  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/');
  };

  return (
    <nav className="flex items-center justify-between bg-gray-800 text-white py-4 px-6">
      <div className="flex items-center">
        <NavLink to="/" className="text-3xl font-bold">
          CourseMart
        </NavLink>
      </div>
      <div className="flex items-center">

        {token && (
          <>
            <div className='flex w-full'>
              <Searchbar />
            </div>
            <div className='flex sm:hidden'>
              <Sidebar />
            </div>
            <div className='hidden sm:flex'>
              <Menu />
            </div>
          </>
        )}

      </div>
    </nav>
  );
};

export default Navbar;
