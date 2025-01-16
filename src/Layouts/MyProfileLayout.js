import React, { useState, useEffect } from "react";
import MyProfile from "../Pages/user/Profile/MyProfile";
import Post from "../Pages/user/Post/Post";
import Share from "../Pages/user/Post/Share";
import PostInput from "../Pages/user/Post/Posting";
import UserService from "../Services/user/UserService";
import PostService from "../Services/user/PostService";
import Cookies from "js-cookie";

// Helper function to format the timestamp for display
const formatTimestamp = (timestamp) => {
  const options = {
    weekday: "short", // Weekday in Vietnamese
    year: "numeric", // Year in numeric format
    month: "short", // Month in short format (e.g., Jan, Feb)
    day: "numeric", // Day in numeric format
    hour: "2-digit", // Hour in 2-digit format
    minute: "2-digit", // Minute in 2-digit format
    second: "2-digit", // Second in 2-digit format
    hour12: false, // Use 24-hour time format (Vietnam typically uses 24-hour format)
  };
  return new Date(timestamp).toLocaleString("vi-VN", {
    ...options,
    timeZone: "Asia/Ho_Chi_Minh", // Ensure correct timezone (Vietnam)
  });
};

const MyProfileLayout = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [userError, setUserError] = useState(null);
  const [loadingUserInfo, setLoadingUserInfo] = useState(true);
  const [contents, setContents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const username = Cookies.get("username");

  // Fetch user info and posts/shares data
  useEffect(() => {
    if (!username) {
      setUserError("Username is required. Please log in.");
      setLoadingUserInfo(false);
      setLoading(false);
      return;
    }

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

    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch posts
        const postsResponse = await PostService.getMyPost(username);
        const posts = (postsResponse.data || []).map((post) => ({
          ...post,
          type: "post",
          createdAt: new Date(post.createdate),
          createdAtFormatted: formatTimestamp(post.createdate),
        }));

        // Fetch shares
        const sharesResponse = await PostService.getListShare();
        const shares = (sharesResponse.data || []).map((share) => ({
          ...share,
          type: "share",
          createdAt: new Date(share.createdate),
          createdAtFormatted: formatTimestamp(share.createdate),
        }));

        const combinedData = [...posts, ...shares];
        const sortedData = combinedData.sort((a, b) => b.createdAt - a.createdAt);

        setContents(sortedData);
        setError(null);
      } catch (err) {
        setError("Error fetching data: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  const handleDelete = (id, type) => {
    setContents((prevContents) =>
      prevContents.filter((content) => content.id !== id)
    );
  };

  const handleNewContent = async () => {
   
   // fetchData();
  };

  if (userError) {
    return (
      <div className="error">
        <h2>Error: {userError}</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <h2>Error: {error}</h2>
      </div>
    );
  }

  return (
    <div>
      {/* Main Center Content (with padding for sidebars) */}
      <div className="flex-grow" style={{ paddingTop: "3px" }}>
        {/* My Profile Section */}
        <div>
          {loadingUserInfo ? (
            <p>Loading user info...</p>
          ) : (
            <MyProfile userInfo={userInfo} />
          )}
        </div>
        <br />

        {/* Post Input */}
        <PostInput onNewPost={handleNewContent} />

        {/* Post and Share List */}
        <div className="post-list space-y-8">
          {loading && <p>Loading posts...</p>}
          {!loading && contents.length === 0 && <p>No posts or shares available.</p>}
          {contents.map((content) =>
            content.type === "post" ? (
              <Post
                key={content.id}
                post={content}
                onDelete={() => handleDelete(content.id, "post")}
                onNewShare={handleNewContent}
                createdAtFormatted={content.createdAtFormatted}
              />
            ) : (
              <Share
                key={content.id}
                share={content}
                onDelete={() => handleDelete(content.id, "share")}
                createdAtFormatted={content.createdAtFormatted}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfileLayout;
