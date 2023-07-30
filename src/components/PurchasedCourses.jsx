import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { BASE_URL } from "../../config";

const PurchasedCourse = () => {
  const token = localStorage.getItem('userToken');

  const [purchasedCourse, setPurchasedCourse] = useState([]);
  useEffect(() => {
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
        setPurchasedCourse(data.purchasedCourses);
      } catch (error) {
        console.log(error);
      }
    };

    getPurchasedCourse();
  }, []);




  if (!token) {
    return <Navigate to="/login" />
  }

  return (
    <>

      <div>
        <h1 className='text-4xl font-semibold m-3'>Purchased Courses</h1>

        <div className="mx-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {purchasedCourse.length > 0 ? (
            purchasedCourse.map((c) => (
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
    </>

  )
}

function Course(props) {
  const navigate = useNavigate();

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

  return (
    <div className="border border-gray-300 rounded p-4 hover:bg-gray-100 transition-colors cursor-pointer">
      <h2 className="text-xl font-bold mb-2">{props.title}</h2>
      <p className="mb-2">{props.description}</p>
      <p className="mb-2">Price: ${props.price}</p>
      <div className="flex justify-center">
        <img
          src={props.image}
          alt="course image"
          className="max-w-full mb-2 flex justify-center"
          style={{ height: "auto" }}
        />
      </div>
      <div className="flex justify-center">
        <button
          onClick={handleClick}
          className="bg-blue-500 text-white py-2 px-4 mt-3 rounded hover:bg-blue-600 transition-colors mr-2"
        >
          Go To Course
        </button>

      </div>
    </div>
  );
}


export default PurchasedCourse;