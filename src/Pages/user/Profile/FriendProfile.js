import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import UserService from "../../../Services/user/UserService";
import PostService from "../../../Services/user/PostService";
import Post from "../../../Pages/user/Post/Post";

const UserInfo = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [userError, setUserError] = useState(null); // Separate error state for user info
  const [loadingUserInfo, setLoadingUserInfo] = useState(true);
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true); // Separate loading state for posts
  const [postsError, setPostsError] = useState(null); // Separate error state for posts

  useEffect(() => {
    const username = Cookies.get("username");
    if (username) {
      // Fetch user info
      setLoadingUserInfo(true);
      UserService.getInfo(username)
        .then((data) => {
          setUserInfo(data);
          setUserError(null); // Clear user error if any
        })
        .catch((err) => {
          setUserError(err.message || "An error occurred while fetching user data");
          setUserInfo(null); // Clear user info if there's an error
        })
        .finally(() => {
          setLoadingUserInfo(false); // End loading state for user info
        });
    }

    // Fetch posts
    PostService.getMyPost()
      .then((response) => {
        setPosts(response.data || []);
        setPostsError(null); // Clear posts error if any
      })
      .catch((error) => {
        setPostsError("Error fetching posts: " + error.message);
        console.error(error);
      })
      .finally(() => {
        setLoadingPosts(false); // End loading state for posts
      });
  }, []); // Empty dependency array to run only once

  const handleDeletePost = (postId) => {
    // Add your post delete logic here (API call for post deletion)
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
      {/* User Profile */}
      <div className="bg-white p-6 rounded-lg shadow-md text-center mt-12 mx-auto relative">
        {/* Avatar Section */}
        <div className="relative -mt-20">
          <div className="bg-white rounded-full p-2 inline-block shadow-lg">
            <img
              src={userInfo.avatarUrl || "https://via.placeholder.com/140"} // Default avatar URL
              alt="User"
              className="rounded-full w-32 h-32 border-4 border-white object-cover"
            />
          </div>
        </div>
        {/* Profile Information */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold">
            {userInfo.lastname} {userInfo.firstname}
          </h2>
          <p className="text-gray-500 text-lg">📧 {userInfo.email}</p>
          <p className="text-gray-700">🏡 Đang sống tại: {userInfo.hometown}</p>
          <p className="text-gray-700">{userInfo.bio}</p>
        </div>
      </div>

      {/* Post Input and Post List */}
      <div className="post-list space-y-8">
        {posts.length === 0 && <p className="text-gray-500">No posts available.</p>}
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

export default UserInfo;
