import React, { useState, useEffect, useRef } from "react";
import "./post.css";
import PostService from "../../../Services/user/PostService";

const Post = ({ post, onDelete }) => {
  const [likes, setLikes] = useState(post.countLike || 0);
  const [comments, setComments] = useState(post.comments || []);
  const [newComment, setNewComment] = useState("");
  const [isLiked, setIsLiked] = useState(post.likedByUser || false);
  const [showComments, setShowComments] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const menuRef = useRef(null);

  // Xử lý click bên ngoài để đóng menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Hàm like/unlike bài viết
  const handleLike = async () => {
    try {
      if (isLiked) {
        setLikes((prev) => prev - 1);
      } else {
        setLikes((prev) => prev + 1);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Error while liking the post:", error);
    }
  };

  // Hàm gửi bình luận
  const handleComment = async () => {
    if (newComment.trim()) {
      try {
        const response = await PostService.commentPost(post.id, newComment);
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

  // Hiển thị/ẩn bình luận
  const toggleComments = () => setShowComments((prev) => !prev);

  // Hàm format thời gian
  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString("vi-VN", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Ho_Chi_Minh",
    });
  };

  // Hàm chia sẻ bài viết
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href + `/post/${post.id}`);
      alert("Đã sao chép liên kết bài viết!");
    } catch (error) {
      console.error("Error sharing the post:", error);
    }
  };

  // Hàm ẩn bài viết
  const handleHidePost = () => {
    setIsHidden(true);
    setMenuVisible(false);
  };

  // Hàm xóa bài viết
  const handleDeletePost = async () => {
    try {
      await PostService.deletePost(post.id);
      onDelete(post.id);
      setMenuVisible(false);
    } catch (error) {
      console.error("Error deleting the post:", error);
    }
  };

  if (isHidden) {
    return null;
  }

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
            <img src="default-avatar-url" alt="Default Avatar" className="post-avatar" />
          )}
        </div>
        <div className="flex-grow">
          <p className="post-username">
            {post.username.lastname} {post.username.firstname}
          </p>
          <p className="post-timestamp">{formatTimestamp(post.createdate)}</p>
        </div>

        {/* Nút 3 chấm */}
        <div className="relative">
          <button
            onClick={() => setMenuVisible((prev) => !prev)}
            className="text-gray-600 hover:text-gray-1500"
          >
            ⋮
          </button>
          {menuVisible && (
            <div
            ref={menuRef}
            className="absolute right-0 bg-white shadow-md rounded-md py-3 px-4 z-10 min-w-[180px]"
          >
            <button
              onClick={handleHidePost}
              className="block px-4 py-3 text-base text-gray-700 hover:bg-gray-100 w-full text-left"
            >
              Ẩn bài viết
            </button>
            <button
              onClick={handleDeletePost}
              className="block px-4 py-3 text-base text-red-600 hover:bg-gray-100 w-full text-left"
            >
              Xóa bài viết
            </button>
          </div>
          
          )}
        </div>
      </div>

      <p>{post.content}</p>
      <div>
        {post.postimages.map((img) => (
          <img
            key={img.id}
            src={img.image}
            alt="Post"
            style={{
              width: "650px",
              marginRight: "10px",
              borderRadius: "5px",
            }}
          />
        ))}
      </div>

      <div className="post-actions mt-4 flex justify-between items-center">
        <button onClick={handleLike} className="post-action">
          {isLiked ? "❤️" : "🤍"} {likes} lượt thích
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
            <div key={comment.id} className="rounded-md bg-gray-100 p-2 mt-2">
              <p>
                <strong>{comment.username.lastname} {comment.username.firstname}</strong>: {comment.content}
              </p>
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
    </div>
  );
};

export default Post;
