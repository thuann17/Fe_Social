import React, { useState, useEffect, useRef } from "react";
import "./post.css";
import PostService from "../../../Services/user/PostService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

const Post = ({ post, onDelete, onNewPost, onNewShare }) => {
  const [likes, setLikes] = useState(post.countLike || 0);
  const [comments, setComments] = useState(post.comments || []);
  const [newComment, setNewComment] = useState("");
  const [isLiked, setIsLiked] = useState(post.likedByUser || false);
  const [showComments, setShowComments] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showCommentMenu, setShowCommentMenu] = useState(null);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareContent, setShareContent] = useState(""); // Content for sharing

  const menuRef = useRef(null);

  // Like Post Handler
  const likePost = async (postId) => {
    const username = Cookies.get("username");
    setLikes((prevLikes) => prevLikes + 1); // Optimistic UI
    setIsLiked(true); // Immediately mark as liked
    try {
      await PostService.likePost(postId, username);
      toast.success("👍 Đã thích bài viết!");
    } catch (error) {
      console.error("Error while liking the post:", error);
      toast.error("❌ Lỗi khi thích bài viết!");
      setLikes((prevLikes) => prevLikes - 1); // Revert UI on error
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
      toast.success("👎 Đã bỏ thích bài viết!");
    } catch (error) {
      console.error("Error while unliking the post:", error);
      toast.error("❌ Lỗi khi bỏ thích bài viết!");
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

  // Handle Comment Submission
  const handleComment = async () => {
    if (newComment.trim()) {
      try {
        await PostService.commentPost(post.id, newComment);
        const user = {
          lastname: post.username.lastname,
          firstname: post.username.firstname,
        };
        const newCommentObject = {
          id: Date.now(),
          username: user,
          content: newComment,
        };

        setComments((prev) => {
          const updatedComments = [newCommentObject, ...prev];
          return updatedComments.sort((a, b) => b.id - a.id); // New comment goes to the top
        });

        setNewComment(""); // Clear comment input after submission
      } catch (error) {
        console.error("Error while commenting on the post:", error);
      }
    }
  };

  // Toggle Comments Visibility
  const toggleComments = () => setShowComments((prev) => !prev);

  // Format Timestamp
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

  // Handle Share Button Click
  const handleShare = () => {
    setShowShareModal(true); // Show the share modal
  };

  // Handle Share Submission
  const handleSubmitShare = async () => {
    const username = Cookies.get("username");
    try {
      const model = { content: shareContent };
      await PostService.addShare(username, post.id, model);
      
      onNewShare(); 
      toast.info("🔗 Đã chia sẻ bài viết!");
      setShowShareModal(false); // Close the modal after sharing
    } catch (error) {
      console.error("Error while sharing the post:", error);
      toast.error("❌ Chia sẻ bài viết thất bại!");
    }
  };

  // Handle Post Deletion
  const handleDelete = async () => {
    try {
      await PostService.deletePost(post.id);
      onDelete(post.id);
      setShowConfirmModal(false); // Close confirmation modal
      toast.success("Đã xóa bài viết thành công!");
    } catch (error) {
      console.error("Error while deleting the post:", error);
      toast.error("❌ Xóa bài viết thất bại!");
    }
  };

  // Handle Comment Deletion
  const handleDeleteComment = async () => {
    if (commentToDelete) {
      try {
        await PostService.deleteComment(commentToDelete.id);
        setComments((prev) =>
          prev.filter((comment) => comment.id !== commentToDelete.id)
        );
        setShowCommentMenu(null); // Hide comment menu
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
      <div className="post-header flex items-center mb-4">
        <div>
          {post.username?.images?.length > 0 ? (
            post.username.images.map((image) => (
              <img
                key={image.id}
                src={image.avatarrurl}
                alt="Avatar"
                className="post-avatar"
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
          <p className="post-username">
            {post.username.lastname} {post.username.firstname}
          </p>
          <p className="post-timestamp">{(post.createdate)}</p>
        </div>
        <div className="relative">
          <button
            onClick={() => setMenuVisible(!menuVisible)}
            className="text-gray-600"
          >
            ⋯
          </button>
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
              <button
                onClick={() => alert("Ẩn bài viết chưa khả dụng!")}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Ẩn bài viết
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
                key={img.id}
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
                <div className="ml-4 flex-grow">
                  <p className="font-semibold text-gray-800">
                    {comment.username.lastname} {comment.username.firstname}
                  </p>
                  <p className="text-gray-700">{comment.content}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatTimestamp(comment.createdate)}
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
              placeholder="Nội dung chia sẻ..."
              rows="4"
              className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <div className="modal-buttons mt-4">
              <button
                onClick={handleSubmitShare}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg mr-2"
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
