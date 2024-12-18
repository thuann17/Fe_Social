import React from "react";
import Header from "../Components/user/header";
import RightSidebar from "../Components/user/rightsidebar";
import TripPlanner from "../Pages/user/Trip/TripPlanner";
import { Outlet } from "react-router-dom";
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

        {/* Right Sidebar */}
        {/* <RightSidebar /> */}
      </div>
    </div>
  );
};

export default UserLayout;