import React, { useState } from 'react';
import { FaMapMarkerAlt, FaCalendarAlt, FaStar } from 'react-icons/fa';

const DetailsPlan = () => {
  const [tripTitle, setTripTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ tripTitle, startDate, endDate, description });
    // Clear form fields after submission
    setTripTitle('');
    setStartDate('');
    setEndDate('');
    setDescription('');
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Lên Lịch Trình</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Form Section */}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Tên Chuyến Đi:</label>
            <input
              type="text"
              value={tripTitle}
              onChange={(e) => setTripTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập tên chuyến đi"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Ngày Bắt Đầu:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Ngày Kết Thúc:</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Mô Tả:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập mô tả chuyến đi"
              rows="4"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Lưu Lịch Trình
          </button>
        </form>

        {/* Image and Map Section */}
        <div className="bg-gray-100 rounded-lg shadow-lg p-6 flex flex-col items-center">
          <img
            src="https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcTbhce5XqDBCM4sO_v8BxH8bVxFWpfcbfr8mZSC1QF0HTRcSax7HncxmP-tXw2dH88vS93EKgS7B7y1S6iQYdrZLpULSC9ysiPTaVmkHw" // Replace with your image URL
            alt="Trip"
            className="w-full h-48 object-cover mb-4 rounded-md"
          />
          <div className="flex items-center mb-2">
            <FaMapMarkerAlt className="text-gray-600 mr-2" />
            <span className="text-gray-700">Địa Điểm: Chùa Một Cột</span>
          </div>
          <div className="flex items-center mt-2">
            <FaStar className="text-yellow-500 mr-2" />
            <span className="text-gray-700">Đánh Giá: 4.5 ⭐</span>
          </div>
          
          {/* Google Map Embed */}
          <div className="w-full mt-4">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.9208815567968!2d105.83362029999999!3d21.0358515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135aba1728475ed%3A0xdbe7366fe9dfc2ae!2zQ2jDuWEgTeG7mXQgQ-G7mXQ!5e0!3m2!1svi!2s!4v1735112748941!5m2!1svi!2s"
              width="100%"
              height="200"
              style={{ border: '0' }}
              allowFullScreen=""
              loading="lazy"
              title="Google Map"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPlan;