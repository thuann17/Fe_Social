import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = 'http://localhost:8080';

class PlaceService {
    
    // lấy danh sách địa điểm
    getDetailPlace() {
        return  axios.get("http://localhost:8080/api/place", {
            params: {
              addressFilter: addressFilter, // Send address filter as a query parameter if provided
            }
          });
    }
   
   
}

export default new PlaceService();
