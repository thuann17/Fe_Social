import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

class AccountService {

    getUserAccounts(params) {
        return axios.get(`${API_BASE_URL}/api/admin/account/user`, { params });
    }

    getAdminAccounts(username, params) {
        return axios.get(`${API_BASE_URL}/api/admin/account/admin/${username}`, { params });
    }

    updateAccountStatus(username, status) {
        return axios.put(`${API_BASE_URL}/api/admin/account/${username}`, { active: status });
    }
    lockUnlockAccount(username, password) {
        return axios.post(`${API_BASE_URL}/api/admin/account/lock-unlock`, { username, password })
            .then(response => response.data)
            .catch(error => {
                console.error("Error locking/unlocking account:", error);
                throw new Error("Lỗi khi thay đổi trạng thái tài khoản");
            });
    }

}

export default new AccountService();
