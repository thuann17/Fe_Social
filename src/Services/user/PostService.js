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
    getMyPost() {
        const username = Cookies.get('username');
        return axios.get(`${API_BASE_URL}/api/user/post/${username}`);
    }
    async createPost(postData) {
        const username = Cookies.get('username'); // Get username from cookies
    
        if (!username) {
          throw new Error('User not found.');
        }
    
        try {
          const response = await axios.post(
            `${API_BASE_URL}/api/user/post/${username}`, // URL with PathVariable
            postData // Post data to be sent in the body
          );
          return response.data; // Return the post data from the response
        } catch (err) {
          throw new Error(err.response ? err.response.data.message : err.message); // Handle errors
        }
      }
    }
    


export default new PostService();
