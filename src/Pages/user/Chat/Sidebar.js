import React, { useState, useEffect } from "react";
import "./sidebar.css"; // Ensure you add necessary custom styles in this file
import ChatService from "../../../Services/user/ChatService";
import Cookies from "js-cookie";

function Sidebar() {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const username = Cookies.get("username");

  useEffect(() => {
    if (!username) {
      setError("Username not found in cookies");
      setLoading(false);
      return;
    }

    const fetchFriends = async () => {
      try {
        const response = await ChatService.getListFriend(username);
        setFriends(response.data);
      } catch (error) {
        setError("Không thể tải danh sách bạn bè.");
      } finally {
        setLoading(false);
      }
    };
    fetchFriends();
  }, [username]);

  return (
    <div className="w-1/5" style={{ backgroundColor: '#b8aef3', color: 'black', height: '100vh' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4 p-4" style={{ backgroundColor: '#b8aef3' }}>
        <h2 className="text-lg font-bold">Đoạn chat</h2>
        <div className="flex space-x-2">
          <button className="p-2 hover:bg-gray-300 rounded">
            <i className="fas fa-ellipsis-h"></i>
          </button>
          <button className="p-2 hover:bg-gray-300 rounded">
            <i className="fas fa-pen"></i>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-4 px-4">
        <input
          type="text"
          placeholder="Tìm kiếm trên Messenger"
          className="w-full p-2 rounded bg-white text-gray-800 placeholder-gray-500 focus:outline-none"
        />
      </div>

      {/* Tabs */}
      <div className="flex mb-4">
        <button className="flex-1 p-2 bg-blue-600 rounded-l text-white">Hộp thư</button>
        <button className="flex-1 p-2 bg-gray-200 text-gray-800 rounded-r hover:bg-gray-300">
          Cộng đồng
        </button>
      </div>

      {/* Friends List */}
      <div className="space-y-4 overflow-y-auto h-[calc(100vh-8rem)]">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : friends.length === 0 ? (
          <p>Không có bạn bè nào.</p>
        ) : (
          friends.map((friend, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 p-2 bg-white rounded hover:bg-gray-200"
            >
              <img
                src={friend.friendAvatar || "https://via.placeholder.com/40"}
                alt="avatar"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="text-sm font-semibold text-gray-800">{friend.friendName}</h3>
                <p className="text-xs text-gray-600">{friend.message || "No recent message"}</p>
              </div>
              <span className="ml-auto text-xs text-gray-600">{friend.time || "Just now"}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Sidebar;