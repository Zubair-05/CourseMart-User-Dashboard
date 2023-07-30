import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { cartState } from '../store/course';
import { BASE_URL } from "../../config";

const CourseDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const course = {
    title: location.state.title,
    description: location.state.description,
    price: location.state.price,
    imageLink: location.state.imageLink,
    id: location.state.courseId,
  };

  const cart = useRecoilValue(cartState);
  console.log(cart);
  const handleBuyNow = async () => {
    const response = await fetch(`${BASE_URL}/users/courses/${course.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });
    const data = await response.json();
    console.log(data);
    navigate('/purchased')
  }

  const handleAddToCart = async () => {
    const response = await fetch(`${BASE_URL}/users/cart/${course.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });
    const data = await response.json();
    console.log(data);
    navigate('/cart')
  }


  return (
    <>

      <div className="flex flex-col md:flex-row m-5">
        <div className="md:w-2/3 md:pr-8 ">
          {/* Course details */}
          <h1 className=" text-5xl font-semibold  my-6">
            {course.title}
          </h1>
          {course.imageLink && (
            <div className='flex justify-center items-center'>
              <img
                src={course.imageLink}
                alt="Course"
                width="600"
                height="400"
                className=" max-w-full h-auto mb-4"
              />
            </div>
          )}
          <p className="mb-2 font-bold text-2xl">Price: ${course.price}</p>
          <p className="mb-2">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex iusto, illum totam debitis iste voluptatum, fugit, exercitationem esse nisi at deserunt distinctio consectetur delectus odit vero. Deleniti eos reiciendis tempore! Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa omnis qui consequuntur rerum libero, ad ex nesciunt amet architecto beatae, atque laudantium facilis quae odit suscipit eveniet, dignissimos quos? Natus laborum impedit consectetur non totam cumque vitae necessitatibus, nisi temporibus asperiores eveniet explicabo veritatis quos, aperiam odio rerum. Quasi, amet!</p>
          <p className="mb-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat exercitationem provident incidunt, consequatur fugit harum! Illum officia deleniti non corporis ex. Voluptates, quos. Unde, modi. Architecto quia repudiandae voluptates illo assumenda. Atque, veniam. Cum sit eius iusto consectetur pariatur ut, veniam qui id voluptas aspernatur quisquam, nostrum quis consequatur hic facilis minus doloremque quas quidem, laboriosam quos voluptatem minima! Quas soluta voluptatibus earum dicta distinctio et cumque nihil iure culpa delectus. Consectetur dolor ea neque?
          </p>
        </div>
        <div className="md:w-1/3 md:pl-8">
          {/* Purchase details */}
          <div className="bg-gray-100 p-4 mb-4">
            <h2 className="text-lg font-semibold mb-2">Purchase Details</h2>
            <p className="mb-2">{course.title}</p>
            <p className="mb-2">Price: ${course.price}</p>
            <button
              onClick={handleAddToCart}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors mr-2">
              {cart.some((item) => item._id === course.id)  ? "Added to cart" : "Add to cart"}
            </button>
            <button
              onClick={handleBuyNow}
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors">
              Buy Now
            </button>
          </div>
        </div>
      </div>

    </>
  );
}

export default CourseDetails;


