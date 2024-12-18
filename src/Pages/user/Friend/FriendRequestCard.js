import React from "react";
import "./FriendList.css";

const FriendRequestCard = ({ 
  name, 
  mutualFriends, 
  image, 
  onAccept, 
  onDelete, 
  acceptText = "Xác nhận", 
}) => {
  return (
    <div className="card">
      {/* Hình ảnh đại diện */}
      <img
        src={image || "https://via.placeholder.com/150"}
        alt={name}
      />

      {/* Tên người dùng */}
      <h3 className="name">{name}</h3>

      {/* Số bạn chung */}
      <p className="mutual">👫 {mutualFriends} bạn chung</p>
      <br />
      {/* Các nút chức năng */}
      <div className="buttons">
        <button onClick={onAccept} className="accept-btn">
          {acceptText}
        </button>
        <button onClick={onDelete} className="delete-btn">
          Xóa
        </button>
      </div>
    </div>
  );
};

export default FriendRequestCard;
