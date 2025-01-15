import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

class HomeService {
    getPostCountByYearAndMonth(year, month) {
        const url = `${API_BASE_URL}/api/admin/dashboard?year=${year}&month=${month}`;
        return axios.get(url)
            .then(response => response.data)
            .catch(error => {
                console.error('Error fetching post count:', error);
                throw error;
            });
    }
    getTopOne(year, month) {
        const url = `${API_BASE_URL}/api/admin/dashboard/top?year=${year}&month=${month}`;
        return axios.get(url)
            .then(response => response.data)
            .catch(error => {
                console.error('Error fetching most active user:', error);
                throw error;
            });
    }

    getTopFive(year, month) {
        const url = `${API_BASE_URL}/api/admin/dashboard/popular?year=${year}&month=${month}`;
        return axios.get(url)
            .then(response => response.data)
            .catch(error => {
                console.error('Error fetching most active user:', error);
                throw error;
            });
    }
}

export default new HomeService();
