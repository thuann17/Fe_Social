import React from "react"; 
import FriendProfile from "../Pages/user/Profile/FriendProfile"; 

const FriendLayout = () => { 
    return (
        <div>
            {/* Main Center Content (with padding for sidebars) */}
            <div className="flex-grow " style={{ paddingTop: '3px' }}>
                <div> 
                    <FriendProfile />
                </div> 
                <br />
               
            </div>
          </div>
    );
};

export default FriendLayout;