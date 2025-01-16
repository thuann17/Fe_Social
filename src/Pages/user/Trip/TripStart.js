import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { FaRegClock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TripService from "../../../Services/user/TripService";
import ConfirmationModal from "../../../Components/nofi/ConfirmationModal";

const TripItem = ({ trip, onDelete, onUpdate, onAddFriends }) => {
  const placeImageUrl = trip.placetrips?.[0]?.placeid?.placeimages?.[0]?.image;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isPastTrip = (startDate, endDate) => {
    const currentDate = new Date();
    const tripStartDate = new Date(startDate);
    const tripEndDate = new Date(endDate);

    // Check if both start and end dates are in the past
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
        className={`relative flex p-5 bg-white rounded-lg shadow-md mb-5 ${
          tripIsPast ? "opacity-50 bg-gray-500" : "" // Apply dimming if it's a past trip
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
          <p className="text-lg text-gray-600 mb-3">{trip.description}</p>

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
              onClick={() => onAddFriends(trip)}
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
            >
              Thêm bạn bè vào chuyến đi
            </button>
            <button
              onClick={() => onUpdate(trip)}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
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
  const navigate = useNavigate();
  const username = Cookies.get("username");

  useEffect(() => {
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

    axios
      .get(`http://localhost:8080/api/friend-requests/${username}`)
      .then((response) => {
        setFriends(response.data);
      })
      .catch(() => {
        toast.error("Không thể tải danh sách bạn bè.");
      });
  }, [username]);

  const handleAddTrip = () => {
    navigate(`/cal`);
  };

  const handleAddFriends = (trip) => {
    setSelectedTrip(trip);
    setShowAddFriendsModal(true);
  };

  const handleUpdateTrip = (trip) => {
    setSelectedTrip(trip);
    setTripDetails({
      tripname: trip.tripname,
      description: trip.description,
      startdate: trip.startdate,
      enddate: trip.enddate,
      createdate: trip.createdate,
    });
    setShowUpdateModal(true);
  };

  const handleDeleteTrip = (tripid) => {
    setTrips((prevTrips) => prevTrips.filter((trip) => trip.tripid !== tripid));
  };

  const handleAddFriendToTrip = () => {
    if (selectedFriend) {
      axios
        .post(`http://localhost:8080/api/trips/${selectedTrip.id}/add-friend`, {
          friendId: selectedFriend,
        })
        .then(() => {
          toast.success("Bạn đã thêm bạn đồng hành vào chuyến đi.");
          setShowAddFriendsModal(false);
        })
        .catch(() => {
          toast.error("Thêm bạn đồng hành thất bại.");
        });
    } else {
      toast.warning("Chưa chọn bạn bè.");
    }
  };
  const handleUpdateTripDetails = () => {
    const { description, startdate, enddate } = tripDetails;

    const startDateTime = new Date(startdate);
    const endDateTime = new Date(enddate);

    if (startDateTime >= endDateTime) {
      toast.error("❗ Ngày bắt đầu phải trước ngày kết thúc.");
      return;
    }

    const formattedStartDate = startDateTime.toISOString().slice(0, 16);
    const formattedEndDate = endDateTime.toISOString().slice(0, 16);

    if (selectedTrip) {
      axios
        .put(`http://localhost:8080/api/user/trip/${selectedTrip.tripid}`, {
          description,
          startdate: formattedStartDate,
          enddate: formattedEndDate,
        })
        .then(() => {
          toast.success("Cập nhật chuyến đi thành công.");
          setShowUpdateModal(false);
        })
        .catch(() => {
          toast.error("Cập nhật chuyến đi thất bại.");
        });
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
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
        Danh sách chuyến đi:
      </h2>
      <div className="mb-4 flex items-center">
        <label className="block text-sm font-semibold text-gray-700 mr-4">
          Tìm kiếm chuyến đi theo ngày:
        </label>
        <input
          type="date"
          value={filterStartDate}
          onChange={(e) => setFilterStartDate(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md mr-4"
        />
        <button
          onClick={handleFilterByStartDate}
          className="bg-blue-300 text-white py-2 px-4 rounded-md hover:bg-blue-500"
        >
          🔍
        </button>
      </div>
      <TripList
        trips={filteredTrips}
        onDelete={handleDeleteTrip}
        onUpdate={handleUpdateTrip}
        onAddFriends={handleAddFriends}
      />
      {showAddFriendsModal && selectedTrip && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-semibold mb-4">
              Thêm bạn bè vào chuyến đi
            </h3>
            <select
              value={selectedFriend}
              onChange={(e) => setSelectedFriend(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md mb-4"
            >
              <option value="">Chọn bạn bè</option>
              {friends.map((friend) => (
                <option
                  key={friend.friendUserName}
                  value={friend.friendUserName}
                >
                  {friend.friendName}
                </option>
              ))}
            </select>
            <div className="flex justify-end gap-2">
              <button
                onClick={handleAddFriendToTrip}
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
              >
                Thêm
              </button>
              <button
                onClick={() => setShowAddFriendsModal(false)}
                className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

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
            <label className="block text-sm font-semibold text-gray-700">
              Ngày bắt đầu:
            </label>
            <input
              type="datetime-local"
              value={
                tripDetails.startdate ? tripDetails.startdate.slice(0, 16) : ""
              }
              onChange={(e) =>
                setTripDetails({ ...tripDetails, startdate: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-md mb-4"
            />
            <label className="block text-sm font-semibold text-gray-700">
              Ngày kết thúc:
            </label>
            <input
              type="datetime-local"
              value={
                tripDetails.enddate ? tripDetails.enddate.slice(0, 16) : ""
              }
              onChange={(e) =>
                setTripDetails({ ...tripDetails, enddate: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-md mb-4"
            />
            <label className="block text-sm font-semibold text-gray-700">
              Mô tả:
            </label>
            <textarea
              value={tripDetails.description}
              onChange={(e) =>
                setTripDetails({ ...tripDetails, description: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-md mb-4"
              rows="4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={handleUpdateTripDetails}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Cập nhật
              </button>
              <button
                onClick={() => setShowUpdateModal(false)}
                className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400"
              >
                Đóng
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
