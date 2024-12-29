const API_URL = "http://localhost:8080/api";

export const register = async (
    username,
    password,
    email,
    gender,
    firstname,
    lastname,
    birthday
) => {
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
                email,
                gender,
                firstname,
                lastname,
                birthday,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Đăng ký không thành công");
        }

        return data;
    } catch (error) {
        throw new Error(error.message || "Có lỗi xảy ra. Vui lòng thử lại sau.");
    }
};
