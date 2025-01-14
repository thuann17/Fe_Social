import React, { useState, useEffect } from "react";
import Post from "./Post";
import Share from "./Share";
import PostInput from "./Posting";
import Service from "../../../Services/user/PostService";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [shares, setShares] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Start loading
    setLoading(true);

    // Fetch posts
    Service.getListPost()
      .then((response) => {
        const sortedPosts = (response.data || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setPosts(sortedPosts);
        setError(null);
      })
      .catch((error) => {
        setError("Error fetching posts: " + error.message);
      });

    // Fetch shares
    Service.getListShare()
      .then((response) => {
        const sortedShares = (response.data || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setShares(sortedShares);
        setError(null);
      })
      .catch((error) => {
        setError("Error fetching shares: " + error.message);
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  

  const handleDeletePost = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  const handleDeleteShare = (id) => {
    // Delete the share from the UI
    setShares((prevShares) => prevShares.filter((share) => share.id !== id));

    Service.getListShare()
      .then((response) => {
        const sortedShares = (response.data || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setShares(sortedShares);
        setError(null);
      })
      .catch((error) => {
        setError("Error fetching shares: " + error.message);
        console.error(error);
      });
  };

  return (
    <>
      <PostInput />
      <div className="post-list space-y-8">
        {loading && <p>Loading posts...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && posts.length === 0 && (
          <p className="text-gray-500">No posts available.</p>
        )}
        {posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            onDelete={() => handleDeletePost(post.id)}
          />
        ))}

        {shares.map((share) => (
          <Share
            key={share.id}
            share={share}
            onDelete={() => handleDeleteShare(share.id)}
          />
        ))}
      </div>
    </>
  );
};

export default PostList;
