import React, { useState, useEffect } from "react";
import FriendService from "../../../Services/user/FriendService";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for toast notifications
import Modal from 'react-modal'; // Import react-modal for modal

const FriendTipList = () => {
  const [suggestedFriends, setSuggestedFriends] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const username = Cookies.get("username");

    if (!username) {
      setError("Username is required to fetch suggested friends.");
      return;
    }

    // lấy gọi ý kết bạn
    FriendService.fetchSuggestedFriends(username)
      .then((response) => {
        setSuggestedFriends(response.data);
      })
      .catch((err) => {
        setError("Failed to fetch suggested friends: " + err.message);
        console.error(err);
      });
  }, []);

  const handleAddFriend = (usernameTarget) => {
    const username = Cookies.get("username"); 

    if (!username) {
      setError("Username is required to send a friend request.");
      return;
    }

    FriendService.handleAddFriend(usernameTarget)
      .then(() => {
       
        FriendService.fetchSuggestedFriends(username)
          .then((response) => {
            setSuggestedFriends(response.data);
            toast.success("Đã gửi yêu cầu kết bạn");
          })
          .catch((err) => {
            setError("Failed to refresh suggested friends: " + err.message);
            console.error(err);
          });
      })
      .catch((err) => {
        setError("Failed to send friend request: " + err.message);
        console.error("Error sending friend request:", err);
        toast.error("Failed to send friend request.");
      });
  };

  return (
    <div className="bg-purple-300 p-6 text-white">
      <h2 className="text-3xl font-bold mb-6">Những người bạn có thể biết:</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mt-6">
        {error && (
          <p className="col-span-full text-center text-red-500">{error}</p>
        )}

        {suggestedFriends.length > 0 ? (
          suggestedFriends.map((friend) => (
            <div
              key={friend.username}
              className="bg-purple-500 text-white rounded-lg p-4 text-center shadow-lg"
            >
              <img
                src={""}
                alt={friend.username}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <div className="text-lg mb-2">
                {friend.lastname} {friend.firstname}
              </div>
              <div className="text-sm mb-4">
                {friend.mutualFriends || 0} bạn chung
              </div>
              <div className="flex flex-col gap-4">
                <button
                  onClick={() => handleAddFriend(friend.username)}
                  className="bg-blue-600 text-white py-2 rounded-lg w-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200"
                >
                  Thêm bạn bè
                </button>
                <button className="bg-gray-600 text-white py-2 rounded-lg w-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 transition duration-200">
                  Xóa
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center">Không có gợi ý bạn bè nào.</p>
        )}
      </div>
    </div>
  );
};

export default FriendTipList;
