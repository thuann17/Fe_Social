import React, { useState, useEffect } from "react";
import UserService from "../../../Services/user/UserService";
import PostService from "../../../Services/user/PostService";
import Post from "../../../Pages/user/Post/Post";
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie'; // Giả sử bạn đang sử dụng thư viện js-cookie để lấy cookie

const UserInfo = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [userError, setUserError] = useState(null);
  const [loadingUserInfo, setLoadingUserInfo] = useState(true);
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [postsError, setPostsError] = useState(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isFriend, setIsFriend] = useState(false); // Trạng thái bạn bè
  const { username } = useParams();

  useEffect(() => {
    if (!username) {
      setUserError("Username is required.");
      setLoadingUserInfo(false);
      setLoadingPosts(false);
      return;
    }

    const userTarget = Cookies.get("username"); // Lấy username từ cookie (đảm bảo bạn đã cài js-cookie)

    // Hàm kiểm tra tình trạng bạn bè
    const checkFriendship = async () => {
      if (!userTarget || !username) {
        return;
      }

      try {
        const response = await fetch(`/api/friend-requests/check-friendship/${userTarget}/${username}`);

        // Check if the response status is 2xx (successful)
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        // Try parsing the response as JSON
        const result = await response.json();
        setIsFriend(result); // Cập nhật trạng thái bạn bè
      } catch (err) {
        // Handle any errors (including network, JSON parsing, etc.)
        console.error("Đã xảy ra lỗi khi kiểm tra tình trạng bạn bè", err);
        setIsFriend(false);  // Set default to false if there's an error
      }
    };

    // Lấy thông tin người dùng
    setLoadingUserInfo(true);
    UserService.getInfo(username)
      .then((data) => {
        setUserInfo(data);
        setUserError(null);
        checkFriendship(); // Kiểm tra trạng thái bạn bè sau khi lấy được thông tin người dùng
      })
      .catch((err) => {
        setUserError(err.message || "An error occurred while fetching user data");
        setUserInfo(null);
      })
      .finally(() => {
        setLoadingUserInfo(false);
      });

    // Lấy bài viết của người dùng
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
  }, [username]);

  const handleDeletePost = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleUnfriend = () => {
    console.log("Unfriend action triggered");
    // Call API to unfriend the user, and update state
    setIsFriend(false);
  };

  const handleAddFriend = () => {
    console.log("Add Friend action triggered");
    // Call API to add the user as a friend, and update state
    setIsFriend(true);
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

{/*          
          <div className="mt-4">
            {isFriend ? (
              <>
                <button
                  onClick={handleDropdownToggle}
                  className="bg-blue-500 text-white px-4 py-2 rounded-full"
                >
                  Bạn bè
                </button>

                {isDropdownOpen && (
                  <div className="absolute mt-2 right-0 w-48 bg-white shadow-lg rounded-lg border">
                    <button
                      onClick={handleUnfriend}
                      className="block w-full px-4 py-2 text-left text-red-500 hover:bg-gray-100 rounded-lg"
                    >
                      Hủy bạn bè
                    </button>
                  </div>
                )}
              </>
            ) : (
              <button
                onClick={handleAddFriend}
                className="bg-green-500 text-white px-4 py-2 rounded-full"
              >
                Thêm kết bạn
              </button>
            )}
          </div> */}
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
