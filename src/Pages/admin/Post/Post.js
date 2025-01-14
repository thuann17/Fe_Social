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
            }
        };

        fetchPost();
    }, [postId]);

    if (loading) return <div>Đang tải...</div>;
    if (!post) return <div>Bài viết không tồn tại.</div>;

    const toggleComments = () => {
        setShowComments((prevShowComments) => !prevShowComments);
    };
    const handleHidePost = () => {
        setIsHidden(true);
        setMenuVisible(false);
    };

    return (
        <div className="mt-6 post bg-white shadow-lg rounded-lg p-6 mb-6 relative">
            <div className="post-header flex items-center mb-4">
                <div className="flex items-center gap-4">
                    <img
                        src={
                            post.username.images[0]?.avatarrurl ||
                            "https://firebasestorage.googleapis.com/v0/b/socialmedia-8bff2.appspot.com/o/ThuanImage%2Favt.jpg?alt=media"
                        }
                        alt={post.username}
                        className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex flex-col justify-center">
                        <p className="font-medium text-sm">
                            {post.username?.lastname} {post.username?.firstname}
                        </p>
                        <p className="text-gray-500 text-xs">{formatTimestamp(post.createdate)}</p>
                    </div>
                </div>
            </div>

            {post.content && <p>{post.content}</p>}
            <div className="flex justify-evenly" >
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

            {showComments && (
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
