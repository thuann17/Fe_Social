import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = 'http://localhost:8080';

class FriendService {
    
    // lấy danh sách gợi ý kết bạn
    fetchSuggestedFriends() {
        const username = Cookies.get('username');
        return axios.get(`${API_BASE_URL}/api/friend-requests/without-friends/${username}`);
    }
   
    //gửi yêu cầu kết bạn
    handleAddFriend(usernameTarget) {
        const usernameSrc = Cookies.get('username'); 
        return axios.post(`${API_BASE_URL}/api/friend-requests/add-friend/${usernameTarget}/${usernameSrc}`);
    }

    //lấy danh sách người theo dõi
    getFollowers() {
        const username = Cookies.get('username');
        return axios.get(`${API_BASE_URL}/api/friend-requests/followers?username=${username}`);
    }

    //xóa bạn bè
    deleteFriendRequest(id){
        return axios.delete(`${API_BASE_URL}/api/friend-requests/${id}`);
    }

    //chấp nhận yêu cầu kb
    acceptFriendRequest(id){
        return axios.put(`${API_BASE_URL}/api/friend-requests/${id}/update-status`);
    }
    getFriend(){
        const username = Cookies.get('username');
        return axios.get(`${API_BASE_URL}/api/friend-requests/${username}`);
    }
}

export default new FriendService();
