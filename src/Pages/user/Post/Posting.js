import React, { useState } from 'react';

const PostInput = () => {
  const [textInput, setTextInput] = useState('');

  return (
    <div className="bg-white rounded-lg shadow-lg p-5 w-full max-w-[700px] mx-auto">
      <div className="flex items-center space-x-3">
        <img
          src="https://via.placeholder.com/32"
          alt="Logo"
          className="rounded-full w-10 h-10"
        />
        <p className="text-gray-800 font-semibold">Bạn đang nghĩ gì thế?</p>
      </div>
      <textarea
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
        placeholder="Viết bài viết của bạn ở đây..."
        className="w-full mt-4 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        rows={3}
      />
      <div className="flex justify-between items-center mt-4">
        <div className="flex space-x-4">
          <button className="flex items-center bg-gray-200 p-2 rounded-lg hover:bg-gray-300 transition duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-blue-500"  // Color for the icon
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-4l4.586 4.586a2 2 0 002.828 0l4.586-4.586a2 2 0 00-2.828-2.828l-4.586 4.586m-4-4l4.586 4.586a2 2 0 00-2.828 0L4 12m10-2l4.586 4.586a2 2 0 002.828 0l4.586-4.586a2 2 0 00-2.828-2.828l-4.586 4.586m-4-4l4.586 4.586a2 2 0 002.828 0l4.586-4.586a2 2 0 00-2.828-2.828l-4.586 4.586"
              />
            </svg>
            <span className="ml-2 font-medium">Ảnh</span>
          </button>
          <button className="flex items-center bg-gray-200 p-2 rounded-lg hover:bg-gray-300 transition duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-green-500"  // Color for the icon
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20h-5v-2"
              />
            </svg>
            <span className="ml-2 font-medium">Địa điểm</span>
          </button>
          <button className="flex items-center bg-gray-200 p-2 rounded-lg hover:bg-gray-300 transition duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-purple-500"  // Color for the icon
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="ml-2 font-medium">Gắn thẻ bạn bè</span>
          </button>
        </div>
        <button className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200">
          Share
        </button>
      </div>
    </div>
  );
};

export default PostInput;