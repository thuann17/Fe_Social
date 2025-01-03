import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = 'http://localhost:8080';

class PostService {
    getListPost() {
        const username = Cookies.get('username');
        return axios.get(`${API_BASE_URL}/api/user/post/getPostByListFriends?username=${username}`);
    }
    likePost(postId) {
        const username = Cookies.get('username');
        return axios.post(`${API_BASE_URL}/api/user/post/likes/${postId}?username=${username}`);
    }
    unLikePost(postId) {
        const username = Cookies.get('username');
        return axios.delete(`${API_BASE_URL}/api/user/post/likes/${postId}?username=${username}`);
    }
    commentPost(postId, content) {
        const username = Cookies.get('username');
        return axios.post(`${API_BASE_URL}/api/user/post/comments/${postId}?username=${username}`, { content });
    }
    getComments(postId) {
        return axios.get(`${API_BASE_URL}/api/user/post/comments/${postId}`);
    }
}
export default new PostService();
