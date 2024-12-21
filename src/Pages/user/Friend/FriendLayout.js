import React from "react";
import Header from "../../../Components/user/header";
import RightSidebar from "../../../Components/user/rightsidebar";
import LeftSidebar from "../../../Components/user/leftsidebar";
import FriendRequestList from "./FriendRequestList";
import FriendTipList from "./FriendTipList";
import "./FriendLayout.css";

const FriendLayout = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex flex-col md:flex-row px-4 py-4">
        {/* Left Sidebar (mobile - hidden, desktop - shown) */}
        <div className="w-full md:w-64 mb-4 md:mb-0 hidden md:block">
          <LeftSidebar />
        </div>

        {/* Main Content (Center - Post and PostList) */}
        <div className="flex-grow mx-4 mb-4">
          <div className="mt-4 mb-6">
            {/* FriendList */}
            <FriendRequestList />
          </div>

          <div className="mt-4 mb-6">
            {/* FriendTipList */}
            <FriendTipList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendLayout;
