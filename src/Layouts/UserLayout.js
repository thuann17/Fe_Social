import React from "react";
import Header from "../Components/user/header";
import RightSidebar from "../Components/user/rightsidebar";
import PostList from "../Pages/user/Post/PostList";
const UserLayout = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex justify-center px-4 py-4">
        {/* Post List (Center) */}
        <div className="w-full max-w-3xl"> {/* Giới hạn chiều rộng của khu vực bài viết */}
          <PostList />
        </div>

        {/* Right Sidebar */}
        <RightSidebar />
      </div>
    </div>
  );
};

export default UserLayout;