import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../Services/login/RegisterService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterAminForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState(null);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [birthday, setBirthday] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;

    if (!username) {
      toast.error("Tên người dùng không được để trống!");
      isValid = false;
      return;
    }
    if (!password) {
      toast.error("Mật khẩu không được để trống!");
      isValid = false; return;
    } else if (password.length < 6) {
      toast.error("Mật khẩu phải có ít nhất 6 ký tự!");
      isValid = false; return;
    }
    if (!confirmPassword) {
      toast.error("Xác nhận mật khẩu không được để trống!");
      isValid = false; return;
    } else if (password !== confirmPassword) {
      toast.error("Mật khẩu và xác nhận mật khẩu không khớp!");
      isValid = false; return;
    }
    if (!email) {
      toast.error("Email không được để trống!");
      isValid = false; return;
    }
    if (gender === null) {
      toast.error("Bạn phải chọn giới tính!");
      isValid = false; return;
    }
    if (!firstname) {
      toast.error("Tên không được để trống!");
      isValid = false; return;
    }
    if (!lastname) {
      toast.error("Họ không được để trống!");
      isValid = false; return;
    }
    if (!birthday) {
      toast.error("Ngày sinh không được để trống!");
      isValid = false; return;
    } else {
      const ageDiff = new Date().getFullYear() - new Date(birthday).getFullYear();
      if (ageDiff < 16 || (ageDiff === 16 && new Date(birthday).setFullYear(new Date().getFullYear()) > new Date())) {
        toast.error("Bạn chưa đủ 16 tuổi!");
        isValid = false; return;
      }
    }
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await register(username, password, email, gender, firstname, lastname, birthday);
      toast.success("Đăng ký thành công!");
    } catch (err) {
      toast.error("Đã có lỗi xảy ra, vui lòng thử lại!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (

    <div className="flex bg-white flex flex-col justify-center items-center">
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <label className="block text-gray-700">
          Tên tài khoản
          <input
            type="text"
            placeholder="Tên tài khoản"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* {errors.username && <p className="text-red-500">{errors.username}</p>} */}
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
            {/* {errors.password && <p className="text-red-500">{errors.password}</p>} */}
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
            {/* {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>} */}
          </label>
        </div>
        <label className="block text-gray-700 mb-2">
          Email
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* {errors.email && <p className="text-red-500">{errors.email}</p>} */}
        </label>
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
            {/* {errors.lastname && <p className="text-red-500">{errors.lastname}</p>} */}
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
            {/* {errors.firstname && <p className="text-red-500">{errors.firstname}</p>} */}
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
          {/* {errors.gender && <p className="text-red-500">{errors.gender}</p>} */}
        </div>

        <label className="block text-gray-700 mb-3">
          Ngày sinh
          <input
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* {errors.birthday && <p className="text-red-500">{errors.birthday}</p>} */}
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {isSubmitting ? "Đang đăng ký..." : "Đăng ký"}
        </button>
      </form>
    </div>

  );
};

export default RegisterAminForm;
