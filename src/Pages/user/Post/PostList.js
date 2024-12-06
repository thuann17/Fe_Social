import React, { useState } from "react";
import Post from "./Post";

const PostList = () => {
    const [posts, setPosts] = useState([
        {
            id: 1,
            username: "John Doe",
            userAvatar: "https://i.pravatar.cc/40",
            content: "This is my first post with image.",
            image: "https://source.unsplash.com/600x400/?nature",
            video: "https://www.w3schools.com/html/mov_bbb.mp4",
            likes: 10,
            comments: [
                { id: 1, username: "Alice", content: "Awesome post!" }
            ],
            timestamp: "2 hours ago",
        },
        {
            id: 2,
            username: "Jane Smith",
            userAvatar: "https://i.pravatar.cc/40?img=5",
            content: "Another exciting post with multimedia.",
            likes: 25,
            comments: [
                { id: 1, username: "Tom", content: "Great work!" }
            ],
            timestamp: "1 hour ago"
        }
    ]);

    return (
        <div className="post-list space-y-8">
            {posts.map((post) => (
                <Post key={post.id} post={post} />
            ))}
        </div>
    );
};

export default PostList;
