import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { useRecoilValue } from 'recoil';
import { userState } from '../store/user';
import { BASE_URL } from "../../config";

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
        <div className="hidden sm:flex flex-row">
          {token && (
            <>
              {location.pathname === '/courses' ? (
                <button>
                  <NavLink
                    to="/purchased"
                  >
                    <button className="px-4 py-2 bg-blue-500  text-white rounded hover:bg-blue-600 transition-colors ml-4"
                    >Purchased Courses</button>

                  </NavLink>
                </button>
              ) : (
                <button>
                  <NavLink
                    to="/courses"
                    className="px-4 py-2 bg-blue-500  text-white rounded hover:bg-blue-600 transition-colors ml-4"
                  >
                    All Courses
                  </NavLink>
                </button>
              )}
              <button>
                <NavLink
                  to="/cart"
                  className="px-4 py-2 bg-blue-500  text-white rounded hover:bg-blue-600 transition-colors ml-4"
                >
                  Cart
                </NavLink>
              </button>
              <button
                onClick={() => {
                  window.open(`https://course-mart-admin-dashboard-zubair-05.vercel.app/`, '_blank');
                }}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors ml-4"
              >
                Instructor
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors ml-4"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
