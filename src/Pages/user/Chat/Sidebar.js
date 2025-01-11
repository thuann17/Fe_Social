import React, { useState, useEffect } from "react";
import "./sidebar.css";
import ChatService from "../../../Services/user/ChatService";
import Cookies from "js-cookie";

function Sidebar({ onSelectFriend, onSelectGroup }) {
  const [friends, setFriends] = useState([]); // Dữ liệu bạn bè
  const [groups, setGroups] = useState([]); // Dữ liệu nhóm
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("friends"); // Tab hiện tại
  const username = Cookies.get("username");

  useEffect(() => {
    if (!username) {
      setError("Không tìm thấy tên người dùng trong cookies");
      setLoading(false);
      return;
    }

    const fetchFriendsAndGroups = async () => {
      try {
        setLoading(true);

        if (activeTab === "friends" && friends.length === 0) {
          const response = await ChatService.getListFriend(username);
          setFriends(response.data);
        } else if (activeTab === "groups" && groups.length === 0) {
          const response = await ChatService.getListGroups(username);
          setGroups(response.data);
        }

      } catch (error) {
        setError("Không thể tải dữ liệu.");
      } finally {
        setLoading(false);
      }
    };

    fetchFriendsAndGroups();
  }, [username, activeTab, friends.length, groups.length]);

  return (
    <div
      className="w-1/5"
      style={{ backgroundColor: "#b8aef3", color: "black", height: "100vh" }}
    >
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
      <div className="mb-4 px-4">
        <input
          type="text"
          placeholder={`Tìm kiếm ${activeTab === "friends" ? "bạn bè" : "nhóm"}`}
          className="w-full p-2 rounded bg-white text-gray-800 placeholder-gray-500 focus:outline-none"
        />
      </div>
      <div className="flex mb-4">
        <button
          onClick={() => setActiveTab("friends")}
          className={`flex-1 p-2 ${activeTab === "friends" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
            } rounded-l hover:bg-gray-300`}
        >
          Hộp thư
        </button>
        <button
          onClick={() => setActiveTab("groups")}
          className={`flex-1 p-2 ${activeTab === "groups" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
            } rounded-r hover:bg-gray-300`}
        >
          Nhóm
        </button>
      </div>
      <div className="space-y-4 overflow-y-auto h-[calc(90vh-8rem)]">
        {loading ? (
          <p>Đang tải...</p>
        ) : error ? (
          <p>{error}</p>
        ) : activeTab === "friends" ? (
          friends.length === 0 ? (
            <p>Không có bạn bè nào.</p>
          ) : (
            friends.map((friend, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-2 bg-white rounded hover:bg-gray-200 cursor-pointer"
                onClick={() => onSelectFriend(friend)}
              >
                <img
                  src={friend.friendAvatar}
                  alt="avatar"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h3 className="text-lm font-semibold text-gray-800">{friend.friendName}</h3>
                  <p className="text-xs text-gray-600">
                    {Array.isArray(friend.message) ? friend.message.length - 1 : 0 || ""}
                    <span className="ml-auto text-xs text-gray-600 ms-5">
                      {friend.time || ""}
                    </span>
                  </p>
                </div>
              </div>
            ))
          )
        ) : groups.length === 0 ? (
          <p>Không có nhóm nào.</p>
        ) : (
          groups.map((group, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 p-2 bg-white rounded hover:bg-gray-200 cursor-pointer"
              onClick={() => onSelectGroup(group)}
            >
              <img
                src={group.groupAvatar || "https://via.placeholder.com/40"}
                alt="group avatar"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="text-sm font-semibold text-gray-800">{group.groupName}</h3>
                <p className="text-xs text-gray-600">{group.description || "Không có mô tả"}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Sidebar;
