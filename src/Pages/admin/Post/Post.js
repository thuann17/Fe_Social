import React, { useState, useEffect, useRef } from "react";
import PostService from '../../../Services/admin/PostService';
import "./post.css";

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

const Post = ({ postId }) => {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showComments, setShowComments] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const menuRef = useRef(null);
    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const response = await PostService.getPostById(postId);
                setPost(response.data);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                console.error("Error fetching post:", err);
            }
        };

        fetchPost();
    }, [postId]);

    if (loading) return <div>Đang tải...</div>;
    if (!post) return <div>Bài viết không tồn tại.</div>;

    const toggleComments = () => {
        setShowComments((prevShowComments) => !prevShowComments);
    };
    // Hàm ẩn bài viết
    const handleHidePost = () => {
        setIsHidden(true);
        setMenuVisible(false);
    };

    return (
        <div className="mt-6 post bg-white shadow-lg rounded-lg p-6 mb-6 relative">
            <div className="post-header flex items-center mb-4">
                <div className="flex-grow">
                    <p className="post-username">
                        {post.username?.lastname} {post.username?.firstname}
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

                        </div>

                    )}
                </div>
            </div>

            {post.content && <p>{post.content}</p>}

            <div>
                {post.postimages?.length > 0 && (
                    post.postimages.map((img) => (
                        <img
                            key={img.id}
                            src={img.image}
                            alt="Bài viết"
                            style={{
                                width: "650px",
                                marginRight: "10px",
                                borderRadius: "5px",
                            }}
                        />
                    ))
                )}
            </div>

            <div className="post-actions mt-4 flex justify-between items-center">
                <button className="post-action">
                    ❤️ {post.countLike || 0} lượt thích
                </button>
                <button className="post-action" onClick={toggleComments}> {/* Button to toggle comments */}
                    📝 {post.countComment || 0} bình luận
                </button>

            </div>

            {showComments && ( // Conditional rendering based on showComments state
                <div className="comments mt-4">
                    {post.comments?.length > 0 && (
                        post.comments.map((comment) => (
                            <div key={comment.id} className="rounded-md bg-gray-100 p-2 mt-2">
                                <p>
                                    <strong>{comment.username?.lastname} {comment.username?.firstname}</strong>: {comment.content}
                                </p>
                            </div>
                        ))
                    )}

                </div>
            )}
        </div>
    );
};

export default Post;
