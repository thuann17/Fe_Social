import React, { useState } from "react";
import "./post.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEllipsisH } from "react-icons/fa";
import PostService from "../../../Services/user/PostService";

const Share = ({ share, onDelete, onNewShare }) => {
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

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
      timeZone: "Asia/Ho_Chi_Minh",
    });
  };


  const formattedTime = new Date().toLocaleString();

  const toggleOptionsVisibility = () => {
    setIsOptionsVisible((prevState) => !prevState);
  };

  const handleDelete = async () => {
    try {
      await PostService.deleteShare(share.id);
      onDelete(share.id);
      setShowConfirmModal(false);
      toast.success("Đã xóa bài viết thành công!");
    } catch (error) {
      console.error("Error while deleting the post:", error);
      toast.error("❌ Xóa bài viết thất bại!");
    }
  };

  return (
    <div className="post-container shadow-lg rounded-lg overflow-hidden bg-white my-4 mx-auto max-w-3xl">
      <div className="post-header flex items-center p-4 border-b border-gray-200">
        <img
          src={share.username?.images[0]?.avatarrurl || "default-avatar-url"}
          alt="Avatar"
          className="w-14 h-14 rounded-full mr-4 border border-gray-300"
        />
        <div>
          <h4 className="text-xl font-semibold text-gray-800">
            {share.username?.lastname} {share.username?.firstname}
          </h4>
          <span className="text-gray-500 text-sm">
            Đã chia sẻ vào {formatTimestamp(formattedTime)}
          </span>
        </div>
        <div className="ml-auto relative">
          <button
            className="text-gray-600 p-2 rounded-full hover:bg-gray-200 focus:outline-none"
            onClick={toggleOptionsVisibility}
          >
            <FaEllipsisH size={10} />
          </button>
          {isOptionsVisible && (
            <div className="absolute right-0 top-8 bg-white shadow-lg rounded-lg p-4">
              <button
                className="text-red-500 hover:bg-red-100 rounded-md whitespace-nowrap"
                onClick={() => setShowConfirmModal(true)}
              >
                Xóa bài chia sẻ
              </button>
            </div>
          )}
        </div>
      </div>
      <p className="pl-5 text-gray-900 text-lg mb-4">{share.content}</p>
      <hr />
      <div className="shared-post-content p-6">
        <div className="shared-post-header flex items-center mb-4">
          <img
            src={share.post.username?.images[0]?.avatarrurl || "default-avatar-url"}
            alt="Post Avatar"
            className="w-12 h-12 rounded-full mr-4 border border-gray-300"
          />
          <h5 className="text-lg font-semibold text-gray-700">
            {share.post.username?.lastname} {share.post.username?.firstname}
          </h5>
        </div>
        <p>{share.post.content}</p>
        {share.post.postimages && share.post.postimages.length > 0 && (
          <div className="post-content">
            {share.post.postimages.length === 1 ? (
              <img
                src={share.post.postimages[0].image}
                alt="Post"
                className="w-full h-auto object-cover rounded-lg mt-4"
              />
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
                {share.post.postimages.map((img) => (
                  <img
                    key={img.id}
                    src={img.image}
                    alt="Post"
                    className="w-full h-40 object-cover rounded-lg"
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p>Bạn có chắc muốn xóa bài chia sẻ này không?</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg mr-2"
              >
                Hủy
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Share;
