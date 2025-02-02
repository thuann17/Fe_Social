import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = 'http://localhost:8080';

class UserService {
    // Thêm username vào params khi gọi API
    getInfo(username) {
        return axios
            .get(`${API_BASE_URL}/api/about/info/${username}`) // Gọi API với username
            .then((response) => response.data) // Trả về dữ liệu
            .catch((error) => {
                throw error.response ? error.response.data : error.message; // Xử lý lỗi
            });
    }
    uploadProfileImage(username, formData) {
        return axios.post(`${API_BASE_URL}/api/admin/profile/${username}/uImage`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    }
}

export default new UserService();
