import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { login } from "../../Services/login/LoginService.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);

  const navigate = useNavigate();
  useEffect(() => {
    const failedAttempts = parseInt(localStorage.getItem("failedAttempts")) || 0;
    const lastFailedAttempt = parseInt(localStorage.getItem("lastFailedAttempt")) || 0;

    if (failedAttempts >= 5) {
      const currentTime = Date.now();
      const lockTime = 60000; // 60 giây khóa tài khoản
      if (currentTime - lastFailedAttempt < lockTime) {
        setIsLocked(true);
        setTimeRemaining(Math.ceil((lockTime - (currentTime - lastFailedAttempt)) / 1000));
      } else {
        localStorage.removeItem("failedAttempts");
        localStorage.removeItem("lastFailedAttempt");
        setIsLocked(false);
        setTimeRemaining(0);
      }
    }
  }, []);

  useEffect(() => {
    let timer;
    if (isLocked && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime <= 1) {
            setIsLocked(false);
            clearInterval(timer);
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isLocked, timeRemaining]);

  // Xử lý form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLocked) {
      toast.error(`Tài khoản của bạn đã bị khoá. Vui lòng thử lại sau ${timeRemaining} giây.`);
      return;
    }

    if (!username || !password) {
      toast.error("Vui lòng điền đủ tên đăng nhập và mật khẩu.");
      return;
    }

    setLoading(true);

    try {
      const data = await login(username, password, remember);
      const { token, role } = data;
      Cookies.set("token", token, { expires: remember ? 365 : undefined });
      Cookies.set("role", role, { expires: remember ? 365 : undefined });

      if (remember) {
        Cookies.set("username", username, { expires: 365 });
      } else {
        Cookies.set("username", username);
      }
      localStorage.removeItem("failedAttempts");
      localStorage.removeItem("lastFailedAttempt");

      setTimeout(() => {
        if (role === "Admin") {
          navigate("/dashboard");
        } else {
          navigate("/index");
        }
      }, 2000);
    } catch (error) {
      const failedAttempts = parseInt(localStorage.getItem("failedAttempts")) || 0;
      localStorage.setItem("failedAttempts", failedAttempts + 1);
      localStorage.setItem("lastFailedAttempt", Date.now().toString());

      if (failedAttempts + 1 >= 5) {
        toast.error("Tài khoản của bạn đã bị khoá. Vui lòng thử lại sau 60 giây.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper relative flex items-center justify-center h-screen bg-gradient-to-r from-purple-300 to-blue-400 ">

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
            FShark là nền tảng mạng xã hội du lịch tại Việt Nam. Nơi lưu giữ và chia sẻ những chuyến đi và hành trình tuyệt vời của bạn.
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
          <p className="text-red-500 flex justify-end me-1 cursor-pointer"><a href="/forgot">Quên mật khẩu?</a></p>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
      />
    </div>
  );
};

export default LoginForm;
