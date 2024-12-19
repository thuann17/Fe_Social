import React from "react";
import Header from "../Components/user/header";
import RightSidebar from "../Components/user/rightsidebar";
import LeftSidebar from "../Components/user/leftsidebar";
import PostList from "../Pages/user/Post/PostList";
import Posting from "../Pages/user/Post/Posting";

const UserLayout = () => {
  const animatedBackgroundStyle = {
    background: "linear-gradient(to right, #e0c3fc, #8ec5fc)",
    animation: "gradientAnimation 8s ease infinite",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  };

  // Keyframes for the gradient animation
  const keyframes = `
    @keyframes gradientAnimation {
      0% { background: linear-gradient(to right, #e0c3fc, #8ec5fc); }
      25% { background-color: #8ec5fc; }
      50% { background: linear-gradient(to right, #8ec5fc, #e0c3fc); }
      75% { background-color: #fc8ec5; }
      100% { background: linear-gradient(to right, #e0c3fc, #8ec5fc); }
    }
  `;

  const styleTag = document.createElement("style");
  styleTag.innerHTML = keyframes;
  document.head.appendChild(styleTag);

  return (
    <div style={animatedBackgroundStyle}>
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar (visible only on desktop) */}
        <div className="hidden md:block w-64 bg-white shadow-md fixed h-full">
          <LeftSidebar />
        </div>

        {/* Center Content */}
        <div className="flex-grow mx-4 md:mx-0 md:ml-64 md:mr-64 overflow-auto">
          <div className="mt-4 mb-6">
            {/* Posting Section */}
            <Posting />
          </div>

          <div>
            {/* Post List Section */}
            <PostList />
          </div>
        </div>

        {/* Right Sidebar (visible only on desktop) */}
        <div className="hidden md:block w-64 bg-white shadow-md fixed h-full right-0">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
};

export default UserLayout;