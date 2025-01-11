import React, { useState, useEffect } from "react";
import Post from "./Post";
import PostInput from "./Posting";
import Service from "../../../Services/user/PostService";

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        Service.getListPost()
            .then((response) => {
                setPosts(response.data || []);
                setError(null);
                console.log(response.data);
            })
            .catch((error) => {
                setError("Error fetching posts: " + error.message);
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const handleDeletePost = (postId) => {
        // Optionally make an API call to delete the post from the backend
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
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
            </div>
        </>
    );
};

export default PostList;
