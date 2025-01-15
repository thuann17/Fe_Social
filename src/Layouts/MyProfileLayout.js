import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MyProfile from "../Pages/user/Profile/MyProfile";
import Post from "../Pages/user/Post/Post";
import UserService from "../Services/user/UserService";
import PostService from "../Services/user/PostService";
import Cookies from "js-cookie";

const MyProfileLayout = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [userError, setUserError] = useState(null);
  const [loadingUserInfo, setLoadingUserInfo] = useState(true);
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [postsError, setPostsError] = useState(null);

  const username = Cookies.get("username");
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
        setUserError(
          err.message || "An error occurred while fetching user data"
        );
        setUserInfo(null);
      })
      .finally(() => {
        setLoadingUserInfo(false);
      });

    // Fetch user posts with username
    setLoadingPosts(true);
    PostService.getMyPost(username)
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
  }, [username]); // Re-run when username changes

  const handleDeletePost = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  // Loading state
  if (loadingUserInfo || loadingPosts) {
    return <p>Loading...</p>;
  }

  // Error states
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

  // If no user found
  if (!userInfo) {
    return <p>User not found.</p>;
  }

  return (
    <div>
      {/* Main Center Content (with padding for sidebars) */}
      <div className="flex-grow" style={{ paddingTop: "3px" }}>
        {/* My Profile Section */}
        <div>
          <MyProfile userInfo={userInfo} />
        </div>
        <br />

        {/* Post List Section */}
        <div>
          <div className="post-list space-y-8">
            {posts.length === 0 && (
              <p className="text-gray-500">Không có bài viết</p>
            )}
            {posts.map((post) => (
              <Post
                key={post.id}
                post={post}
                onDelete={() => handleDeletePost(post.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfileLayout;
