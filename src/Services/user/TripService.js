import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

class TripService {
  // Create a new trip
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

  // Get all trip start dates
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
