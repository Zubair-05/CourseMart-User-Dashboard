import React, {useEffect} from 'react'
import {  useRecoilState, useSetRecoilState } from 'recoil';
import { purchasedCourseState, purchasedloadingState } from '../store/course';
import { BASE_URL } from "../../config";
const InitPurchased = () => {
    const [purchasedCourse, setPurchasedCourse] = useRecoilState(purchasedCourseState);
    const setLoading = useSetRecoilState(purchasedloadingState);
    useEffect(() => {
        setLoading(true);
        const getPurchasedCourse = async () => {
            try {
                const response = await fetch(`${BASE_URL}/users/purchasedCourses`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('userToken')}`
                    }
                });
                const data = await response.json();
                console.log(`response from the server`);
                console.log(data);
                setTimeout(() => {
                    setLoading(false);
                    setPurchasedCourse(data.purchasedCourses);
                }, 2000)
            } catch (error) {
                console.log(error);
            }
        };

        getPurchasedCourse();
    }, []);
    return (
        <div></div>
    )
}

export default InitPurchased