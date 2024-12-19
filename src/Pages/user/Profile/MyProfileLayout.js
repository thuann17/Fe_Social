import React from "react";
import Header from "../../../Components/user/header";
import MyProfile from "./MyProfile";
import PostList from "../Post/PostList";
import LeftSidebar from "../../../Components/user/leftsidebar";
import RightSidebar from "../../../Components/user/rightsidebar";
import Posting from "../Post/Posting";

const MyProfileLayout = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Main Content */}
      <div className="flex flex-col md:flex-row px-4 py-4">
        {/* Post List (Center) */}
        <div className="flex-grow max-w-3xl mx-4 mb-4">
          <div>
            <Posting />
          </div>
          <div className="mt-2"> {/* Add margin-top to PostList for spacing */}
            <PostList />
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyProfileLayout;
