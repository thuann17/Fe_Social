import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProfileUserService from "../../../Services/admin/ProfileUserService";
import Post from "../../../Pages/user/Post/Post";

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
                setUserError(null);
            })
            .catch((error) => {
                setUserError(error.message || "Error fetching user info.");
                setUserInfo(null);
            })
            .finally(() => setLoadingUserInfo(false));

        setLoadingPosts(true);
        ProfileUserService.getPostByUser(accountId)
            .then((response) => {
                setPosts(response.data);
                setPostsError(null);
            })
            .catch((error) => {
                setPostsError(error.message || "Error fetching posts.");
                setPosts([]);
            })
            .finally(() => setLoadingPosts(false));
    }, [accountId]);

    const handleDeletePost = (postId) => {
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    };

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
                            src={userInfo.avatarUrl || "https://via.placeholder.com/140"}
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

            <div className="post-list space-y-8">
                {posts.length === 0 && <p className="text-gray-500"></p>}
                {posts.map((post) => (
                    <Post
                        key={post.id}
                        post={post}
                        onDelete={() => handleDeletePost(post.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default AccountDetail;
