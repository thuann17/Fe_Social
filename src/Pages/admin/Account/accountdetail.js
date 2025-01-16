import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import ProfileUserService from "../../../Services/admin/ProfileUserService";
import PostService from '../../../Services/user/PostService';

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

const AccountDetail = () => {
    const { state } = useLocation();
    const accountId = state?.accountId;

    const [userInfo, setUserInfo] = useState(null);
    const [userError, setUserError] = useState(null);
    const [loadingUserInfo, setLoadingUserInfo] = useState(true);

    const [posts, setPosts] = useState([]);
    const [loadingPosts, setLoadingPosts] = useState(true);
    const [postsError, setPostsError] = useState(null);

    useEffect(() => {
        if (!accountId) {
            setUserError("Account ID is missing.");
            setLoadingUserInfo(false);
            setLoadingPosts(false);
            return;
        }
        setLoadingUserInfo(true);
        ProfileUserService.getInfoUser(accountId)
            .then((response) => {
                setUserInfo(response.data);
                console.log(response.data);

                setUserError(null);
            })
            .catch((error) => {
              
                setUserInfo(null);
            })
            .finally(() => setLoadingUserInfo(false));

        setLoadingPosts(true);
        PostService.getMyPost(accountId)
            .then((response) => {
                // Initialize showComments for each post
                const postsWithCommentsFlag = response.data.map(post => ({
                    ...post,
                    showComments: false,  // Set initial state for showComments
                }));
                setPosts(postsWithCommentsFlag);
                setPostsError(null);
            })
            .catch((error) => {
                setPosts([]);
            })
            .finally(() => setLoadingPosts(false));
    }, [accountId]);


    if (loadingUserInfo) {
        return <p>Loading user info...</p>;
    }

    if (loadingPosts) {
        return <p>Loading posts...</p>;
    }

    if (userError) {
        return (
            <div className="error">
                <h2>Error: {userError}</h2>
            </div>
        );
    }

    if (postsError) {
        return (
            <div className="error">
                <h2>Error: {postsError}</h2>
            </div>
        );
    }

    if (!userInfo) {
        return <p>User not found.</p>;
    }

    return (
        <div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center mt-12 mx-auto relative">
                <div className="relative -mt-20">
                    <div className="bg-white rounded-full p-2 inline-block shadow-lg">
                        <img
                            src={userInfo.images[0].avatarrurl || "https://via.placeholder.com/140"}
                            alt="User"
                            className="rounded-full w-32 h-32 border-4 border-white object-cover"
                        />
                    </div>
                </div>
                <div className="mt-6">
                    <h2 className="text-2xl font-semibold">
                        {userInfo.lastname} {userInfo.firstname}
                    </h2>
                    <p className="text-gray-500 text-lg">📧 {userInfo.email}</p>
                    <p className="text-gray-700">🏡 Đang sống tại: {userInfo.hometown}</p>
                    <p className="text-gray-700">{userInfo.bio}</p>
                </div>
            </div>

            <div className="post-list space-y-8 mt-8">
                {/* Render the posts of the user */}
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <div key={post.id} className="mt-6 post bg-white shadow-lg rounded-lg p-6 mb-6 relative">
                            <div className="post-header flex items-center mb-4">
                                <div className="flex items-center gap-4">
                                    <img
                                        src={post.username.images[0]?.avatarrurl || "https://firebasestorage.googleapis.com/v0/b/socialmedia-8bff2.appspot.com/o/ThuanImage%2Favt.jpg?alt=media"}
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
                            <div className="flex justify-evenly">
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
                                <button className="post-action" >
                                    📝 {post.countComment || 0} bình luận
                                </button>
                            </div>


                        </div>
                    ))
                ) : (
                    <p>Không có bài đăng nào.</p>
                )}
            </div>
        </div>
    );
};

export default AccountDetail;
