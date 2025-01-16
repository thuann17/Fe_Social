import { toast } from 'react-toastify';

const API_URL = "http://localhost:8080/api";
export const login = async (username, password, remember) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        remember,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      if (data.message) {
        toast.error(data.message || "Tên đăng nhập hoặc mật khẩu không chính xác.");
      }
      return null;
    }

    localStorage.setItem("token", data.token);
    toast.success("Đăng nhập thành công!");
    return data;
  } catch (error) {
    toast.error(error.message || "Có lỗi xảy ra. Vui lòng thử lại sau.");
    return null;
  }
};

