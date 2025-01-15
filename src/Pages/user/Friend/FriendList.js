
import React, { useState, useEffect } from "react";
import FriendService from "../../../Services/user/FriendService";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
// import "./FriendList.css";

Modal.setAppElement("#root");

const CombinedFriendComponents = () => {
  const handleImageClick = (username) => {
    navigate(`/friendprofile/${username}`, {});
  };


  const navigate = useNavigate();
  const [friends, setFriends] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [suggestedFriends, setSuggestedFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [requestToDelete, setRequestToDelete] = useState(null);
  const [requestToAdd, setRequestToAdd] = useState(null);

  const fetchData = () => {


    const username = Cookies.get("username");
    if (!username) {
      setError("Username is required to fetch data.");
      return;
    }

    setLoading(true); // Show loading indicator

    Promise.all([
      FriendService.getFriend(),
      FriendService.getFollowers(),
      FriendService.fetchSuggestedFriends(username),
    ])
      .then(([friendsResponse, followersResponse, suggestedResponse]) => {
        setFriends(friendsResponse.data);
        setFollowers(followersResponse.data);
        setSuggestedFriends(suggestedResponse.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch data: " + err.message);
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
  }, []);

  const handleDeleteRequest = (id) => {
    setRequestToDelete(id);
    setIsModalOpen(true);
  };

 
  const confirmDelete = () => {
    FriendService.deleteFriendRequest(requestToDelete)
      .then(() => {
        fetchData();
        setIsModalOpen(false);
        toast.success("Xóa thành công!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((err) => {
        setError("Failed to delete: " + err.message);
        console.error(err);
        toast.error("Xóa thất bại.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setIsModalOpen(false);
      });
  };

  const cancelDelete = () => setIsModalOpen(false);

  const handleRequestToAddFriend = (usernameTarget) => {
    setRequestToAdd(usernameTarget);
    setIsAddModalOpen(true);
  };

  const confirmAddFriend = () => {
    FriendService.handleAddFriend(requestToAdd)
      .then(() => {
        // Reload the data after add friend operation
        fetchData();
        toast.success("Đã gửi yêu cầu kết bạn!");
        setIsAddModalOpen(false);
      })
      .catch((err) => {
        setError("Failed to send friend request: " + err.message);
        console.error(err);
        toast.error("Failed to send friend request.");
        setIsAddModalOpen(false);
      });
  };

  const cancelAddFriend = () => setIsAddModalOpen(false);

  const handleUpdateStatus = (id) => {
    FriendService.acceptFriendRequest(id)
      .then((updatedFriend) => {
        setFollowers((prev) =>
          prev.map((follower) =>
            follower.id === id ? updatedFriend : follower
          )
        );

        fetchData();

        toast.success("Đã chấp nhận yêu cầu kết bạn");
      })
      .catch((err) => {
        setError("Failed to update status: " + err.message);
        console.error(err);
        toast.error("Failed to accept friend request.");
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-purple-300 p-6 text-white">
      {/* Toast Container */}
      <ToastContainer />

      {/* Friend List Section */}
      <h2 className="text-3xl font-bold mb-6">Bạn bè:</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mt-6">
        {friends.length > 0 ? (
          friends.map((friend) => (
            <div
              key={friend.id}
              className="bg-purple-500 rounded-lg p-4 text-center shadow-lg"
            >
              <img
                src={friend.friendAvatar}
                alt={friend.friendName}
                className="w-full h-48 object-cover rounded-lg mb-4"
                onClick={() => handleImageClick(friend.friendUserName)}
              />
              <div className="text-lg mb-2">
                {friend.friendName || "Unnamed"}
              </div>
              <button
                onClick={() => handleDeleteRequest(friend.id)}
                className="bg-gray-600 py-2 rounded-lg w-full hover:bg-gray-700"
              >
                Hủy kết bạn
              </button>
            </div>
          ))
        ) : (
          <p>Không có bạn bè</p>
        )}
      </div>

      {/* Friend Requests Section */}
      <h2 className="text-3xl font-bold mt-12 mb-6">Yêu cầu kết bạn:</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mt-6">
        {followers.length > 0 ? (
          followers.map((follower) => (
            <div
              key={follower.id}
              className="bg-purple-500 rounded-lg p-4 text-center shadow-lg"
            >
              <img
                src={follower.friendAvatar}
                alt={follower.friendName}
                className="w-full h-48 object-cover rounded-lg mb-4"
                onClick={() => handleImageClick(follower.friendUserName)}// Add the click handler here
              />
              <div className="text-lg mb-2">
                {follower.friendName || "Unnamed"}
              </div>
              <button
                onClick={() => handleUpdateStatus(follower.id)}
                className="bg-blue-600 py-2 mb-3 rounded-lg w-full hover:bg-blue-700"
              >
                Đồng ý
              </button>
              <br />
              <button
                onClick={() => handleDeleteRequest(follower.id)}
                className="bg-gray-600 py-2 rounded-lg w-full hover:bg-gray-700"
              >
                Hủy yêu cầu
              </button>
            </div>
          ))
        ) : (
          <p>Không có yêu cầu kết bạn.</p>
        )}
      </div>

      {/* Friend Suggestions Section */}
      <h2 className="text-3xl font-bold mt-12 mb-6">
        Những người bạn có thể biết:
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mt-6">
        {suggestedFriends.length > 0 ? (
          suggestedFriends.map((friend) => (
            <div
              key={friend.username}
              className="bg-purple-500 rounded-lg p-4 text-center shadow-lg"
            >
              <img
                src={friend.images[0]?.avatarrurl}
                alt={friend.username}
                className="w-full h-48 object-cover rounded-lg mb-4"
                onClick={() => handleImageClick(friend.username)}
              />
              <div className="text-lg mb-2">
                {friend.lastname} {friend.firstname}
              </div>
              <button
                onClick={() => handleRequestToAddFriend(friend.username)}
                className="bg-blue-600 py-2 rounded-lg w-full hover:bg-blue-700"
              >
                Thêm bạn bè
              </button>
            </div>
          ))
        ) : (
          <p>Không có gợi ý kết bạn.</p>
        )}
      </div>

      {/* Modal for Confirming Add Friend Request */}
      <Modal
        isOpen={isAddModalOpen}
        onRequestClose={cancelAddFriend}
        contentLabel="Confirm Add Friend"
        className="modal relative p-6 bg-white rounded-lg shadow-xl"
        overlayClassName="overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={cancelAddFriend}
        >
          ✖
        </button>
        <h2 className="text-xl font-semibold mb-4 text-center">
          Xác nhận gửi yêu cầu kết bạn
        </h2>
        <p className="text-gray-700 text-center">
          Bạn có chắc chắn muốn gửi yêu cầu kết bạn đến người này?
        </p>
        <div className="flex justify-end gap-4 mt-6">
          <button
            className="bg-gray-0 text-white py-2 px-6 rounded-lg hover:bg-gray-700 transition-colors"
            onClick={cancelAddFriend}
          >
            Hủy
          </button>
          <button
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
            onClick={confirmAddFriend}
          >
            Gửi yêu cầu
          </button>
        </div>
      </Modal>

      {/* Modal for Confirming Delete Friend */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={cancelDelete}
        contentLabel="Confirm Delete"
        className="modal relative p-6 bg-white rounded-lg shadow-xl"
        overlayClassName="overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={cancelDelete}
        >
          ✖
        </button>
        <h2 className="text-xl font-semibold mb-4 text-center">Xác nhận xóa</h2>
        <p className="text-gray-700 text-center">
          Bạn có chắc chắn muốn xóa người dùng này?
        </p>
        <div className="flex justify-end gap-4 mt-6">
          <button
            className="bg-gray-0 text-white py-2 px-6 rounded-lg hover:bg-gray-700 transition-colors"
            onClick={cancelDelete}
          >
            Hủy
          </button>
          <button
            className="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition-colors"
            onClick={confirmDelete}
          >
            Hủy kết bạn
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default CombinedFriendComponents;
