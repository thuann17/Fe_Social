import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import TripService from "../../../Services/user/TripService";
import { toast } from "react-toastify";

const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};

const Card = ({ imageUrl, title, description, onClick }) => {
  const shortDescription = truncateText(description, 60);
  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <img src={imageUrl} alt={title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-700 mt-2">{shortDescription}</p>
      </div>
    </div>
  );
};

const DetailsPlace = () => {
  const { addressFilter } = useParams();
  const [places, setPlaces] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [tripName, setTripName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [tripDescription, setTripDescription] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const selectedDate = location.state?.selectedDate;
  const username = Cookies.get("username");

  useEffect(() => {
    getDetailPlace();
  }, [addressFilter]);

  const getDetailPlace = () => {
    axios
      .get("http://localhost:8080/api/place", {
        params: { addressFilter },
      })
      .then((response) => {
        setPlaces(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching place details:", error);
      });
  };

  const openModal = (card) => {
    setSelectedCard(card);
    setTripName(`Chuyến đi ${card.nameplace}`);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedCard(null);
    setModalVisible(false);
  };

  const handleSaveTrip = (e) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Remove time portion for comparison

    // Convert the start and end date times to Date objects
    const startDateTime = new Date(startDate);
    const endDateTime = new Date(endDate);

    // Validate if the start date is after today
    if (startDateTime <= today) {
      toast.error("Ngày bắt đầu phải sau hôm nay.");
      return;
    }

    // Validate if the end date is after the start date
    if (endDateTime <= startDateTime) {
      toast.error("Ngày kết thúc phải sau ngày bắt đầu.");
      return;
    }

    // Create the trip data object
    const tripData = {
      tripName,
      startDate: startDateTime.toISOString(),
      endDate: endDateTime.toISOString(),
      description: selectedCard.description,
      placeId: selectedCard.id,
      note: tripDescription,
    };

    // Call the TripService API to create the trip
    TripService.createTrip(username, tripData)
      .then((response) => {
        console.log("Trip created successfully:", response);
        closeModal();
        toast.success("Đã thêm chuyến đi");
      })
      .catch((error) => {
        console.error("Error creating trip:", error);
        toast.error("Lỗi khi thêm chuyến đi.");
      });

    // Reset form
    setTripName("");
    setStartDate("");
    setEndDate("");
    setTripDescription("");
  };


  const formatTime = (dateTime) => {
    if (!dateTime) return "";
    const date = new Date(dateTime);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };


  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Các Địa Điểm Du Lịch Nổi Bật Tại: 🗺 {addressFilter}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {places.map((place, index) => (
          <Card
            key={index}
            imageUrl={place.placeimages[0]?.image || ""}
            title={place.nameplace}
            description={place.description}
            onClick={() => openModal(place)}
          />
        ))}
      </div>

      {isModalVisible && selectedCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-lg relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              ❎
            </button>
            <img
              src={selectedCard.placeimages[0]?.image || ""}
              alt={selectedCard.nameplace}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">{selectedCard.nameplace}</h3>
            <div className="flex items-center mb-4">
              <FaMapMarkerAlt className="text-gray-600 mr-2" />
              <span className="text-gray-700">{selectedCard.description}</span>
            </div>
            <form onSubmit={handleSaveTrip}>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Thời Gian Bắt Đầu: {selectedDate}
                </label>
                <input
                  type="time"
                  value={startDate || formatTime(selectedDate)}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <input
                type="hidden"
                value={selectedCard.nameplace}
                onChange={(e) => setTripName(e.target.value)} // Update tripName
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Thời Gian Kết Thúc: {selectedDate}
                </label>

                <input
                  type="time"
                  value={endDate || formatTime(selectedDate)}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Mô Tả Lịch Trình:
                </label>
                <textarea
                  value={tripDescription}
                  onChange={(e) => setTripDescription(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập mô tả chi tiết"
                  rows="4"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded-md mt-4 hover:bg-blue-600 transition duration-200"
              >
                Lưu Lịch Trình
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsPlace;
