import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

class ChatService {
    getListFriend(username) {
        return axios.get(`${API_BASE_URL}/api/friend-requests/${username}`);
    }
    getMessagesBetweenUsers(user1, user2) {
        return axios.get(`${API_BASE_URL}/api/user/chat/messages`, {
            params: { user1, user2 },
        });
    }
    sendMessage(message) {
        return axios.post(`${API_BASE_URL}/chat.sendMessage`, message);
    }
    notifyTyping(message) {
        return axios.post(`${API_BASE_URL}/chat.typing`, message);
    }
    deleteMessages(user1, user2, currentUser) {
        return axios.delete(`${API_BASE_URL}/deleteMessages`, {
            params: { user1, user2, currentUser },
        });
    }
}

export default new ChatService();
