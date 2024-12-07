import React from 'react';
import './register.css'; // Ensure this CSS file exists.

const RegisterForm = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
    };

    return (
        <div className="register-container">
            <div className="register-left">
                <h1 style={{ color: '#311433' }}>ĐĂNG KÝ</h1>
                <form onSubmit={handleSubmit}>
                    <label>
                        Tên tài khoản
                        <input type="text" placeholder="Tên tài khoản" required />
                    </label>
                    <label>
                        Email
                        <input type="email" placeholder="Email" required />
                    </label>
                    <label>
                        Mật khẩu
                        <input type="password" placeholder="Mật khẩu" required />
                    </label>
                    <label>
                        Họ
                        <input type="text" placeholder="Họ" required />
                    </label>
                    <label>
                        Tên
                        <input type="text" placeholder="Tên" required />
                    </label>
                    <button type="submit">Đăng ký</button>
                </form>
                <p>Bạn đã có tài khoản? <a href="/login" style={{ color: 'red' }}>Đăng nhập</a></p>
            </div>
            <div className="register-right">
                <h1 style={{ color: '#311433' }}>FShark Social Media</h1>
                <p>FShark là nền tảng mạng xã hội du lịch đầu tiên tại Việt Nam. Nơi lưu giữ và chia sẽ những chuyến đi và hành trình tuyệt vời của bạn.</p>
            </div>
        </div>
    );
};

export default RegisterForm;