import React, { useState, useEffect } from "react";
import Post from "./Post";
import Share from "./Share";
import PostInput from "./Posting";
import Service from "../../../Services/user/PostService";

// Helper function to format the timestamp
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

const PostList = () => {
  const [contents, setContents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch posts and shares
  const fetchData = async () => {
    setLoading(true);
  

    try {
      // Fetch posts
      const postsResponse = await Service.getListPost();
      const posts = (postsResponse.data || []).map((post) => ({
        ...post,
        type: "post", // Mark as post
        createdAtFormatted: formatTimestamp(post.createdAt), // Format createdAt for post
      }));

      // Fetch shares
      const sharesResponse = await Service.getListShare();
      const shares = (sharesResponse.data || []).map((share) => ({
        ...share,
        type: "share", // Mark as share
        createdAtFormatted: formatTimestamp(share.createdAt) // Format createdAt for share
      }));

      const combinedData = [...posts, ...shares];

      const sortedData = combinedData.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setContents(sortedData);
      setError(null);
    } catch (error) {
      setError("Error fetching data: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Fetch data only once on component mount

  // Handle delete post or share
  const handleDelete = (id, type) => {
    setContents((prevContents) =>
      prevContents.filter((content) => content.id !== id)
    );
  };

  // Trigger re-fetch after posting a new post or sharing a new post
  const handleNewContent = () => {
    fetchData();
  };

  return (
    <>
      <PostInput onNewPost={handleNewContent} />
      <div className="post-list space-y-8">
        {loading && <p>Loading posts...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && contents.length === 0 && (
          <p className="text-gray-500">No posts or shares available.</p>
        )}
        {contents.map((content) =>
          content.type === "post" ? (
            <Post
              key={content.id}
              post={content}
              onDelete={() => handleDelete(content.id, "post")}
              onNewShare={handleNewContent}
              createdAtFormatted={content.createdAtFormatted} // Pass formatted time
            />
          ) : (
            <Share 
              key={content.id}
              share={content}
              onDelete={() => handleDelete(content.id, "share")}
              createdAtFormatted={content.createdAtFormatted} // Pass formatted time
            />
          )
        )}
      </div>
    </>
  );
};

export default PostList;
