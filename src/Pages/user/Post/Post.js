import React, { useState } from "react";
import "./post.css";

const Post = ({ post }) => {
  const [likes, setLikes] = useState(post.likes);
  const [comments, setComments] = useState(post.comments);
  const [newComment, setNewComment] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false); // State to manage comment visibility

  const handleLike = () => {
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
    setIsLiked(!isLiked);
  };

  const handleComment = () => {
    if (newComment.trim()) {
      setComments([...comments, { id: Date.now(), username: "User", content: newComment }]);
      setNewComment("");
    }
  };

  const handleShare = () => alert("Post shared successfully!");

  const toggleComments = () => {
    setShowComments((prev) => !prev); // Toggle comment visibility
  };

  return (
    <div className="mt-6 post bg-white shadow-lg rounded-lg p-6 mb-6 transform transition-transform">
      {/* Header */}
      <div className="post-header flex items-center mb-4">
        <img src={post.userAvatar} alt="Avatar" className="rounded-full w-12 h-12 mr-3" />
        <div>
          <p className="font-bold">{post.username}</p>
          <p className="text-gray-500 text-sm">{post.timestamp}</p>
        </div>
      </div>

      {/* Content */}
      <div className="post-content mt-4">
        <p>{post.content}</p>
        {post.image && <img src={post.image} alt="Post" className="rounded-lg mt-2" />}
        {post.video && (
          <video controls className="rounded-lg mt-2 w-full">
            <source src={post.video} />
          </video>
        )}
      </div>

      {/* Like, Share, and Comment */}
      <div className="post-actions mt-4 flex justify-between items-center">
        <button onClick={handleLike} className={`hover:text-blue-500 ${isLiked ? "font-bold" : ""}`}>
          {isLiked ? "💖 Thích" : "🖤 Thích"} {likes}
        </button>
        <button onClick={toggleComments} className="hover:text-blue-500">
        📝 Bình luận {comments.length}
        </button>
        <button onClick={handleShare} className="hover:text-green-600">
          🔗 Chia sẻ
        </button>
      </div>

      {/* Comment Section */}
      {showComments && (
        <div className="comments mt-4">
          {comments.map((comment) => (
            <div key={comment.id} className="rounded-md bg-gray-100 p-2 mt-2">
              <p><strong>{comment.username}:</strong> {comment.content}</p>
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