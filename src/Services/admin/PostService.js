import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

class PostService {

    getPosts(params) {
        return axios.get(`${API_BASE_URL}/api/admin/post`, { params });
    }
    updatePostStatus(postId, updatedStatus) {
        const postModel = {
            status: updatedStatus,
        };
        return axios.put(`${API_BASE_URL}/api/admin/post/${postId}`, postModel);
    }
    getPostById(postId) {
        return axios.get(`${API_BASE_URL}/api/admin/post/${postId}`)
    }
}

export default new PostService();
