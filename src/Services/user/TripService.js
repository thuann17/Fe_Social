// services/tripService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/user/trip';

// Hàm lấy token từ localStorage
const getAuthToken = () => {
  return localStorage.getItem('token');  // Lấy token từ localStorage
};

// Tạo cấu hình axios với Authorization Header
const getAxiosConfig = () => {
  const token = getAuthToken();
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  };
};

// Tạo chuyến đi
export const createTrip = (tripModel, username) => {
  return axios.post(`${BASE_URL}/create`, tripModel, {
    params: { username },
    ...getAxiosConfig()  // Thêm cấu hình Authorization vào đây
  });
};

// Yêu cầu tham gia chuyến đi
export const requestJoinTrip = (tripId, username) => {
  return axios.post(`${BASE_URL}/request-join`, null, {
    params: { tripId, username },
    ...getAxiosConfig()  // Thêm cấu hình Authorization vào đây
  });
};

// Duyệt yêu cầu tham gia
export const approveRequest = (userTripId, isApproved) => {
  return axios.post(`${BASE_URL}/approve-request`, null, {
    params: { userTripId, isApproved },
    ...getAxiosConfig()  // Thêm cấu hình Authorization vào đây
  });
};

// Ghi nhận địa điểm
export const recordPlace = (tripId, placeId, datetime, note) => {
  return axios.post(`${BASE_URL}/record-place`, null, {
    params: { tripId, placeId, datetime, note },
    ...getAxiosConfig()  // Thêm cấu hình Authorization vào đây
  });
};

// Lấy các chuyến đi của người dùng
export const getTripsByUser = (username) => {
  return axios.get(`${BASE_URL}/user-trips`, {
    params: { username },
    ...getAxiosConfig()  // Thêm cấu hình Authorization vào đây
  });
};

// Hoàn thành chuyến đi
export const completeTrip = (tripId) => {
  return axios.post(`${BASE_URL}/complete`, null, {
    params: { tripId },
    ...getAxiosConfig()  // Thêm cấu hình Authorization vào đây
  });
};
