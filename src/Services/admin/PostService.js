import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

class AccountService {

    getPosts(params) {
        return axios.get(`${API_BASE_URL}/api/admin/post`, { params });
    }
    updatePostStatus(postId, status) {
        return axios.put(`${API_BASE_URL}/api/admin/post/${postId}`, { status: status });
    }
}

export default new AccountService();
