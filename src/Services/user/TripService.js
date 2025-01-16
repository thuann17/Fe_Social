import axios from 'axios';
import { toast } from 'react-toastify';
const API_BASE_URL = 'http://localhost:8080';

class TripService {
  // Tạo chuyến đi mới
  createTrip(username, tripData) {
    const url = `${API_BASE_URL}/api/user/trip/${username}`;
    return axios.post(url, tripData)
      .then(response => {
        console.log("Chuyến đi đã được tạo thành công:", response.data);
        return response.data;
      })
      .catch(error => {
        console.error("Có lỗi khi tạo chuyến đi:", error);
        if (error.response && error.response.data) {
          const errorMessage = error.response.data.message
            || "Vui lòng chọn khung giờ khác. Vì trong giờ bạn chọn đã có chuyến đi khác.";
          toast.error(errorMessage);
        } else {
          toast.error("Lỗi khi thêm chuyến đi.");
        }
        throw error;
      });
  }

  getTripStartDates() {
    return axios.get(`${API_BASE_URL}/api/user/trip/start-dates`)
      .then(response => {
        console.log("Fetched trip start dates:", response.data);
        return response.data;
      })
      .catch(error => {
        console.error("Error fetching trip start dates:", error);
        throw error;
      });
  }

  // Delete a trip by ID
  deleteTrip(tripId) {
    const url = `${API_BASE_URL}/api/user/trip/delete/${tripId}`;
    return axios.delete(url)
      .then(response => {
        console.log("Trip deleted successfully:", response);
        return response;
      })
      .catch(error => {
        console.error("There was an error deleting the trip:", error);
        throw error;
      });
  }
}

export default new TripService();
