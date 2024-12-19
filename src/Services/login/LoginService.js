const API_URL = "http://localhost:8080/api";

// Function để đăng nhập
export const login = async (username, password, remember) => {
  const token = localStorage.getItem('token');
  fetch('api/endpoint', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

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
      throw new Error(data.message || "Đăng nhập không thành công");
    }

    return data;
  } catch (error) {
    throw new Error(error.message || "Có lỗi xảy ra. Vui lòng thử lại sau.");
  }
};
