import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import FriendService from "../../Services/user/FriendService";

const RightSidebar = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch dữ liệu bạn bè từ service
  const fetchData = () => {
    setLoading(true);

    // Gọi API lấy dữ liệu bạn bè
    FriendService.getFriend()
      .then((response) => {
        const data = response.data || [];

        // In ra dữ liệu trả về
        console.log("data: ", data);

        // Cập nhật danh sách bạn bè
        setFriends(data); // Giả sử dữ liệu trả về là danh sách bạn bè
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch data: " + err.message);
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData(); // Gọi API khi component mount
  }, []);

  const sectionStyle = (maxHeight) => ({
    maxHeight: maxHeight,
    overflowY: "auto",
    overflowX: "hidden", // Đảm bảo không có thanh cuộn ngang
    paddingRight: "10px",
  });

  return (
    <aside className="w-64 h-screen bg-white shadow-lg p-4 rounded-lg">
      {loading && <p className="text-center">Đang tải dữ liệu...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Danh sách bạn bè */}
      <div>
        <h3 className="font-semibold text-lg mb-4 text-center">
          Bạn bè của bạn
        </h3>
        <div style={sectionStyle("15rem")}>
          {friends.length === 0 ? (
            <p className="text-center">Không có bạn bè nào.</p>
          ) : (
            <ul className="space-y-3">
              {friends.map((user, index) => (
                <li
                  key={index}
                  className="flex justify-start items-center p-3 hover:bg-gray-100 rounded-lg transition duration-200"
                >
                  <img
                    src={user.friendAvatar}
                    alt={user.friendName}
                    className="rounded-full w-12 h-12 mr-4 shadow-md"
                  />
                  <span
                    className="text-lg font-small"
                    style={{ fontSize: "16px" }}
                  >
                    {user.userTarget.firstname}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Style cho Scrollbar */}
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

          /* Ensure no horizontal scrollbar */
          .w-64 {
            width: 100%;
            max-width: 16rem;
            overflow-x: hidden;
          }
        `}
      </style>
    </aside>
  );
};

export default RightSidebar;
