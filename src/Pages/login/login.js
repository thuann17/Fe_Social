import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Import thư viện js-cookie
import { login } from "../../Services/login/LoginService.js";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // state for success message
  const [isLocked, setIsLocked] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);

  const navigate = useNavigate();

  // Kiểm tra trạng thái khóa tài khoản khi page load
  useEffect(() => {
    const failedAttempts = parseInt(localStorage.getItem("failedAttempts")) || 0;
    const lastFailedAttempt = parseInt(localStorage.getItem("lastFailedAttempt")) || 0;

    // Nếu tài khoản đã thử đăng nhập sai 5 lần trong vòng 60 giây
    if (failedAttempts >= 5) {
      const currentTime = Date.now();
      const lockTime = 60000; // 60 giây khóa tài khoản
      if (currentTime - lastFailedAttempt < lockTime) {
        setIsLocked(true);
        setTimeRemaining(Math.ceil((lockTime - (currentTime - lastFailedAttempt)) / 1000)); // Chuyển thời gian còn lại thành giây
      } else {
        localStorage.removeItem("failedAttempts");
        localStorage.removeItem("lastFailedAttempt");
        setIsLocked(false);
        setTimeRemaining(0);
      }
    }
  }, []);

  // Đếm ngược thời gian khóa tài khoản
  useEffect(() => {
    let timer;
    if (isLocked && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime <= 1) {
            setIsLocked(false); // Khi hết thời gian, mở khóa
            clearInterval(timer); // Dừng timer
          }
          return prevTime - 1; // Giảm thời gian còn lại mỗi giây
        });
      }, 1000); // Cập nhật mỗi giây
    }
    return () => clearInterval(timer); // Dọn dẹp khi component bị hủy
  }, [isLocked, timeRemaining]);

  // Xử lý form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLocked) {
      setErrorMessage(`Tài khoản của bạn đã bị khoá. Vui lòng thử lại sau ${timeRemaining} giây.`);
      return;
    }

    if (!username || !password) {
      setErrorMessage("Vui lòng điền đủ tên đăng nhập và mật khẩu.");
      return;
    }

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage(""); // Reset success message

    try {
      const data = await login(username, password, remember);
      const { token, role } = data;

      // Lưu thông tin vào cookie thay vì localStorage/sessionStorage
      Cookies.set("token", token, { expires: remember ? 365 : undefined }); // Lưu token với thời gian hết hạn nếu ghi nhớ
      Cookies.set("role", role, { expires: remember ? 365 : undefined });  // Lưu role

      if (remember) {
        Cookies.set("username", username, { expires: 365 }); // Lưu username vào cookie trong 1 năm
      } else {
        Cookies.set("username", username); // Lưu username vào cookie phiên làm việc (không có expiration)
      }

      console.log("Login successfully!");

      // Hiển thị thông báo thành công
      setSuccessMessage("Đăng nhập thành công!");

      // Reset failed attempts on successful login
      localStorage.removeItem("failedAttempts");
      localStorage.removeItem("lastFailedAttempt");

      setTimeout(() => {
        if (role === "Admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/index");
        }
      }, 2000); // Delay 2 giây
    } catch (error) {
      console.log("Login failed!");

      // Xử lý các lần đăng nhập thất bại
      const failedAttempts = parseInt(localStorage.getItem("failedAttempts")) || 0;
      localStorage.setItem("failedAttempts", failedAttempts + 1);
      localStorage.setItem("lastFailedAttempt", Date.now().toString());

      if (failedAttempts + 1 >= 5) {
        setErrorMessage("Tài khoản của bạn đã bị khoá. Vui lòng thử lại sau 60 giây.");
      } else {
        setErrorMessage("Thông tin đăng nhập không đúng. Vui lòng thử lại.");
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

          {/* Thông báo lỗi và thành công */}
          {errorMessage && <p className="error-message text-red-500 mb-4">{errorMessage}</p>}
          {successMessage && <p className="success-message text-green-500 mb-4">{successMessage}</p>}

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
    </div>
  );
};

export default LoginForm;
