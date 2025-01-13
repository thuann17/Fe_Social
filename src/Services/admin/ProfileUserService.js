import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

class ProfileUserService {

    getInfoUser(username, data) {
        return axios.get(`${API_BASE_URL}/api/admin/profile/${username}`, data);
    }
    getPostByUser(username, data) {
        return axios.get(`${API_BASE_URL}/api/admin/profile/${username}/posts`, data);
    }

}

export default new ProfileUserService();
