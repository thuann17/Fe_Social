import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { FaRegClock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TripService from "../../../Services/user/TripService";
import ConfirmationModal from "../../../Components/nofi/ConfirmationModal";
import { formatDate } from "react-calendar/dist/cjs/shared/dateFormatter.js";

const TripItem = ({ trip, onDelete, onUpdate, onAddFriends }) => {
  const placeImageUrl = trip.placetrips?.[0]?.placeid?.placeimages?.[0]?.image;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isPastTrip = (startDate, endDate) => {
    const currentDate = new Date();
    const tripStartDate = new Date(startDate);
    const tripEndDate = new Date(endDate);

    return tripStartDate < currentDate && tripEndDate < currentDate;
  };

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return `${date.toLocaleDateString("vi-VN")} - ${date.toLocaleTimeString(
      "vi-VN",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    )}`;
  };

  const tripIsPast = isPastTrip(trip.startdate, trip.enddate);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = (tripid) => {
    TripService.deleteTrip(tripid)
      .then(() => {
        onDelete(tripid);
        toast.success("Xoá chuyến đi thành công.");
        handleCloseModal();
      })
      .catch(() => {
        toast.error("Không thể xoá chuyến đi này.");
      });
  };

  return (
    <>
      <li
        className={`relative flex p-5 bg-white rounded-lg shadow-md mb-5 ${tripIsPast ? "opacity-50 bg-gray-500" : "" // Apply dimming if it's a past trip
          }`}
      >
        <img
          src={placeImageUrl || "default-image-url.jpg"}
          alt={trip.tripname}
          className="w-44 h-44 object-cover rounded-lg mr-5"
        />
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {trip.tripname}
          </h3>
          <button
            onClick={handleOpenModal}
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-2xl font-bold"
          >
            ❌
          </button>
          <p className="text-lg text-gray-600 mb-3">
            Ghi chú: {trip.description}
          </p>

          <p className="text-sm text-gray-600 flex items-center mb-2">
            <FaRegClock className="mr-2 text-gray-500" />
            <strong>Bắt đầu:</strong>&nbsp;
            {formatDateTime(trip.startdate)}
          </p>

          <p className="text-sm text-gray-600 flex items-center mb-2">
            <FaRegClock className="mr-2 text-gray-500" />
            <strong>Kết thúc:</strong>&nbsp;
            {formatDateTime(trip.enddate)}
          </p>

          <div className="flex justify-end gap-2">
            <button
              onClick={() => onUpdate(trip)}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              disabled={tripIsPast}
            >
              📝 Cập nhật
            </button>
          </div>
        </div>
      </li>
      <ConfirmationModal
        isOpen={isModalOpen}
        onConfirm={() => handleDelete(trip.tripid)}
        onCancel={handleCloseModal}
        message="Bạn có chắc chắn muốn xóa chuyến đi này?"
      />
    </>
  );
};

const TripList = ({ trips, onDelete, onUpdate, onAddFriends }) => {
  return (
    <ul className="list-none p-0 m-0">
      {trips.map((trip, index) => (
        <TripItem
          key={trip.tripid || index}
          trip={trip}
          onDelete={onDelete}
          onUpdate={onUpdate}
          onAddFriends={onAddFriends}
        />
      ))}
    </ul>
  );
};

