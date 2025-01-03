import React, { useState, useEffect } from "react";
import FriendService from "../../../Services/user/FriendService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import "./FriendList.css";

Modal.setAppElement("#root");

const FriendList = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requestToDelete, setRequestToDelete] = useState(null);

  useEffect(() => {
    // Fetch friends list
    FriendService.getFriend()
      .then((response) => {
        setFriends(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch friends: " + err.message);
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleDeleteRequest = (id) => {
    setRequestToDelete(id);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (requestToDelete) {
      FriendService.deleteFriendRequest(requestToDelete)
        .then(() => {
          setFriends((prevFriends) =>
            prevFriends.filter((friend) => friend.id !== requestToDelete)
          );
          setIsModalOpen(false);
          toast.success("Đã xóa bạn!");
        })
        .catch((err) => {
          setError("Không xóa được yêu cầu kết bạn: " + err.message);
          console.error("Lỗi khi xóa yêu cầu kết bạn:", err);
          toast.error("Không xóa được yêu cầu kết bạn.");
          setIsModalOpen(false);
        });
    }
  };

  const cancelDelete = () => {
    setIsModalOpen(false); 
  };

  return (
    <div className="bg-purple-300 p-6 text-white">
      <h2 className="text-3xl font-bold mb-6">Danh sách bạn bè:</h2>

      {loading ? (
        <p className="text-center">Đang tải...</p>
      ) : error ? (
        <p className="text-red-500 text-center mt-4">{error}</p>
      ) : friends.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mt-6">
          {friends.map((friend) => (
            <div
              key={friend.id}
              className="bg-purple-500 text-white rounded-lg p-4 text-center shadow-lg"
            >
              <img
                src={friend.friendAvatar || "/path/to/placeholder.jpg"} // Placeholder image
                alt={friend.name || "Avatar"}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <div className="text-lg mb-2">
                {friend.friendName || "Tên bạn không khả dụng"}
              </div>
              <div className="text-sm mb-4">
                {friend.mutualFriends || 0} bạn chung
              </div>
              <div className="flex flex-col gap-4">
                <button
                  className="bg-gray-600 text-white py-2 rounded-lg w-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 transition duration-200"
                  onClick={() => handleDeleteRequest(friend.id)}
                >
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="col-span-full text-center">Không có bạn bè nào.</p>
      )}

      {/* Modal Confirmation */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={cancelDelete}
        contentLabel="Xác nhận xóa"
        className={`modal ${isModalOpen ? "open" : ""}`}
        overlayClassName="overlay"
      >
        <h2 className="text-xl font-semibold mb-4">
          Xác nhận xóa bạn
        </h2>
        <p>Bạn có chắc chắn muốn xóa bạn này không?</p>
        <div className="flex justify-between mt-4">
          <button
            className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
            onClick={confirmDelete}
          >
            Xóa
          </button>
          <button
            className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700"
            onClick={cancelDelete}
          >
            Hủy
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default FriendList;
