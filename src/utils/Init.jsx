import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { courseState, courseLoaingState } from '../store/course'
import { BASE_URL } from '../../config'

const Init = () => {
    const setCourses = useSetRecoilState(courseState);
    const [loading, setLoading] = useRecoilState(courseLoaingState);
    useEffect(() => {
        setLoading(true);
        const getCourses = async () => {
            try {
                const response = await fetch(`${BASE_URL}/users/courses`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                    },
                });
                const data = await response.json();
                console.log(`response from the server`);
                console.log(data);

                setLoading(false);
                setCourses(data.courses);
            } catch (error) {
                console.log(error);
            }
        };
        getCourses();
    }, []);

    return (
        <div></div>
    )
}

export default Init

