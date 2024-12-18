import React, { useState } from "react";
import { login } from "../../Services/login/LoginService"
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const [errorMessage, setErrorMessage] = useState(""); // Thêm state để lưu thông báo lỗi
    const [loading, setLoading] = useState(false); // Thêm state để kiểm tra trạng thái đang tải
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Kiểm tra nếu tên đăng nhập hoặc mật khẩu trống
        if (!username || !password) {
            setErrorMessage("Vui lòng điền đủ tên đăng nhập và mật khẩu.");
            return;
        }

        // Gửi yêu cầu đăng nhập tới server
        setLoading(true); // Bắt đầu quá trình gửi yêu cầu
        setErrorMessage(""); // Reset lỗi

        try {
            const data = await login(username, password, remember); // Gọi service đăng nhập

            // Đăng nhập thành công
            console.log("Đăng nhập thành công:", data);

            // Lưu thông tin token và role vào localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.role);  // Lưu role

            // Điều hướng người dùng dựa trên vai trò
            console.log(data.role);
            
            if (data.role === 'Admin') {
                navigate('/admin/dashboard');
            } else {
                navigate('/user/index');
            }

        } catch (error) {
            // Xử lý lỗi nếu không kết nối được đến API
            setErrorMessage(error.message || "Có lỗi xảy ra. Vui lòng thử lại sau.");
        } finally {
            setLoading(false); // Kết thúc quá trình gửi yêu cầu
        }
    };

    return (
        <div className="bg-gray-100 flex justify-center items-center h-screen">
            {/* Cột trái: Hình ảnh */}
            <div className="w-1/2 h-screen hidden lg:block">
                <img
                    src="https://cdn.tgdd.vn/Files/2021/07/03/1365413/luu-ngay-10-dia-diem-du-lich-cuc-lang-man-danh-cho-cac-cap-doi-tai-viet-nam-202206021609456544.jpg"
                    alt="Placeholder Image"
                    className="object-cover w-full h-full"
                />
            </div>

            {/* Cột phải: Form đăng nhập */}
            <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
                <h1 className="text-2xl font-semibold mb-4">Đăng Nhập</h1>
                <form onSubmit={handleSubmit}>
                    {/* Nhập tên đăng nhập */}
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-600">
                            Tên đăng nhập
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                            autoComplete="off"
                        />
                    </div>

                    {/* Nhập mật khẩu */}
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-600">
                            Mật khẩu
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                            autoComplete="off"
                        />
                    </div>

                    {/* Remember Me Checkbox */}
                    <div className="mb-4 flex items-center">
                        <input
                            type="checkbox"
                            id="remember"
                            name="remember"
                            checked={remember}
                            onChange={() => setRemember(!remember)}
                            className="text-blue-500"
                        />
                        <label htmlFor="remember" className="text-gray-600 ml-2">
                            Ghi nhớ tài khoản
                        </label>
                    </div>

                    {/* Hiển thị thông báo lỗi nếu có */}
                    {errorMessage && (
                        <div className="mb-4 text-red-500 text-center">{errorMessage}</div>
                    )}

                    {/* Nút Đăng nhập */}
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
                        disabled={loading}
                    >
                        {loading ? "Đang đăng nhập..." : "Đăng Nhập"}
                    </button>
                </form>

                {/* Liên kết đăng ký */}
                <div className="mt-6 text-blue-500 text-center">
                    <a href="#" className="hover:underline">
                        Đăng ký tại đây
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Login;
