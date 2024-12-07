import React from "react"; 
import Header from "../Components/user/header"; 
import MyProfile from "../Pages/user/Profile/MyProfile"; 
import PostList from "../Pages/user/Post/PostList"; 
import LeftSidebar from "../Components/user/leftsidebar"; 
import RightSidebar from "../Components/user/rightsidebar"; 
import Posting from "../Pages/user/Post/Posting"; 

const MyProfileLayout = () => { 
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
            {/* Right Sidebar */}
            <div className="w-64"> {/* Fixed width for Right Sidebar */}
              <RightSidebar />
            </div>
          </div>
        </div>
    );
};
export default MyProfileLayout;