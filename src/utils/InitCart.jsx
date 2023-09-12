import React from 'react'
import { cartState, cartLoadingState } from '../store/course';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { BASE_URL } from "../../config";
import { useEffect } from 'react';
const InitCart = () => {
    const setCart = useSetRecoilState(cartState);
    const [loading, setLoading] = useRecoilState(cartLoadingState);
    useEffect(() => {
        setLoading(true);
        const fetchCart = async () => {
            try {
                const response = await fetch(`${BASE_URL}/users/cart`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
                    },
                });
                const data = await response.json();
                console.log('response from the server');
                console.log(data.cart);
                setTimeout(() => {
                    setLoading(false);
                    setCart(data.cart);
                }, 2000)
            } catch (error) {
                console.log(error);
            }
        };
        fetchCart();
    }, []);
  return (
    <div></div>
  )
}

export default InitCart