import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

class PlaceService {

    getPlace(params) {
        return axios.get(`${API_BASE_URL}/api/admin/place`, { params });
    }
    createPlace(placeData) {
        return axios.post(`${API_BASE_URL}/api/admin/place`, placeData);
    }

}

export default new PlaceService();
