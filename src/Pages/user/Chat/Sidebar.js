import React, { useState, useEffect } from "react";
import "./sidebar.css"; // Ensure you add necessary custom styles in this file
import ChatService from "../../../Services/user/ChatService";
import Cookies from "js-cookie";

function Sidebar() {
  const [friends, setFriends] = useState([]);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("friends"); // "friends" or "groups"
  const username = Cookies.get("username");

  useEffect(() => {
    if (!username) {
      setError("Username not found in cookies");
      setLoading(false);
      return;
    }

    const fetchFriendsAndGroups = async () => {
      try {
        if (activeTab === "friends") {
          setLoading(true);
          const response = await ChatService.getListFriend(username);
          setFriends(response.data);
        } else if (activeTab === "groups") {
          setLoading(true);
          const response = await ChatService.getListGroups(username); // Assuming this endpoint exists
          setGroups(response.data);
        }
      } catch (error) {
        setError("Không thể tải dữ liệu.");
      } finally {
        setLoading(false);
      }
    };

    fetchFriendsAndGroups();
  }, [username, activeTab]);

  return (
    <div
      className="w-1/5"
      style={{ backgroundColor: "#b8aef3", color: "black", height: "100vh" }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between mb-4 p-4"
        style={{ backgroundColor: "#b8aef3" }}
      >
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
          placeholder={`Tìm kiếm ${activeTab === "friends" ? "bạn bè" : "nhóm"}`}
          className="w-full p-2 rounded bg-white text-gray-800 placeholder-gray-500 focus:outline-none"
        />
      </div>

      {/* Tabs */}
      <div className="flex mb-4">
        <button
          onClick={() => setActiveTab("friends")}
          className={`flex-1 p-2 ${
            activeTab === "friends" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
          } rounded-l hover:bg-gray-300`}
        >
          Hộp thư
        </button>
        <button
          onClick={() => setActiveTab("groups")}
          className={`flex-1 p-2 ${
            activeTab === "groups" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
          } rounded-r hover:bg-gray-300`}
        >
          Nhóm
        </button>
      </div>

      {/* Friends or Groups List */}
      <div className="space-y-4 overflow-y-auto h-[calc(90vh-8rem)]">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : activeTab === "friends" ? (
          friends.length === 0 ? (
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
                <span className="ml-auto text-xs text-gray-600">
                  {friend.time || "Just now"}
                </span>
              </div>
            ))
          )
        ) : groups.length === 0 ? (
          <p>Không có nhóm nào.</p>
        ) : (
          groups.map((group, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 p-2 bg-white rounded hover:bg-gray-200"
            >
              <img
                src={group.groupAvatar || "https://via.placeholder.com/40"}
                alt="group avatar"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="text-sm font-semibold text-gray-800">{group.groupName}</h3>
                <p className="text-xs text-gray-600">{group.description || "No description"}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Sidebar;
