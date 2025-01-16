const API_URL = "http://localhost:8080/api";

// Hàm xử lý quên mật khẩu
export const forgotPassword = async (email) => {
  try {
    // Gửi yêu cầu quên mật khẩu đến server
    const response = await fetch(`${API_URL}/auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error("Có lỗi xảy ra khi gửi yêu cầu quên mật khẩu.");
    }
    return data.message;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response;
    } else {
      throw new Error('Có lỗi xảy ra, vui lòng thử lại!');
    }
  }
};
