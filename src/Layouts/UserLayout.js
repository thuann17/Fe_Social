import React, { useState } from "react";
import Header from "../Components/user/header";
import RightSidebar from "../Components/user/rightsidebar";
import LeftSidebar from "../Components/user/leftsidebar";
import { Outlet } from "react-router-dom";
import Chatbox from "../Pages/user/Chat/Chatbox";
import { toast, ToastContainer } from "react-toastify";

const UserLayout = () => {
  const [activeChat, setActiveChat] = useState({
    name: "Rey Jhon",
    message: "Hey there! Are you fini...",
    time: "just now",
  });

  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChatbox = () => {
    setIsChatOpen((prev) => !prev);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <ToastContainer/>
      <Header />
      <div className="flex px-4 py-4 relative">
        <div className="w-64 hidden lg:block fixed left-0 top-0 pt-16 h-screen overflow-auto bg-white shadow-md">
          <LeftSidebar />
        </div>

        <div className="flex-grow max-w-3xl mx-auto mt-2">
          <div className="mb-6">
            <Outlet />
          </div>
        </div>

        {/* Right Sidebar - Hidden on mobile devices */}
        <div className="w-64 hidden lg:block fixed right-0 top-0 pt-16 h-screen overflow-auto bg-white shadow-md">
          <RightSidebar />

          <div className="fixed bottom-0 right-4 z-60">
            <Chatbox chat={activeChat} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
