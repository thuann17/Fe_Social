import React, { useState } from "react";
import Header from "../Components/user/header";
import RightSidebar from "../Components/user/rightsidebar";
import LeftSidebar from "../Components/user/leftsidebar";
import { Outlet } from "react-router-dom";
import Chatbox from "../Pages/user/Chat/Chatbox";
import { ToastContainer } from "react-toastify";

const UserLayout = () => {
  const [activeChat, setActiveChat] = useState(null); // Người bạn được chọn
  const [isChatOpen, setIsChatOpen] = useState(false); // Trạng thái mở/đóng chatbox

  const onSelectFriend = (friend) => {
    setActiveChat(friend); // Lưu người bạn đã chọn
    setIsChatOpen(true); // Mở chatbox
  };

  const toggleChatbox = () => {
    setIsChatOpen((prev) => !prev); // Toggle chatbox
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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

        <div className="w-64 hidden lg:block fixed right-0 top-0 pt-16 h-screen overflow-auto bg-white shadow-md">
          <RightSidebar onSelectFriend={onSelectFriend} />
        </div>
      </div>

      {isChatOpen && activeChat && (
        <div className="fixed bottom-0 right-4 z-60">
          <Chatbox chat={activeChat} onClose={toggleChatbox} />
        </div>
      )}
    </div>
  );
};

export default UserLayout;
