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
  const menuRef = useRef(null);

  const handleLike = async () => {
    try {
      if (isLiked) {
        await PostService.unLikePost(post.id);
        setLikes((prev) => prev - 1);
      } else {
        await PostService.likePost(post.id);
        setLikes((prev) => prev + 1);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Error while liking the post:", error);
    }
  };


  const handleComment = async () => {
    if (newComment.trim()) {
      try {
        const response = await PostService.commentPost(post.id, newComment);
        setComments((prev) => [
          ...prev,
          { id: Date.now(), username: "User", content: newComment },
        ]);
        setNewComment("");
      } catch (error) {
        console.error("Error while commenting on the post:", error);
      }
    }
  };


  const handleShare = () => alert("Post shared successfully!");

  const toggleComments = () => {
    setShowComments((prev) => !prev);
  };

  const toggleMenu = () => {
    setMenuVisible((prev) => !prev);
  };

  const handleHidePost = () => {
    alert("Post hidden!");
    toggleMenu();
  };

  const handleDeletePost = () => {
    onDelete(post.id);
    alert("Post deleted!");
  };

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

  // Format post created date to Vietnamese time
  const formatTimestamp = (timestamp) => {
    const options = {
      weekday: "short", year: "numeric", month: "short", day: "numeric",
      hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
    };
    return new Date(timestamp).toLocaleString("vi-VN", {
      ...options, timeZone: "Asia/Ho_Chi_Minh"
    });
  };

  return (
    <div className="mt-6 post bg-white shadow-lg rounded-lg p-6 mb-6 relative">
      <div className="post-header flex items-center mb-4">
        <img src={post.userAvatar} alt="Avatar" className="post-avatar" />
        <div className="flex-grow">
          <p className="post-username">{post.username.username}</p>
          <p className="post-timestamp">{formatTimestamp(post.createdate)}</p>
        </div>
        <button onClick={toggleMenu} className="text-gray-500 focus:outline-none">
          <b>...</b>
        </button>
        {menuVisible && (
          <div ref={menuRef} className="menu-dropdown absolute right-0 bg-white shadow-lg rounded-lg mt-2 z-10">
            <button onClick={handleHidePost} className="menu-item">Ẩn bài viết</button>
            <button onClick={handleDeletePost} className="menu-item">Xóa bài viết</button>
          </div>
        )}
      </div>

      <div className="post-content mt-4">
        <p>{post.content}</p>
        {post.image && <img src={post.image} alt="Post" className="post-image" />}
        {post.video && (
          <video controls className="post-video">
            <source src={post.video} />
          </video>
        )}
      </div>

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
            <div key={comment.id} className="rounded-md bg-gray-100 p-2 mt-2">
              <p><strong>{comment.username.username}</strong>: {comment.content}</p>
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
            <button onClick={handleComment} className="ml-2 bg-blue-500 text-white px-4 rounded-lg">
              Đăng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
