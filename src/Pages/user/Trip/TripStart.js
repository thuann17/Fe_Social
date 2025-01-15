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
      <li className="relative flex p-5 bg-white rounded-lg shadow-md mb-5">
        <img
          src={placeImageUrl || "default-image-url.jpg"}
          alt={trip.tripname}
          className="w-44 h-44 object-cover rounded-lg mr-5"
        />
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{trip.tripname}</h3>
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
            {new Date(trip.startdate).toLocaleDateString("vi-VN")} -{" "}
            {new Date(trip.startdate).toLocaleTimeString("vi-VN", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>

          <p className="text-sm text-gray-600 flex items-center mb-2">
            <FaRegClock className="mr-2 text-gray-500" />
            <strong>Kết thúc:</strong>&nbsp;
            {new Date(trip.enddate).toLocaleDateString("vi-VN")} -{" "}
            {new Date(trip.enddate).toLocaleTimeString("vi-VN", {
              hour: "2-digit",
              minute: "2-digit",
            })}
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
  const navigate = useNavigate();
  const username = Cookies.get("username");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/user/trip/tripplace/${username}`)
      .then((response) => {
        setTrips(response.data);
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
    const { description, startDate, endDate } = tripDetails;
  
    // Chuyển đổi ngày bắt đầu và kết thúc thành đối tượng Date
    const startDateTime = new Date(startDate);
    const endDateTime = new Date(endDate);
  
    // Kiểm tra nếu ngày bắt đầu sau ngày kết thúc
    if (startDateTime >= endDateTime) {
      toast.error("❗ Ngày bắt đầu phải trước ngày kết thúc.");
      return;
    }
  
    const formattedStartDate = startDateTime.toISOString().slice(0, 19).replace("T", " ");
    const formattedEndDate = endDateTime.toISOString().slice(0, 19).replace("T", " ");
  
    console.log("Formatted Start Date:", formattedStartDate);
    console.log("Formatted End Date:", formattedEndDate);
  
    if (selectedTrip) {
      axios
        .put(`http://localhost:8080/api/user/trip/${selectedTrip.tripid}`, {
          description,
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        })
        .then(() => {
          toast.success(" Cập nhật chuyến đi thành công.");
          setShowUpdateModal(false);
        })
        .catch(() => {
          toast.error(" Cập nhật chuyến đi thất bại.");
        });
    }
  };
  
  if (loading) return <p className="text-center">Đang tải chuyến đi...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Danh sách chuyến đi:</h2>
      <TripList
        trips={trips}
        onDelete={handleDeleteTrip}
        onUpdate={handleUpdateTrip}
        onAddFriends={handleAddFriends}
      />
      {showAddFriendsModal && selectedTrip && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Thêm bạn bè vào chuyến đi</h3>
            <select
              value={selectedFriend}
              onChange={(e) => setSelectedFriend(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md mb-4"
            >
              <option value="">Chọn bạn bè</option>
              {friends.map((friend) => (
                <option key={friend.friendUserName} value={friend.friendUserName}>
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
            <label className="block text-sm font-semibold text-gray-700">Tên chuyến đi:</label>
            <input
              type="text"
              value={tripDetails.tripname}
              disabled
              onChange={(e) => setTripDetails({ ...tripDetails, tripname: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-md mb-4"
            />
            <label className="block text-sm font-semibold text-gray-700">Ngày bắt đầu:</label>
            <input
              type="datetime-local"
              value={tripDetails.startdate}
              onChange={(e) => setTripDetails({ ...tripDetails, startdate: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-md mb-4"
            />
            <label className="block text-sm font-semibold text-gray-700">Ngày kết thúc:</label>
            <input
              type="datetime-local"
              value={tripDetails.enddate}
              onChange={(e) => setTripDetails({ ...tripDetails, enddate: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-md mb-4"
            />
            <label className="block text-sm font-semibold text-gray-700">Mô tả:</label>
            <textarea
              value={tripDetails.description}
              onChange={(e) => setTripDetails({ ...tripDetails, description: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-md mb-4"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={handleUpdateTripDetails}
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
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
