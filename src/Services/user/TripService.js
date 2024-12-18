// services/tripService.js
// import axios from 'axios';

// const BASE_URL = 'http://localhost:8080/api/user/trip';

// export const createTrip = (tripModel, username) => {
//     return axios.post(`${BASE_URL}/create`, tripModel, {
//         params: { username },adapter
//     });
// };

// export const requestJoinTrip = (tripId, username) => {
//     return axios.post(`${BASE_URL}/request-join`, null, {
//         params: { tripId, username },
//     });
// };

// export const approveRequest = (userTripId, isApproved) => {
//     return axios.post(`${BASE_URL}/approve-request`, null, {
//         params: { userTripId, isApproved },
//     });
// };

// export const recordPlace = (tripId, placeId, datetime, note) => {
//     return axios.post(`${BASE_URL}/record-place`, null, {
//         params: { tripId, placeId, datetime, note },
//     });
// };

// export const getTripsByUser = (username) => {
//     return axios.get(`${BASE_URL}/user-trips`, {
//         params: { username },
//     });
// };

// export const completeTrip = (tripId) => {
//     return axios.post(`${BASE_URL}/complete`, null, {
//         params: { tripId },
//     });
// };
