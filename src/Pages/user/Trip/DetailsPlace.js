import React, { useState, useEffect, useRef } from "react";
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
  const selectedDate = location.state?.selectedDate; // selectedDate is passed via navigation state
  const username = Cookies.get("username");

  const modalRef = useRef(null); // Create a ref to the modal

  useEffect(() => {
    getDetailPlace();
  }, [addressFilter]);

  useEffect(() => {
    // Close the modal when clicking outside of it
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    // Add event listener for clicks outside of modal
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
    setTripName(`Chuyến đi ${card.nameplace}`);
    setSelectedCard(card);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedCard(null);
    setModalVisible(false);
  };

  const handleSaveTrip = (e) => {
    e.preventDefault();

    if (!startDate || !endDate) {
      toast.error("Vui lòng nhập đầy đủ thời gian bắt đầu và kết thúc.");
      return;
    }

    const startDateTime = new Date(`${selectedDate}T${startDate}`);
    const endDateTime = new Date(`${selectedDate}T${endDate}`);

    if (isNaN(startDateTime.getTime()) || isNaN(endDateTime.getTime())) {
      toast.error("Giá trị thời gian không hợp lệ.");
      return;
    }
    if (startDateTime >= endDateTime) {
      toast.error("Thời gian kết thúc phải sau thời gian bắt đầu.");
      return;
    }

    const timeDifference = (endDateTime - startDateTime) / (1000 * 60);
    if (timeDifference < 30) {
      toast.error("Thời gian kết thúc phải sau ít nhất 30 phút so với thời gian bắt đầu.");
      return;
    }

    const tripData = {
      tripName,
      startDate: startDateTime.toISOString(),
      endDate: endDateTime.toISOString(),
      description: selectedCard.description,
      placeId: selectedCard.id,
      note: tripDescription,
    };

    TripService.createTrip(username, tripData)
      .then((response) => {
        closeModal();
        toast.success("Đã thêm chuyến đi thành công");
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.message) {
          closeModal();
          toast.error(error.response.data.message);
        }
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

  const formatDate = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng tính từ 0
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
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
          <div
            ref={modalRef} // Assign ref to modal container
            className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-lg relative"
          >
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
              <input
                type="hidden"
                value={selectedCard.nameplace}
                onChange={(e) => setTripName(e.target.value)} // Update tripName
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Thời Gian Bắt Đầu: {formatDate(selectedDate)}
                </label>
                <input
                  type="time"
                  value={startDate || ""}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Thời Gian Kết Thúc: {formatDate(selectedDate)}
                </label>
                <input
                  type="time"
                  value={endDate || ""}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Ghi Chú</label>
                <textarea
                  value={tripDescription}
                  onChange={(e) => setTripDescription(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Mô tả chuyến đi"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
              >
                Lưu Chuyến Đi
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsPlace;
