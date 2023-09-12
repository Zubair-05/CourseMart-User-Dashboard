import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config";
import CourseSkeleton from "../utils/CourseSkeleton";
import { courseState, courseLoaingState } from "../store/course";
import { useRecoilState, useRecoilValue } from "recoil";

function ShowCourses() {
    
    const navigate = useNavigate();
    const courses = useRecoilValue(courseState);
    const isLoading = useRecoilValue(courseLoaingState);
    const userToken = localStorage.getItem("userToken");
    if (!userToken) {
        navigate("/");
        return;
    }



    if (isLoading) {
        return <CourseSkeleton />;
    }

    return (
        <>

            <div className="container mx-auto">
                <h1 className="text-3xl font-semibold text-center my-6">
                    Unleash Your Knowledge
                </h1>

                <div className="mx-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.length > 0 ? (
                        courses.map((c) => (
                            <Course
                                key={c._id}
                                courseId={c._id}
                                title={c.title}
                                price={c.price}
                                image={c.imageLink}
                                description={c.description}
                                // onCourseDelete={handleCourseDelete}
                            />
                        ))
                    ) : (
                        <p>No courses found.</p>
                    ) }
                </div>
            </div>

        </>

    );
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
        <div className="border border-gray-300  rounded p-4 hover:bg-gray-100 transition-colors cursor-pointer">
            <h2 className="text-xl font-bold mb-2">{props.title}</h2>
            <p className="mb-2">{props.description}</p>
            <p className="mb-2">Price: ${props.price}</p>
            <div className="flex justify-center">
                <img
                    src={props.image}
                    alt="course image"
                    className="max-w-full mb-2 flex justify-center"
                    style={{ height: "200px" }}
                />
            </div>
            <div className="flex justify-center">
                <button
                    onClick={handleClick}
                    className="bg-blue-500 text-white py-2 px-4 mt-3 rounded hover:bg-blue-600 transition-colors mr-2"
                >
                    View Course
                </button>

            </div>
        </div>
    );
}

export default ShowCourses;