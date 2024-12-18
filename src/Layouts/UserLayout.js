import React from "react";
import Header from "../Components/user/header";
import RightSidebar from "../Components/user/rightsidebar";
import LeftSidebar from "../Components/user/leftsidebar";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="flex px-4 py-4 relative">
        <div className="w-64 hidden md:block fixed left-0 top-0 pt-16 h-screen overflow-auto bg-white shadow-md">
          <LeftSidebar />
        </div>
        <div className="flex-grow max-w-3xl mx-auto mt-16">
          <div className="mb-6">
            <Outlet></Outlet>
          </div>
        </div>
        <div className="w-64 hidden md:block fixed right-0 top-0 pt-16 h-screen overflow-auto bg-white shadow-md">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
