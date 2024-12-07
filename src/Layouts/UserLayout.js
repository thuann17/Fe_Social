import React from "react";
import Header from "../Components/user/header";
import RightSidebar from "../Components/user/rightsidebar";
import LeftSidebar from "../Components/user/leftsidebar"; // Ensure import is correct
import PostList from "../Pages/user/Post/PostList";

const UserLayout = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex justify-between px-4 py-4">
        {/* Left Sidebar */}
        <div className="w-64"> {/* Fixed width for Left Sidebar */}
          <LeftSidebar />
        </div>

        {/* Post List (Center) */}
        <div className="flex-grow max-w-3xl mx-4"> {/* Center area for posts */}
          <PostList />
        </div>

        {/* Right Sidebar */}
        <div className="w-64"> {/* Fixed width for Right Sidebar */}
          <RightSidebar />
        </div>
      </div>
    </div>
  );
};

export default UserLayout;