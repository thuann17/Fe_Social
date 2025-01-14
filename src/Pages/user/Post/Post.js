import React, { useState, useEffect, useRef } from "react";
import "./post.css";
import PostService from "../../../Services/user/PostService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

const Post = ({ post, onDelete }) => {
  const [likes, setLikes] = useState(post.countLike || 0);
  const [comments, setComments] = useState(post.comments || []);
  const [newComment, setNewComment] = useState("");
  const [isLiked, setIsLiked] = useState(post.likedByUser || false);
  const [showComments, setShowComments] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showCommentMenu, setShowCommentMenu] = useState(null);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false); // State to manage share modal visibility
  const [shareContent, setShareContent] = useState(""); // State to manage the content for sharing

  const menuRef = useRef(null);

  const handleLike = async () => {
    try {
      setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Error while liking the post:", error);
    }
  };

  const handleComment = async () => {
    if (newComment.trim()) {
      try {
        await PostService.commentPost(post.id, newComment);
        const user = {
          lastname: post.username.lastname,
          firstname: post.username.firstname,
        };
        setComments((prev) => [
          ...prev,
          {
            id: Date.now(),
            username: user,
            content: newComment,
          },
        ]);
        setNewComment("");
      } catch (error) {
        console.error("Error while commenting on the post:", error);
      }
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

  const handleShare = async () => {
    setShowShareModal(true); // Show the share modal when the share button is clicked
  };

  const handleSubmitShare = async () => {
    const username = Cookies.get("username");
    try {
      const model = {
        content: shareContent,
      };
      await PostService.addShare(username, post.id, model);
      toast.info("🔗 Đã chia sẻ bài viết!");
      setShowShareModal(false); // Close the modal after sharing
    } catch (error) {
      console.error("There was an error adding the share!", error);
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
      console.error("Error while deleting the post:", error);
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
        setShowCommentMenu(null); // Hide the comment menu
        toast.success("Đã xóa bình luận thành công!");
      } catch (error) {
        console.error("Error while deleting the comment:", error);
        toast.error("❌ Xóa bình luận thất bại!");
      }
    }
  };

  return (
    <div className="mt-6 post bg-white shadow-lg rounded-lg p-6 mb-6 relative">
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
          <p className="post-timestamp">{formatTimestamp(post.createdate)}</p>
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

      <p>{post.content}</p>
      {post.postimages.length === 1 ? (
        <img
          src={post.postimages[0].image}
          alt="Post"
          className="w-full h-auto object-cover rounded-lg mt-4"
        />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
          {post.postimages.map((img) => (
            <img
              key={img.id}
              src={img.image}
              alt="Post"
              className="w-full h-40 object-cover rounded-lg"
            />
          ))}
        </div>
      )}

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

      {showComments && (
        <div className="comments mt-4">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="rounded-md bg-gray-100 p-2 mt-2 flex items-center relative"
            >
              <p className="flex-grow">
                <strong>
                  {comment.username.lastname} {comment.username.firstname}
                </strong>
                : {comment.content}
              </p>
              <button
                onClick={() => {
                  setShowCommentMenu(comment.id);
                  setCommentToDelete(comment);
                }}
                className="text-gray-500 text-sm"
              >
                ⋯
              </button>
              {showCommentMenu === comment.id && (
                <div className="absolute right-0 top-0 mt-2 w-36 bg-white shadow-lg rounded-md transition-all opacity-100 z-10">
                  <button
                    onClick={handleDeleteComment}
                    className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                  >
                    Xóa bình luận
                  </button>
                </div>
              )}
            </div>
          ))}
           <div className="add-comment mt-2 flex items-center">
            <input
              type="text"
              placeholder="Bình luận..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="border rounded p-2 w-full"
            />
            <button
              onClick={handleComment}
              className="ml-2 bg-blue-500 text-white px-4 rounded-lg"
            >
              Đăng
            </button>
          </div>
        </div>
      )}

      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p>Bạn có chắc muốn xóa bài viết này không?</p>
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

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p>Nhập nội dung chia sẻ:</p>
            <textarea
              value={shareContent}
              onChange={(e) => setShareContent(e.target.value)}
              className="w-full h-24 mt-2 p-2 border border-gray-300 rounded-lg"
            />
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowShareModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg mr-2"
              >
                Hủy
              </button>
              <button
                onClick={handleSubmitShare}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Chia sẻ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
