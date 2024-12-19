import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../Services/login/LoginService.js";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Tự động điền thông tin người dùng nếu có lưu trong localStorage và nhớ tôi
    const storedUsername = localStorage.getItem("username");
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      navigate("/user/index"); // Nếu có token, chuyển đến trang người dùng
    } else if (storedUsername) {
      setUsername(storedUsername); // Điền tên đăng nhập nếu có trong localStorage
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setErrorMessage("Vui lòng điền đủ tên đăng nhập và mật khẩu.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const data = await login(username, password, remember);

      // Lưu trữ thông tin đăng nhập
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      if (remember) {
        localStorage.setItem("username", username); // Lưu tên đăng nhập nếu chọn "remember me"
      } else {
        sessionStorage.setItem("username", username); // Chỉ lưu tên đăng nhập trong phiên hiện tại
      }

      // Điều hướng đến trang Admin hoặc User dựa trên vai trò
      if (data.role === "Admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/index");
      }
    } catch (error) {
      setErrorMessage(error.message || "Có lỗi xảy ra. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper relative flex items-center justify-center h-screen bg-gradient-to-r from-purple-300 to-blue-400 animate-gradientAnimation">
      <div className="overlay top-0 left-0 right-0 bottom-0 bg-white opacity-10"></div>
      <div className="login-container flex flex-col lg:flex-row w-full max-w-4xl rounded-lg shadow-xl bg-white overflow-hidden">
        {/* Left Section */}
        <div
          className="login-left bg-cover bg-center text-white flex-1 p-8 text-center"
          style={{
            backgroundImage:
              "url('https://static.vecteezy.com/system/resources/thumbnails/000/203/020/small_2x/T_17-01.jpg')",
          }}
        >
          <div className="image-container mb-4">
            <img className="logo mx-auto" src="logoreback.png" alt="Buckety" />
          </div>
          <p className="login-description text-lg mb-6">
            FShark là nền tảng mạng xã hội du lịch đầu tiên tại Việt Nam. Nơi lưu giữ và chia sẻ những chuyến đi và hành trình tuyệt vời của bạn.
          </p>
          <button
            className="register-button bg-purple-800 text-white py-2 px-4 rounded-lg transition-colors hover:bg-blue-600"
            onClick={() => navigate("/register")}
          >
            Đăng ký
          </button>
        </div>

        {/* Right Section */}
        <div className="login-right flex-1 p-8">
          <h2 className="text-3xl font-bold mb-4">ĐĂNG NHẬP</h2>
          {errorMessage && <p className="error-message text-red-500 mb-4">{errorMessage}</p>}
          <form onSubmit={handleSubmit}>
            <label htmlFor="username" className="block text-gray-700 mb-2">
              Tài khoản:
            </label>
            <input
              type="text"
              id="username"
              placeholder="Tên đăng nhập"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <label htmlFor="password" className="block text-gray-700 mb-2">
              Mật khẩu:
            </label>
            <input
              type="password"
              id="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="remember"
                checked={remember}
                onChange={() => setRemember(!remember)}
                className="mr-2"
              />
              <label htmlFor="remember" className="text-gray-700">
                Ghi nhớ tôi?
              </label>
            </div>

            <button
              type="submit"
              className="login-btn w-full py-3 bg-blue-600 text-white rounded-lg disabled:bg-gray-400 transition-colors hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
