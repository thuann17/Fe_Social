import React, { useState, useEffect } from "react";
import FriendService from "../../../Services/user/FriendService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import "./FriendList.css";

Modal.setAppElement("#root");

const FriendRequestList = () => {
  const [followers, setFollowers] = useState([]);
  const [error, setError] = useState(null);
  const [followersError, setFollowersError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requestToDelete, setRequestToDelete] = useState(null);

  useEffect(() => {
    // Fetch the list of followers
    FriendService.getFollowers()
      .then((response) => {
        setFollowers(response.data);
      })
      .catch((err) => {
        setFollowersError("Failed to fetch followers: " + err.message);
        console.error(err);
      });
  }, []);

  const handleDeleteRequest = (id) => {
    setRequestToDelete(id);
    setIsModalOpen(true);
  };

  const handleUpdateStatus = async (id) => {
    try {
      const updatedFriend = await FriendService.acceptFriendRequest(id);

      // Update the status of the follower
      setFollowers(
        followers.map((follower) =>
          follower.id === updatedFriend.id ? updatedFriend : follower
        )
      );

      toast.success("Đã chấp nhận yêu cầu kết bạn!");

      // Re-fetch the list of followers
      FriendService.getFollowers()
        .then((response) => {
          setFollowers(response.data);
        })
        .catch((err) => {
          setFollowersError("Failed to fetch followers: " + err.message);
          console.error(err);
        });

    } catch (err) {
      setError("Failed to update friend status");
      toast.error("Error updating friend status");
    }
  };

  const confirmDelete = () => {
    console.log("Request to delete:", requestToDelete); 
    FriendService.deleteFriendRequest(requestToDelete)
      .then(() => {
        // Remove the follower from the list
        setFollowers((prevFollowers) =>
          prevFollowers.filter((follower) => follower.id !== requestToDelete)
        );
        setIsModalOpen(false);
        toast.success("Yêu cầu kết bạn đã xóa thành công!");
      })
      .catch((err) => {
        setError("Không xóa được yêu cầu kết bạn: " + err.message);
        console.error("Lỗi khi xóa yêu cầu kết bạn:", err);
        toast.error("Không xóa được yêu cầu kết bạn.");
        setIsModalOpen(false);
      });
  };

  const cancelDelete = () => {
    setIsModalOpen(false); // Close modal if cancelled
  };

  return (
    <div className="bg-purple-300 p-6 text-white">
      <h2 className="text-3xl font-bold mb-6">Yêu cầu kết bạn:</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mt-6">
        {followers.length > 0 ? (
          followers.map((follower) => (
            <div
              key={follower.id}
              className="bg-purple-500 text-white rounded-lg p-4 text-center shadow-lg"
            >
              <img
                src={follower.friendAvatar || "/path/to/placeholder.jpg"} // Placeholder image
                alt={follower.name || "Avatar"}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <div className="text-lg mb-2">
                {follower.friendName || "No friend name available"}
              </div>
              <div className="text-sm mb-4">
                {follower.mutualFriends || 0} bạn chung
              </div>
              <div className="flex flex-col gap-4">
                <button
                  className="bg-blue-600 text-white py-2 rounded-lg w-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200"
                  onClick={() => handleUpdateStatus(follower.id)}
                >
                  Xác nhận
                </button>
                <button
                  className="bg-gray-600 text-white py-2 rounded-lg w-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 transition duration-200"
                  onClick={() => handleDeleteRequest(follower.id)}
                >
                  Xóa
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center">
            Không có gợi ý bạn bè nào.
          </p>
        )}
      </div>

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      {followersError && (
        <p className="text-red-500 text-center mt-4">{followersError}</p>
      )}

      {/* Modal Confirmation */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={cancelDelete}
        contentLabel="Confirm Delete"
        className={`modal ${isModalOpen ? "open" : ""}`}
        overlayClassName="overlay"
      >
        <h2 className="text-xl font-semibold mb-4">
          Xác nhận xóa yêu cầu kết bạn
        </h2>
        <p>Bạn có chắc chắn muốn xóa yêu cầu kết bạn này không?</p>
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

export default FriendRequestList;
