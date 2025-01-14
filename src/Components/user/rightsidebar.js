import React, { useState, useEffect } from "react";
import FriendService from "../../Services/user/FriendService";

const RightSidebar = ({ onSelectFriend }) => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = () => {
    setLoading(true);
    FriendService.getFriend()
      .then((response) => {
        const data = response.data || [];
        setFriends(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch data: " + err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const sectionStyle = (maxHeight) => ({
    maxHeight: maxHeight,
    overflowY: "auto",
    paddingRight: "10px",
  });

  return (
    <aside className="w-64 h-screen bg-white shadow-lg p-4 rounded-lg">
      {loading && <p className="text-center">Đang tải dữ liệu...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      <div>
        <h3 className="font-semibold text-lg mb-4 text-center">Bạn bè</h3>
        <div style={sectionStyle("15rem")}>
          {friends.length === 0 ? (
            <p className="text-center">Không có bạn bè nào.</p>
          ) : (
            <ul className="space-y-3">
              {friends.map((user, index) => (
                <li
                  key={index}
                  className="flex justify-start items-center p-3 hover:bg-gray-100 rounded-lg transition duration-200"
                  onClick={() => onSelectFriend(user)}
                >
                  <img
                    src={user.friendAvatar}
                    alt={user.friendName}
                    className="rounded-full w-12 h-12 mr-4 shadow-md"
                  />
                  <span className="text-lg font-small" style={{ fontSize: "16px" }}>
                    {user.friendName}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Scrollbar Styles */}
      <style>
        {`
          div::-webkit-scrollbar {
            width: 8px;
          }
          div::-webkit-scrollbar-track {
            background: #f7fafc;
          }
          div::-webkit-scrollbar-thumb {
            background-color: #cbd5e0;
            border-radius: 10px;
          }
          div::-webkit-scrollbar-thumb:hover {
            background: #a0aec0;
          }
        `}
      </style>
    </aside>
  );
};

export default RightSidebar;
