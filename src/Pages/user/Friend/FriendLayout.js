import React from "react";
import FriendRequestList from "./FriendRequestList";
import FriendTipList from "./FriendTipList";
import FriendList from "./FriendList";
import "./FriendLayout.css";
import { ToastContainer } from "react-toastify";


const FriendLayout = () => {
  return (
    <div>
       <div className="mt-4 mb-6">
        <FriendList />
      </div>
      <div className="mt-4 mb-6">
        <ToastContainer />
        <FriendRequestList />
      </div>
      <div className="mt-4 mb-6">
        <FriendTipList />
      </div>
    </div>
  );
};

export default FriendLayout;
