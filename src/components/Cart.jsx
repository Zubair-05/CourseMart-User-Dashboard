import React, { useEffect } from 'react'
import { useNavigate, } from 'react-router-dom';
// import { Navigate } from 'react-router-dom';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import { cartState, cartTotal, cartCount } from '../store/course';
import { BASE_URL } from "../../config";


const Cart = () => {
    const token = localStorage.getItem('userToken');
    const Navigate = useNavigate();
    if (!token) {
        return <Navigate to="/login" />;
    }

    const navigate = useNavigate();
    const [cart, setCart] = useRecoilState(cartState);
    const TotalPrice = useRecoilValue(cartTotal);
    const numberOfItems = useRecoilValue(cartCount);

    useEffect(() => {
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
                setCart(data.cart);
            } catch (error) {
                console.log(error);
            }
        };
        fetchCart();
    }, []);

    return (
        <div className="flex flex-col md:flex-row">
            <div className="flex-grow p-4">
                <h1 className="text-2xl font-bold mb-4">Cart</h1>
                <div className="flex flex-col">
                    {cart.length > 0 ? (
                        cart.map((c) => (
                            <Course
                                key={c._id}
                                courseId={c._id}
                                title={c.title}
                                price={c.price}
                                image={c.imageLink}
                                description={c.description}
                            />
                        ))
                    ) : (
                        <p>No courses found.</p>
                    )}
                </div>
            </div>
            <div className="flex-shrink-0 p-4 bg-gray-100 h-fit m-4 rounded-lg md:ml-4 md:w-1/4">
                <h1 className="text-2xl font-bold mb-4">Cart Details</h1>
                <p>Cart total: ${TotalPrice}</p>
                <p>Number of Items in Cart: {numberOfItems}</p>
            </div>
        </div>
    );
};




export default Cart



export const Course = (props) => {
    const navigate = useNavigate();
    const setCart = useSetRecoilState(cartState);

    const handleClick = () => {
        navigate(`/courses/${props.courseId}`, {
            state: {
                title: props.title,
                description: props.description,
                price: props.price,
                imageLink: props.image,
                courseId: props.courseId,
            },
        });
    };

    const handleRemove = async () => {
        const response = await fetch(`http://localhost:3000/users/cart/${props.courseId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
        });
        const data = await response.json();
        console.log(data);
        setCart((oldCart) => {
            return oldCart.filter((c) => c._id !== props.courseId);
        });
    };

    return (
        
        <div className="border border-gray-300 rounded p-4 hover:bg-gray-100 transition-colors cursor-pointer ">

            <div className="flex justify-between">
                {/* Course Details */}
                <div>
                    <h2 className="text-xl font-bold mb-2">{props.title}</h2>
                    <p className="mb-2">{props.description}</p>
                    <p className="mb-2">Price: ${props.price}</p>
                </div>

                {/* Image */}
                <div className="flex justify-end">
                    <img
                        src={props.image}
                        alt="course image"
                        className="w-44 h-auto"
                        style={{ maxHeight: '100px' }}
                    />
                </div>
            </div>

            <div className="flex ">
                <button
                    onClick={handleClick}
                    className="bg-blue-500 text-white py-2 px-4 mt-3 rounded hover:bg-blue-600 transition-colors mr-2"
                >
                    Go To Course
                </button>
                <button
                    onClick={handleRemove}
                    className="bg-blue-500 text-white py-2 px-4 mt-3 rounded hover:bg-blue-600 transition-colors mr-2"
                >
                    Remove from Cart
                </button>

            </div>
        </div>
    );
};
