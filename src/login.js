import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css"; // Import your CSS file

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(""); // Clear previous errors

        if (!username || !password) {
            setError("Please fill in all fields.");
            return;
        }

        // Here you would typically make an API call to authenticate the user.
        // For this example, we'll simulate a successful login:
        if (username === "user" && password === "password") {
            // Redirect to a protected route after successful login
            navigate("/dashboard"); // Replace '/dashboard' with your actual route
        } else {
            setError("Invalid username or password.");
        }
    };

    return (
        <div className="login-container">
            <div className="login-left">
                <div className="login-title">
                    <h2>FShark Social Media</h2>
                </div>
                <p className="login-description">
                    FShark là nền tảng mạng xã hội du lịch đầu tiên tại Việt Nam. Nơi lưu giữ và chia sẽ những chuyến đi và hành trình tuyệt vời của bạn
                </p>
                <button className="register-button" onClick={() => navigate("/register")}>Đăng ký</button> {/* Navigate to registration */}
            </div>
            <div className="login-right">
                <h2> <b>ĐĂNG NHẬP</b> </h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Tên đăng nhập"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Đăng nhập</button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;