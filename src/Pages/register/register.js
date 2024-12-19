import React from "react";
import "./register.css";

const RegisterForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="register-wrapper">
      <div className="register-container">
        <div className="register-left">
          {/* Mobile Header */}
          <div className="mobile-header">Đăng ký</div>
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
            <div className="name-fields">
              <label>
                Họ
                <input type="text" placeholder="Họ" required />
              </label>
              <label>
                Tên
                <input type="text" placeholder="Tên" required />
              </label>
            </div>
            <button type="submit">Đăng ký</button>
          </form>
          <p>
            Bạn đã có tài khoản?{" "}
            <a href="/login" style={{ color: "red" }}>
              Đăng nhập
            </a>
          </p>
        </div>
        <div className="register-right">
          <div className="image-container">
            <img className="logo" src="logoreback.png" alt="Buckety" />
          </div>
          <h1 style={{ color: "#311433" }}>
            <b>ĐĂNG KÝ</b>
          </h1>
          <p>
            FShark là nền tảng mạng xã hội du lịch đầu tiên tại Việt Nam. Nơi
            lưu giữ và chia sẻ những chuyến đi và hành trình tuyệt vời của bạn.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
