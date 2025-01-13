import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

class ProfileService {

    updateInfo(username, data) {
        return axios.put(`${API_BASE_URL}/api/admin/profile/${username}`, data);
    }
    updatePassword(username, data) {
        return axios.put(`${API_BASE_URL}/api/admin/profile/${username}/password`, data);
    }

}

export default new ProfileService();
