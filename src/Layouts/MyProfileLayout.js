import React from "react"; 
import Header from "../Components/user/header"; 
import MyProfile from "../Pages/user/Profile/MyProfile"; 
import PostList from "../Pages/user/Post/PostList"; 
import Posting from "../Pages/user/Post/Posting"; 

const MyProfileLayout = () => { 
    return (
        <div>
            {/* Main Center Content (with padding for sidebars) */}
            <div className="flex-grow " style={{ paddingTop: '3px' }}>
                <div> 
                    <MyProfile />
                </div> 
                <br />
                
                <div> 
                    <PostList />
                </div>
            </div>
          </div>
    );
};

export default MyProfileLayout;