import React from "react";
import FriendRequestList from "./FriendRequestList";
import FriendTipList from "./FriendTipList";
import "./FriendLayout.css";

const FriendLayout = () => {
  return (
    <div>
      <div className="friend-cards">
        <FriendRequestList />
      </div>
      <div className="mt-4 mb-6">
        <FriendTipList />
      </div>
    </div>
  );
};

export default FriendLayout;
