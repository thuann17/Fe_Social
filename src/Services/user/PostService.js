import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = "http://localhost:8080";

class PostService {
  getListPost() {
    const username = Cookies.get("username");
    return axios.get(
      `${API_BASE_URL}/api/user/post/getPostByListFriends?username=${username}`
    );
  }
  likePost(postId) {
    const username = Cookies.get("username");
    return axios.post(
      `${API_BASE_URL}/api/user/post/likes/${postId}?username=${username}`
    );
  }
  unLikePost(postId) {
    const username = Cookies.get("username");
    return axios.delete(
      `${API_BASE_URL}/api/user/post/likes/${postId}?username=${username}`
    );
  }
  commentPost(postId, content, createDate) {
    const username = Cookies.get("username");
    return axios.post(
      `${API_BASE_URL}/api/user/post/comments/${postId}?username=${username}`,
      { content, createDate }
    );
  }
  getComments(postId) {
    return axios.get(`${API_BASE_URL}/api/user/post/comments/${postId}`);
  }
  getMyPost(username) {
    return axios.get(`${API_BASE_URL}/api/user/post/${username}`);
  }
  async createPost(postData) {
    const username = Cookies.get("username");

    if (!username) {
      throw new Error("User not found.");
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/user/post/${username}`,
        postData
      );
      return response.data;
    } catch (err) {
      throw new Error(err.response ? err.response.data.message : err.message);
    }
  }
  deletePost(postid) {
    return axios
      .delete(`${API_BASE_URL}/api/user/post/${postid}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  }
  deleteComment(cmtid) {
    return axios
      .delete(`${API_BASE_URL}/api/user/post/deletecmt/${cmtid}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  }
  getListShare() {
    const username = Cookies.get("username");
    return axios.get(`${API_BASE_URL}/api/user/post/shares/${username}`);
  }
  deleteShare(shareid) {
    return axios
      .delete(`${API_BASE_URL}/api/user/post/deleteShare/${shareid}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  }

  addShare(username, postId, model) {
    return axios
      .post(`${API_BASE_URL}/api/user/post/share/add/${username}/${postId}`, model)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("There was an error adding the share!", error);
        throw error;
      });
  }

  getListFeed() {
    const username = Cookies.get("username");
    return axios.get(
      `${API_BASE_URL}/api/user/post/feed/${username}`
    );
  }
}

export default new PostService();
