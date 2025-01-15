import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../Services/login/RegisterService';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState(null);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [birthday, setBirthday] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    let formErrors = {};
    if (!username) formErrors.username = "Tên người dùng không được để trống!";
    if (!password) formErrors.password = "Mật khẩu không được để trống!";
    if (password.length < 6) formErrors.password = "Mật khẩu phải có ít nhất 6 ký tự!";
    if (!confirmPassword) formErrors.confirmPassword = "Xác nhận mật khẩu không được để trống!";
    if (password !== confirmPassword) formErrors.confirmPassword = "Mật khẩu và xác nhận mật khẩu không khớp!";
    if (!email) formErrors.email = "Email không được để trống!";
    if (gender === null) formErrors.gender = "Bạn phải chọn giới tính!";
    if (!firstname) formErrors.firstname = "Tên không được để trống!";
    if (!lastname) formErrors.lastname = "Họ không được để trống!";
    if (!birthday) formErrors.birthday = "Ngày sinh không được để trống!";
    if (birthday) {
      const ageDiff = new Date().getFullYear() - new Date(birthday).getFullYear();
      if (ageDiff < 16 || (ageDiff === 16 && new Date(birthday).setFullYear(new Date().getFullYear()) > new Date())) {
        formErrors.birthday = "Bạn chưa đủ 16 tuổi!";
      }
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    setIsSubmitting(true);

    try {
      await register(username, password, email, gender, firstname, lastname, birthday);
      alert("Đăng ký thành công!");
      navigate("/login");
    } catch (err) {
      setErrors({ general: "Đã có lỗi xảy ra, vui lòng thử lại!" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-300 to-blue-400 animate-gradientAnimation">
      <div className="max-w-4xl h-[95vh] flex flex-col lg:flex-row rounded-lg shadow-xl bg-white">
        <div className="flex-1 bg-white p-8 flex flex-col justify-center items-center">
          <div className="lg:hidden text-2xl font-bold mb-3">Đăng ký</div>
          <form onSubmit={handleSubmit} className="w-full max-w-sm">
            <label className="block text-gray-700 mb-2">
              Tên tài khoản
              <input
                type="text"
                placeholder="Tên tài khoản"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.username && <p className="text-red-500">{errors.username}</p>}
            </label>

            <label className="block text-gray-700 mb-2">
              Email
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}
            </label>

            <div className="flex gap-4 mb-3">
              <label className="block text-gray-700 w-full">
                Mật khẩu
                <input
                  type="password"
                  placeholder="Mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.password && <p className="text-red-500">{errors.password}</p>}
              </label>

              <label className="block text-gray-700 w-full">
                Nhập lại mật khẩu
                <input
                  type="password"
                  placeholder="Nhập lại mật khẩu"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>}
              </label>
            </div>

            <div className="flex justify-between gap-4 mb-3">
              <label className="block text-gray-700">
                Họ
                <input
                  type="text"
                  placeholder="Họ"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.lastname && <p className="text-red-500">{errors.lastname}</p>}
              </label>

              <label className="block text-gray-700">
                Tên
                <input
                  type="text"
                  placeholder="Tên"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.firstname && <p className="text-red-500">{errors.firstname}</p>}
              </label>
            </div>

            <div className="mb-3">
              <label className="block text-gray-700 mb-2">Giới tính</label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="true"
                    checked={gender === "true"}
                    onChange={() => setGender("true")}
                    className="mr-2"
                  />
                  Nam
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="false"
                    checked={gender === "false"}
                    onChange={() => setGender("false")}
                    className="mr-2"
                  />
                  Nữ
                </label>
              </div>
              {errors.gender && <p className="text-red-500">{errors.gender}</p>}
            </div>

            <label className="block text-gray-700 mb-3">
              Ngày sinh
              <input
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.birthday && <p className="text-red-500">{errors.birthday}</p>}
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {isSubmitting ? "Đang đăng ký..." : "Đăng ký"}
            </button>
          </form>

          {/* Hiển thị lỗi chung nếu có */}
          {errors.general && <p className="mt-4 text-center text-red-500">{errors.general}</p>}

          <p className="mt-4 text-center text-gray-600">
            Bạn đã có tài khoản?{" "}
            <a href="/login" className="text-red-500 hover:text-red-700">
              Đăng nhập
            </a>
          </p>
        </div>

        <div
          className="lg:flex-1 bg-cover bg-center p-8 text-white flex flex-col justify-center items-center text-center hidden lg:block"
          style={{
            backgroundImage:
              "url('https://static.vecteezy.com/system/resources/thumbnails/000/203/020/small_2x/T_17-01.jpg')",
          }}
        >
          <div className="image-container mt-14 mb-3">
            <img className="mx-auto mb-3" src="logoreback.png" alt="Buckety" />
          </div>
          <h1 className="text-4xl font-bold mb-6">ĐĂNG KÝ</h1>
          <p className="text-lg">
            FShark là nền tảng mạng xã hội du lịch tại Việt Nam. Nơi
            lưu giữ và chia sẻ những chuyến đi và hành trình tuyệt vời của bạn.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
