import React, { useState, useEffect, useRef } from "react";
import "./post.css";
import PostService from "../../../Services/user/PostService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import UserService from "../../../Services/user/UserService";

const Post = ({ post, onDelete, onNewShare }) => {
  const navigate = useNavigate();
  const [likes, setLikes] = useState(post.countLike || 0);
  const [comments, setComments] = useState(post.comments || []);
  const [newComment, setNewComment] = useState("");
  const [createDate, setCreateDate] = useState("");
  const [isLiked, setIsLiked] = useState(post.likedByUser || false);
  const [showComments, setShowComments] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showCommentMenu, setShowCommentMenu] = useState(null);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareContent, setShareContent] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const currentUser = Cookies.get("username");

  const menuRef = useRef(null);
  // websocket
  const handleLikeNotification = (message) => {
    toast.info(message); // Hiển thị thông báo
  };

  const handleClick = (username) => {
    navigate(`/friendprofile/${username}`, {});
  };

  // Like Post Handler
  const likePost = async (postId) => {
    const username = Cookies.get("username");
    setLikes((prevLikes) => prevLikes + 1);
    setIsLiked(true);
    try {
      await PostService.likePost(postId, username);
      toast.success("Đã thích bài viết!");
    } catch (error) {
      console.error("Error while liking the post:", error);
      toast.error("Lỗi khi thích bài viết!");
      setLikes((prevLikes) => prevLikes - 1);
      setIsLiked(false);
    }
  };

  // Unlike Post Handler
  const unLikePost = async (postId) => {
    const username = Cookies.get("username");
    try {
      await PostService.unLikePost(postId, username);
      setLikes((prev) => prev - 1);
      setIsLiked(false);
      toast.success("Đã bỏ thích bài viết!");
    } catch (error) {
      console.error("Error while unliking the post:", error);
      toast.error("Lỗi khi bỏ thích bài viết!");
    }
  };

  // Handle Like Button Click
  const handleLike = async () => {
    try {
      if (isLiked) {
        await unLikePost(post.id);
      } else {
        await likePost(post.id);
      }
      setIsLiked(!isLiked); // Toggle like status
    } catch (error) {
      console.error("Error while liking/unliking the post:", error);
    }
  };


  const handleComment = async () => {
    const username = Cookies.get("username");
  
    try {
      // Fetch user information
      const userData = await UserService.getInfo(username);
      setUserInfo(userData);
    
      await PostService.commentPost(post.id, newComment);
      
      const user = {
        lastname: userData.lastname,
        firstname: userData.firstname,
        avatar: userData.avatarUrl,  
      };
      console.log(userData.avatarUrl);
  
      const formattedTime = new Date().toLocaleString();
  
      const newCommentObject = {
        id: Date.now(),
        username: user,
        content: newComment,
        avatar: userData.avatarUrl,
        time: formattedTime,
        createdate: new Date(),
      };

      // Update comments list with the new comment
      setComments((prev) => {
        const updatedComments = [newCommentObject, ...prev];
        return updatedComments.sort((a, b) => b.createdate - a.createdate); // Sort based on createdate (Date object)
      });
     
      
      // Clear the input field after posting
      setNewComment("");
    } catch (err) {
      console.error("Error while posting comment:", err);
    }
  };
  

  const toggleComments = () => setShowComments((prev) => !prev);

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

  const handleShare = () => {
    setShowShareModal(true);
  };

  const formattedTime = new Date().toLocaleString();
  const handleSubmitShare = async () => {
    const username = Cookies.get("username");
    try {
      const model = { content: shareContent, formattedTime };
      await PostService.addShare(username, post.id, model);

      onNewShare();
      toast.info("🔗 Đã chia sẻ bài viết!");
      setShowShareModal(false);
    } catch (error) {
      toast.error("❌ Chia sẻ bài viết thất bại!");
    }
  };

  const handleDelete = async () => {
    try {
      await PostService.deletePost(post.id);
      onDelete(post.id);
      setShowConfirmModal(false);
      toast.success("Đã xóa bài viết thành công!");
    } catch (error) {
      toast.error("❌ Xóa bài viết thất bại!");
    }
  };

  const handleDeleteComment = async () => {
    if (commentToDelete) {
      try {
        await PostService.deleteComment(commentToDelete.id);
        setComments((prev) =>
          prev.filter((comment) => comment.id !== commentToDelete.id)
        );
        setShowCommentMenu(null);
        toast.success("Đã xóa bình luận thành công!");
      } catch (error) {
        console.error("Error while deleting the comment:", error);
        toast.error("❌ Xóa bình luận thất bại!");
      }
    }
  };

  return (
    <div className="mt-6 post bg-white shadow-lg rounded-lg p-6 mb-6 relative">
      {/* Post Header */}
      <div className="post-header flex items-center mb-4 cursor-pointer">
        <div>
          {post.username?.images?.length > 0 ? (
            post.username.images.map((image) => (
              <img
                key={image.avatarrurl}
                src={image.avatarrurl}
                alt="Avatar"
                className="post-avatar"
                onClick={() => handleClick(post.username.username)}
              />
            ))
          ) : (
            <img
              src="default-avatar-url"
              alt="Default Avatar"
              className="post-avatar"
            />
          )}
        </div>
        <div className="flex-grow">
          <p
            className="post-username"
            onClick={() => handleClick(post.username.username)}
          >
            {post.username.lastname} {post.username.firstname}
          </p>
          <p className="post-timestamp">{formatTimestamp(post.createdate)}</p>
        </div>
        <div className="relative">
          {currentUser === post.username.username && (
            <button
              onClick={() => setMenuVisible(!menuVisible)}
              className="text-gray-600"
            >
              ⋯
            </button>
          )}
          {menuVisible && (
            <div
              ref={menuRef}
              className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg"
            >
              <button
                onClick={() => setShowConfirmModal(true)}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Xóa bài viết
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Post Content */}
      <p>{post.content}</p>
      {post.postimages && post.postimages.length === 1 ? (
        <img
          src={post.postimages[0].image}
          alt="Post"
          className="w-full h-auto object-cover rounded-lg mt-4"
        />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
          {post.postimages &&
            post.postimages.map((img) => (
              <img
                key={img.image}
                src={img.image}
                alt="Post"
                className="w-full h-40 object-cover rounded-lg"
              />
            ))}
        </div>
      )}

      {/* Post Actions */}
      <div className="post-actions mt-4 flex justify-between items-center">
        <button onClick={handleLike} className="post-action">
          <span
            role="img"
            aria-label={isLiked ? "liked" : "not liked"}
            className={isLiked ? "text-red-500" : "text-gray-500"}
          >
            {isLiked ? "❤️" : "🤍"}
          </span>
          {likes} lượt thích
        </button>
        <button onClick={toggleComments} className="post-action">
          📝 {comments.length} bình luận
        </button>
        <button onClick={handleShare} className="post-action">
          🔗 Chia sẻ
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="comments mt-6">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div
                key={comment.id}
                className="comment-item bg-white rounded-xl shadow-md p-4 mb-4 flex items-start relative"
              >
                <div className="flex-shrink-0">
                  <img
                    src={
                      Array.isArray(comment.username.images) &&
                      comment.username.images.length > 0
                        ? comment.username.images[0]?.avatarrurl
                        : "/default-avatar.png" // Use default avatar if no images found
                    }
                    alt="Avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </div>
                <div className="ml-4 flex-grow">
                  <p className="font-semibold text-gray-800">
                    {comment.username.lastname} {comment.username.firstname}
                  </p>
                  <p className="text-gray-700">{comment.content}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatTimestamp(comment.createdate)}{" "}
                    {/* Ensure this is formatted correctly */}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowCommentMenu(comment.id);
                    setCommentToDelete(comment);
                  }}
                  className="absolute top-0 right-0 mt-2 mr-2 text-gray-500 text-xl"
                >
                  ⋯
                </button>
                {showCommentMenu === comment.id && (
                  <div className="absolute right-0 top-10 mt-2 w-36 bg-white shadow-lg rounded-md transition-all opacity-100 z-10">
                    <button
                      onClick={handleDeleteComment}
                      className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                    >
                      Xóa bình luận
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500">Chưa có bình luận</p>
          )}
          <div className="add-comment mt-4 flex items-center bg-white rounded-xl shadow-md p-4">
            <input
              type="text"
              placeholder="Bình luận..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button
              type="submit"
              onClick={handleComment}
              className="ml-4 bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
            >
              Đăng
            </button>
          </div>
        </div>
      )}

      {/* Post Deletion Confirmation Modal */}
      {showConfirmModal && (
        <div className="modal-overlay fixed inset-0 bg-gray-800 bg-opacity-50 z-50">
          <div className="modal-container bg-white p-6 rounded-lg max-w-sm mx-auto mt-32">
            <h3 className="text-lg">Xác nhận xóa bài viết</h3>
            <div className="modal-buttons mt-4">
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2"
              >
                Xóa
              </button>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Post Modal */}
      {showShareModal && (
        <div className="modal-overlay fixed inset-0 bg-gray-800 bg-opacity-50 z-50">
          <div className="modal-container bg-white p-6 rounded-lg max-w-sm mx-auto mt-32">
            <h3 className="text-lg">Chia sẻ bài viết</h3>
            <textarea
              value={shareContent}
              onChange={(e) => setShareContent(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg mt-4"
              placeholder="Viết một cái gì đó trước khi chia sẻ..."
            ></textarea>
            <div className="modal-buttons mt-4">
              <button
                onClick={handleSubmitShare}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
              >
                Chia sẻ
              </button>
              <button
                onClick={() => setShowShareModal(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
