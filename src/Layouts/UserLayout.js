import React from "react";
import Header from "../Components/user/header";
import RightSidebar from "../Components/user/rightsidebar";
import TripPlanner from "../Pages/user/Trip/TripPlanner";
import { Outlet } from "react-router-dom";
import LeftSidebar from "../Components/user/leftsidebar";
import PostList from "../Pages/user/Post/PostList";
import Posting from "../Pages/user/Post/Posting";

const UserLayout = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <Header />
      {/* Main Content */}
      <div className="flex justify-center px-4 py-4">
        <div className="w-full max-w-3xl"> {/* Giới hạn chiều rộng của khu vực bài viết */}
          <Outlet />
        </div>
        {/* <RightSidebar /> */}
        <div className="flex flex-col md:flex-row px-4 py-4">
          {/* Left Sidebar (mobile - hidden, desktop - shown) */}
          <div className="w-full md:w-64 mb-4 md:mb-0 hidden md:block">
            <LeftSidebar />
          </div>

          {/* Main Content (Center - Post and PostList) */}
          <div className="flex-grow max-w-3xl mx-4 mb-4">
            <div className="mt-4 mb-6">
              {/* Posting Section */}
              <Posting />
            </div>

            <div>
              {/* Post List Section */}
              <PostList />
            </div>
          </div>

          {/* Right Sidebar (mobile - hidden, desktop - shown) */}
          <div className="w-full md:w-64 mb-4 md:mb-0 hidden md:block">
            <RightSidebar />
          </div>
        </div>
      </div></div>
  )
};

export default UserLayout;
