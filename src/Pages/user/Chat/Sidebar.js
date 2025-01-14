import React, { useState, useEffect } from "react";
import "./sidebar.css";
import ChatService from "../../../Services/user/ChatService";
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';  // Import useNavigate

function Sidebar({ onSelectFriend }) {
  const [friends, setFriends] = useState([]); // Dữ liệu bạn bè
  const [filteredFriends, setFilteredFriends] = useState([]); // Dữ liệu bạn bè đã lọc
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // Lưu trữ từ khóa tìm kiếm
  const username = Cookies.get("username");
  const navigate = useNavigate(); // Khai báo hook useNavigate

  useEffect(() => {
    if (!username) {
      setError("Không tìm thấy tên người dùng trong cookies");
      setLoading(false);
      return;
    }

    const fetchFriends = async () => {
      try {
        setLoading(true);

        if (friends.length === 0) {
          const response = await ChatService.getListFriend(username);
          setFriends(response.data);
          setFilteredFriends(response.data); // Khi tải xong, thiết lập danh sách bạn bè chưa lọc

          // Tự động chọn người bạn đầu tiên sau khi tải xong bạn bè
          if (response.data && response.data.length > 0) {
            onSelectFriend(response.data[0]);
          }
        }

      } catch (error) {
        setError("Không thể tải dữ liệu.");
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, [username, friends.length, onSelectFriend]);

  useEffect(() => {
    if (searchQuery) {
      // Lọc bạn bè dựa trên từ khóa tìm kiếm
      setFilteredFriends(
        friends.filter(friend =>
          friend.friendName.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredFriends(friends); // Nếu không có từ khóa, hiển thị tất cả bạn bè
    }
  }, [searchQuery, friends]);

  const handleGoBack = () => {
    navigate(-1); // Quay lại trang trước
  };

  return (
    <div
      className="w-1/5"
      style={{ backgroundColor: "#b8aef3", color: "black", height: "100vh" }}
    >
      <div
        className="flex items-center justify-between mb-4 p-4"
        style={{ backgroundColor: "#b8aef3" }}
      >
        <button className="p-2 hover:bg-gray-300 rounded" onClick={handleGoBack}>
          <p className="text-lg">⬅</p>
        </button>
        <h2 className="text-lg me-10 text-center font-bold">Đoạn chat</h2>
      </div>
      <div className="mb-4 px-4">
        <input
          type="text"
          placeholder="Tìm kiếm bạn bè"
          className="w-full p-2 rounded bg-white text-gray-800 placeholder-gray-500 focus:outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Cập nhật giá trị tìm kiếm
        />
      </div>
      <div className="overflow-y-auto h-[calc(90vh-8rem)]">
        {loading ? (
          <p>Đang tải...</p>
        ) : error ? (
          <p>{error}</p>
        ) : filteredFriends.length === 0 ? (
          <p>Không có bạn bè nào.</p>
        ) : (
          filteredFriends.map((friend, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 p-2 bg-white rounded hover:bg-gray-200 cursor-pointer border-solid border-2 border-sky-200 "
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
        )}
      </div>
    </div>
  );
}

export default Sidebar;
