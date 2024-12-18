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
          {/* Header */}
          <Header />
    
          {/* Main Content */}
          <div className="flex flex-col md:flex-row px-4 py-4">
            {/* Left Sidebar (mobile - hidden, desktop - shown) */}
            <div className="w-full md:w-64 mb-4 md:mb-0 hidden md:block"> 
              <LeftSidebar />
            </div>
    
            {/* Post List (Center) */}
            <div className="flex-grow max-w-3xl mx-4 mb-4">
                <div className="mt-12 mb-2"> {/* Add margin to push MyProfile down and margin-bottom for spacing */}
                    <MyProfile />
                </div>
                <div>
                    <Posting />
                </div>
                <div className="mt-2"> {/* Add margin-top to PostList for spacing */}
                    <PostList />
                </div>
            </div>
    
            {/* Right Sidebar (mobile - hidden, desktop - shown) */}
            <div className="w-full md:w-64 mb-4 md:mb-0 hidden md:block"> 
              <RightSidebar />
            </div>
          </div>
        </div>
    );
};
export default MyProfileLayout;
