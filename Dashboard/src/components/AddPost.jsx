import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../redux/actions/postActions";

const AddPost = () => {
  const [postData, setPostData] = useState({
    id: "",
    name: "",
    description: "",
    location: "",
    price: "",
    images: "",
    video: "",
    thumbnail: "",
    approve: false,
    booking_duration: "",
    daily_booking: "",
    payment: false,
    availability: false,
    room_types: {},
  });

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addPost(postData));
    setPostData({
      id: "",
      name: "",
      description: "",
      location: "",
      price: "",
      images: "",
      video: "",
      thumbnail: "",
      approve: false,
      booking_duration: "",
      daily_booking: "",
      payment: false,
      availability: false,
      room_types: {},
    }); // إعادة تعيين الحقول
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPostData({
      ...postData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
       
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={postData.name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={postData.description}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={postData.location}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="price"
          placeholder="Price"
          value={postData.price}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="images"
          placeholder="Images URL"
          value={postData.images}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="video"
          placeholder="Video URL"
          value={postData.video}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="thumbnail"
          placeholder="Thumbnail URL"
          value={postData.thumbnail}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="approve"
            checked={postData.approve}
            onChange={handleChange}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span>Approve</span>
        </label>
        <input
          type="text"
          name="booking_duration"
          placeholder="Booking Duration"
          value={postData.booking_duration}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="daily_booking"
          placeholder="Daily Booking"
          value={postData.daily_booking}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="payment"
            checked={postData.payment}
            onChange={handleChange}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span>Payment</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="availability"
            checked={postData.availability}
            onChange={handleChange}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span>Availability</span>
        </label>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Add Post
        </button>
      </form>
    </div>
  );
};

export default AddPost;
