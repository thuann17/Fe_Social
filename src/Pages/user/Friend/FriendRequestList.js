import React, { useState } from "react";
import FriendRequestCard from "./FriendRequestCard";
import "./FriendList.css";

const FriendRequestList = () => {
  const [requests, setRequests] = useState([
    { id: 1, name: "Đinh Kết", mutualFriends: 4, image: "" },
    { id: 2, name: "Triệu Mẫn", mutualFriends: 3, image: "" },
    { id: 3, name: "Mint Mint", mutualFriends: 5, image: "" },
  ]);

  const handleAccept = (id) => {
    alert(`Đã xác nhận lời mời kết bạn với ID: ${id}`);
  };

  const handleDelete = (id) => {
    setRequests(requests.filter(request => request.id !== id));
  };

  return (
    <div className="friend-request-container">
      <h2 className="friend-request-title">Lời mời kết bạn:</h2>
      <div className="friend-request-list">
        {requests.map(request => (
          <FriendRequestCard
            key={request.id}
            name={request.name}
            mutualFriends={request.mutualFriends}
            image={request.image}
            onAccept={() => handleAccept(request.id)}
            onDelete={() => handleDelete(request.id)}
            acceptText="Xác nhận" // Tùy chỉnh button text
          />
        ))}
      </div>
    </div>
  );
};

export default FriendRequestList;
