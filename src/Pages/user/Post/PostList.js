import React, { useState, useEffect } from "react";
import Post from "./Post";
import PostInput from "./Posting";
import Service from "../../../Services/user/PostService";
const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        Service.getListPost()
            .then((response) => {   
                setPosts(response.data); 

            })
            .catch((error) => {
                setError("Error fetching posts: " + error.message);
                console.error(error);
            });
    }, []);

    return (
        <>
        <PostInput />
            <div className="post-list space-y-8">
                {error && <p>{error}</p>}
                {posts.map((post) => (
                    <Post key={post.id} post={post} onDelete={() => { }} /> 
                ))}
            </div>
        </>
    );
};

export default PostList;
