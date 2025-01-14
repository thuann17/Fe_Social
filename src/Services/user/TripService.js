import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';
class TripService {
  createTrip(username, tripData) {
    const url = `${API_BASE_URL}/api/user/trip/${username}`;
    return axios.post(url, tripData)
      .then(response => {
        console.log("Trip created successfully:", response.data);
        return response.data;
      })
      .catch(error => {
        console.error("There was an error creating the trip:", error);
        throw error;
      });
  }
}

export default new TripService();
