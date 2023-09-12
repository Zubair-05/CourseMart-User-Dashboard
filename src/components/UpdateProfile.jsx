import React, { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '../store/user';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from "../../config";

function UpdateProfile() {
    const token = localStorage.getItem("userToken");
    const Navigate = useNavigate();
    if (!token) {
        return <Navigate to="/login" />;
    }

    const naviage = useNavigate();
    const userData = useRecoilValue(userState);
    const setUserData = useSetRecoilState(userState);

    const handleSave = async () => {
        try {
            const response = await fetch(`${BASE_URL}/users/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`,
                },
                body: JSON.stringify(userData),
            });
            const data = await response.json();
            console.log('response from the server');
            console.log(data.user);
            naviage('/profile');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold mb-4">Update Profile</h1>
            <label htmlFor="username" className="block mb-1">Username</label>
            <input
                type="text"
                id="username"
                name="username"
                value={userData.username}
                onChange={e => setUserData({ ...userData, username: e.target.value })}
                className="w-full py-2 px-3 mb-4 border rounded-lg outline-none"
            />

            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded cursor-pointer w-full"
                onClick={handleSave}
            >
                Save
            </button>
        </div>

    );
};
export default UpdateProfile;
