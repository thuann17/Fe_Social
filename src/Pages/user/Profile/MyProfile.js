import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import UserService from "../../../Services/user/UserService";

const UserInfo = ({ username }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
     const username = Cookies.get("username");
    if (username) {
      // Đặt loading là true khi bắt đầu lấy dữ liệu
      setLoading(true);

      UserService.getInfo(username) // Truyền `username` vào hàm getInfo()
        .then((data) => {
          setUserInfo(data);
          setError(null); // Xóa lỗi nếu có
        })
        .catch((err) => {
          setError(err.message || "An error occurred while fetching data");
          setUserInfo(null); // Xóa thông tin người dùng nếu có lỗi
        })
        .finally(() => {
          setLoading(false); 
        });
    }
  }, [username]); // Thêm 'username' vào mảng phụ thuộc

  if (loading) {
    return <p>Loading...</p>; // Hiển thị loading khi đang tải dữ liệu
  }

  if (error) {
    return (
      <div className="error">
        <h2>Error: {error}</h2> {/* Hiển thị thông báo lỗi */}
      </div>
    );
  }

  if (!userInfo) {
    return <p>User not found.</p>; // Nếu không có userInfo, hiển thị thông báo
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center mt-12 mx-auto relative">
      {/* Avatar Section */}
      <div className="relative -mt-20">
        <div className="bg-white rounded-full p-2 inline-block shadow-lg">
          <img
            src={userInfo.avatarUrl || "https://via.placeholder.com/140"} // URL mặc định
            alt="User"
            className="rounded-full w-32 h-32 border-4 border-white object-cover"
          />
        </div>
      </div>
      {/* Profile Information */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold">
          {userInfo.lastname} {userInfo.firstname}
        </h2>
        <p className="text-gray-500 text-lg">📧 {userInfo.email}</p>
        <p className="text-gray-700">🏡 Đang sống tại: {userInfo.hometown}</p>
        <p className="text-gray-700"> {userInfo.bio}</p>
        
      </div>
    </div>
  );
};

export default UserInfo;