const TripPage = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddFriendsModal, setShowAddFriendsModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState("");
  const [tripDetails, setTripDetails] = useState({
    tripname: "",
    description: "",
    startdate: "",
    enddate: "",
    createdate: "",
  });
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");
  const navigate = useNavigate();
  const username = Cookies.get("username");

  const formatTimestamp = (timestamp) => {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };
    return new Date(timestamp).toLocaleString("vi-VN", {
      ...options,
      timeZone: "Asia/Ho_Chi_Minh", // Đặt múi giờ Việt Nam
    });
  };

  const fetchTrips = () => {
    axios
      .get(`http://localhost:8080/api/user/trip/tripplace/${username}`)
      .then((response) => {
        const sortedTrips = response.data.sort(
          (a, b) => new Date(b.startdate) - new Date(a.startdate)
        );
        setTrips(sortedTrips);
        setFilteredTrips(sortedTrips);
        setLoading(false);
      })
      .catch(() => {
        setError("Không thể tải danh sách chuyến đi");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTrips(); // Fetch trips when component mounts
  }, [username]);

  const handleAddTrip = () => {
    navigate(`/cal`);
  };

  const handleAddFriends = (trip) => {
    setSelectedTrip(trip);
    setShowAddFriendsModal(true);
  };

  const handleUpdateTrip = (trip) => {
    const formattedStartDate = formatTimestamp(trip.startdate);
    const formattedEndDate = formatTimestamp(trip.enddate);
    const formattedCreateDate = formatTimestamp(trip.createdate);

    setSelectedTrip(trip);
    setTripDetails({
      tripname: trip.tripname,
      description: trip.description,
      startdate: formattedStartDate,
      enddate: formattedEndDate,
      createdate: formattedCreateDate,
    });
    setShowUpdateModal(true);
  };

  const handleDeleteTrip = (tripid) => {
    // Instead of calling the delete API, simply call fetchTrips() to reload the data.
    fetchTrips();
    //  toast.success("Chuyến đi đã được xóa.");
  };
  const handleUpdateTripDetails = () => {
    const { description, startdate, enddate } = tripDetails;

    const startDateTime = startdate
      ? new Date(startdate)
      : new Date(selectedTrip.startDate);
    const endDateTime = enddate
      ? new Date(enddate)
      : new Date(selectedTrip.endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (startDateTime >= endDateTime) {
      toast.error("Ngày kết thúc phải sau ngày bắt đầu.");
      return;
    }
    // Check if the start date is before today
    if (startDateTime < today) {
      toast.error("Ngày bắt đầu không thể trước ngày hôm nay.");
      return;
    }
    // Check if start date is before end date


    // Check if end time is at least 30 minutes after start time
    const timeDifference = endDateTime - startDateTime;
    const thirtyMinutesInMilliseconds = 30 * 60 * 1000;

    if (timeDifference < thirtyMinutesInMilliseconds) {
      toast.error(
        "Thời gian kết thúc phải sau ít nhất 30 phút từ thời gian bắt đầu."
      );
      return;
    }

    if (selectedTrip) {
      axios
        .put(`http://localhost:8080/api/user/trip/${selectedTrip.tripid}`, {
          description,
          startDate: startDateTime,
          endDate: endDateTime,
        })
        .then(() => {
          toast.success("Cập nhật chuyến đi thành công.");
          setShowUpdateModal(false);
          fetchTrips(); // Refresh the trips list after update
        })
        .catch(() => {
          toast.error("Cập nhật chuyến đi thất bại.");
        });
    }
  };

  const handleFilterByDate = () => {
    if (filterStartDate && filterEndDate) {
      let filterStart = new Date(filterStartDate);
      let filterEnd = new Date(filterEndDate);

      if (filterEnd < filterStart) {
        filterEnd = new Date(filterStart);
        filterEnd.setDate(filterEnd.getDate() + 1);
        setFilterEndDate(filterEnd.toISOString().split("T")[0]);
      }

      const filtered = trips.filter((trip) => {
        const tripStartDate = new Date(trip.startdate);
        const tripEndDate = new Date(trip.enddate);

        return tripStartDate >= filterStart && tripEndDate <= filterEnd;
      });

      setFilteredTrips(filtered);
    } else {
      setFilteredTrips(trips);
    }
  };

  const handleFilterByStartDate = () => {
    if (filterStartDate) {
      const filtered = trips.filter(
        (trip) =>
          new Date(trip.startdate).toLocaleDateString("vi-VN") ===
          new Date(filterStartDate).toLocaleDateString("vi-VN")
      );
      setFilteredTrips(filtered);
    } else {
      setFilteredTrips(trips);
    }
  };

  if (loading) return <p className="text-center">Đang tải chuyến đi...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-100 min-h-screen">
      <div className="mb-4 flex justify-between items-center">
        <label className="block text-ml font-semibold text-gray-700 mr-4">
          Tìm kiếm chuyến đi theo ngày:
        </label>
        <div className="flex items-center space-x-4">
          <input
            type="date"
            value={filterStartDate}
            onChange={(e) => setFilterStartDate(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          />
          <input
            type="date"
            value={filterEndDate}
            onChange={(e) => setFilterEndDate(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          />
          <button
            onClick={handleFilterByDate}
            className="bg-blue-300 text-white py-2 px-4 rounded-md hover:bg-blue-500"
          >
            🔍
          </button>
        </div>
      </div>

      <TripList
        trips={filteredTrips}
        onDelete={handleDeleteTrip}
        onUpdate={handleUpdateTrip}
        onAddFriends={handleAddFriends}
      />
      {showUpdateModal && selectedTrip && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Cập nhật chuyến đi</h3>
            <label className="block text-sm font-semibold text-gray-700">
              Tên chuyến đi:
            </label>
            <input
              type="text"
              value={tripDetails.tripname}
              disabled
              onChange={(e) =>
                setTripDetails({ ...tripDetails, tripname: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-md mb-4"
            />
            <label className="block text-sm font-semibold text-gray-700 flex items-center">
              Ngày bắt đầu:
              <p className="m-0 p-0 ml-2">{tripDetails.startdate}</p>
            </label>
            <input
              type="datetime-local"
              value={tripDetails.startdate}
              onChange={(e) =>
                setTripDetails({ ...tripDetails, startdate: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-md mb-4"
            />
            <label className="block text-sm font-semibold text-gray-700 flex items-center">
              Ngày kết thúc:
              <p className="m-0 p-0 ml-2">{tripDetails.enddate}</p>
            </label>
            <input
              type="datetime-local"
              value={tripDetails.enddate}
              onChange={(e) =>
                setTripDetails({ ...tripDetails, enddate: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-md mb-4"
            />
            <label className="block text-sm font-semibold text-gray-700">
              Mô tả chuyến đi:
            </label>
            <textarea
              rows={4}
              value={tripDetails.description}
              onChange={(e) =>
                setTripDetails({
                  ...tripDetails,
                  description: e.target.value,
                })
              }
              className="w-full p-3 border border-gray-300 rounded-md mb-4"
            />
            <div className="flex justify-between items-center">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                onClick={handleUpdateTripDetails}
              >
                Cập nhật
              </button>
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                onClick={() => setShowUpdateModal(false)}
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
      <button
        onClick={handleAddTrip}
        className="fixed bottom-8 right-15 bg-blue-600 text-white py-3 px-6 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
      >
        ➕ Thêm chuyến đi
      </button>
    </div>
  );
};

export default TripPage;
