import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (username === "user" && password === "password") {
      navigate("/dashboard");
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div class="main-wrapper">
      <div className="login-wrapper">
      <div className="login-container">
        <div className="login-left">
          <div className="image-container">
            <img className="logo" src="logoreback.png" alt="Buckety" />
          </div>
          <p className="login-description">
            FShark là nền tảng mạng xã hội du lịch đầu tiên tại Việt Nam. Nơi
            lưu giữ và chia sẽ những chuyến đi và hành trình tuyệt vời của bạn
          </p>
          <button
            className="register-button"
            onClick={() => navigate("/register")}
          >
            Đăng ký
          </button>
        </div>
        <div className="login-right">
          <h2>
            <b>ĐĂNG NHẬP</b>
          </h2>
          {error && <p className="error-message" aria-live="assertive">{error}</p>}
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Tài khoản:</label>
            <input
              type="text"
              id="username"
              placeholder="Tên đăng nhập"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label htmlFor="password">Mật khẩu:</label>
            <input
              type="password"
              id="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className="login-btn" type="submit">Đăng nhập</button>
          </form>
        </div>
      </div>
    </div>
    </div>
    
  );
};

export default LoginForm;