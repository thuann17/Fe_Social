import React, { useState, useEffect } from "react";
import UserService from "../../../Services/user/UserService";
import PostService from "../../../Services/user/PostService";
import Post from "../../../Pages/user/Post/Post";
import { useParams } from 'react-router-dom';

const UserInfo = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [userError, setUserError] = useState(null);
  const [loadingUserInfo, setLoadingUserInfo] = useState(true);
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [postsError, setPostsError] = useState(null);

  const { username } = useParams();

  useEffect(() => {
    if (!username) {
      setUserError("Username is required.");
      setLoadingUserInfo(false);
      setLoadingPosts(false);
      return;
    }

    // Fetch user info with username
    setLoadingUserInfo(true);
    UserService.getInfo(username)
      .then((data) => {
        setUserInfo(data);
        setUserError(null);
      })
      .catch((err) => {
        setUserError(err.message || "An error occurred while fetching user data");
        setUserInfo(null);
      })
      .finally(() => {
        setLoadingUserInfo(false);
      });

    // Fetch user posts with username
    setLoadingPosts(true);
    PostService.getMyPost (username)
      .then((response) => {
        setPosts(response.data || []);
        setPostsError(null);
      })
      .catch((error) => {
        setPostsError("Error fetching posts: " + error.message);
      })
      .finally(() => {
        setLoadingPosts(false);
      });
  }, [username]);

  const handleDeletePost = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  if (loadingUserInfo || loadingPosts) {
    return <p>Loading...</p>;
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
      {/* User Profile */}
      <div className="bg-white p-6 rounded-lg shadow-md text-center mt-12 mx-auto relative">
        <div className="relative -mt-20">
          <div className="bg-white rounded-full p-2 inline-block shadow-lg">
            <img
              src={userInfo.avatarUrl  || "https://via.placeholder.com/140"}
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

      {/* Post List */}
      <div className="post-list space-y-8">
        {posts.length === 0 && <p className="text-gray-500">Không có bài viết</p>}
        {posts.map((post) => (
          <Post key={post.id} post={post} onDelete={() => handleDeletePost(post.id)} />
        ))}
      </div>
    </div>
  );
};

export default UserInfo;
