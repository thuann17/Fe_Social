import React from "react"; 
import Header from "../Components/user/header"; 
import MyProfile from "../Pages/user/Profile/MyProfile"; 
import PostList from "../Pages/user/Post/PostList"; 
import LeftSidebar from "../Components/user/leftsidebar"; 
import RightSidebar from "../Components/user/rightsidebar"; 
import Posting from "../Pages/user/Post/Posting"; 

const MyProfileLayout = () => { 
    const gradientAnimation = {
        animation: "gradientAnimation 5s ease infinite",
        background: "linear-gradient(to right, #e0c3fc, #8ec5fc)",
        backgroundSize: "400% 400%",
        minHeight: "100vh", // Ensure full height
    };

    return (
        <div style={gradientAnimation}>
          {/* Header */}
          <Header />
    
          {/* Main Content */}
          <div className="flex flex-col md:flex-row px-4 py-4">
            {/* Left Sidebar (fixed on desktop) */}
            <div className="w-full md:w-64 hidden bg-white md:block fixed h-full">
              <LeftSidebar />
            </div>
    
            {/* Right Sidebar (fixed on desktop) */}
            <div className="w-full md:w-64 hidden md:block fixed right-0 h-full">
              <RightSidebar />
            </div>

            {/* Main Center Content (with padding for sidebars) */}
            <div className="flex-grow md:ml-64 md:mr-64 overflow-auto" style={{ paddingTop: '72px' }}>
                <div className="mt-1 mb-3"> {/* Add margin to push MyProfile down and margin-bottom for spacing */}
                    <MyProfile />
                </div>
                <div>
                    <Posting />
                </div>
                <div className="mt-2"> {/* Add margin-top to PostList for spacing */}
                    <PostList />
                </div>
            </div>
          </div>

          {/* Inline Keyframes for Animation */}
          <style>
            {`
              @keyframes gradientAnimation {
                0% { background: linear-gradient(to right, #e0c3fc, #8ec5fc); }
                25% { background-color: #8ec5fc; }
                50% { background: linear-gradient(to right, #8ec5fc, #e0c3fc); }
                75% { background-color: #fc8ec5; }
                100% { background: linear-gradient(to right, #e0c3fc, #8ec5fc); }
              }
            `}
          </style>
        </div>
    );
};

export default MyProfileLayout;