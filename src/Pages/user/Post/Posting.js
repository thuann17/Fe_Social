import React, { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import UserService from "../../../Services/user/UserService";
import PostService from "../../../Services/user/PostService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../Services/firebase"; // Ensure you have the firebase setup

const PostInput = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [textInput, setTextInput] = useState("");
  const [posting, setPosting] = useState(false); // Posting status
  const [postMessage, setPostMessage] = useState(""); // Post message
  const [images, setImages] = useState([]); // Selected images

  const imageInputRef = useRef(null); // Reference for the file input

  // Fetch user information on component mount
  useEffect(() => {
    const username = Cookies.get("username");
    if (username) {
      setLoading(true);
      UserService.getInfo(username)
        .then((data) => {
          setUserInfo(data);
          setError(null);
        })
        .catch((err) => {
          setError(err.message || "An error occurred while fetching data");
          setUserInfo(null);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  // Image upload to Firebase
  const uploadImageToFirebase = async (file, postId) => {
    try {
      const storageRef = ref(storage, `posts/${postId}/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading image to Firebase:", error);
      throw error;
    }
  };

  // Handle post submission
  const handlePost = async () => {
    const username = Cookies.get("username");

    if (!textInput.trim()) {
      setPostMessage("Nội dung bài viết không được để trống!");
      return;
    }

    if (!username) {
      setPostMessage("Không tìm thấy người dùng.");
      return;
    }
    
    setPosting(true);
    setPostMessage("");

    let imageUrls = [];

    try {
      // Step 1: If images exist, upload them concurrently
      if (images.length > 0) {
        const uploadPromises = images.map((image) =>
          uploadImageToFirebase(image) // Upload each image and return its URL
        );

        // Wait for all uploads to complete and get image URLs
        imageUrls = await Promise.all(uploadPromises);
      }

      // Step 2: Create the post with image URLs (if any)
      const newPost = {
        username: username,
        createdAt: new Date().toISOString(),
        content: textInput,
        status: 1, // Adjust the status as needed
        imagePosts: imageUrls, // Save multiple image URLs
      };

      // Create the post in the database and get the response (postId)
      const response = await PostService.createPost(newPost);

      console.log("Post created successfully, postId:", response.postId);

      // Clear inputs and reset form state
      setTextInput("");
      setImages([]); // Reset image inputs after successful post
      toast.success("Đã đăng bài viết", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (err) {
      setPostMessage("Đã xảy ra lỗi khi đăng bài viết.");
      toast.error("Đã xảy ra lỗi khi đăng bài viết.");
      console.error("Error during post submission:", err);
    } finally {
      setPosting(false);
    }
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to an array
    setImages(files); // Store the selected files in the state
  };

  // Trigger the file input click event
  const handleImageButtonClick = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  // Display loading or error states if necessary
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <div className="error">
        <h2>Error: {error}</h2>
      </div>
    );
  }

  if (!userInfo) {
    return <p>User not found.</p>;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-5 w-full max-w-[700px] mx-auto">
      <ToastContainer />
      <div className="flex items-center space-x-3">
        <img
          src={userInfo.avatarUrl || "https://via.placeholder.com/32"}
          alt="Avatar"
          className="rounded-full w-10 h-10"
        />
        <p className="text-gray-800 font-semibold">Bạn đang nghĩ gì thế?</p>
      </div>
      <textarea
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
        placeholder="Viết bài viết của bạn ở đây..."
        className="w-full mt-4 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        rows={3}
        disabled={posting} // Disable textarea while posting
      />
      <div className="flex flex-col md:flex-row justify-between items-center mt-4">
        <div className="flex space-x-4 mb-4 md:mb-0">
          <button
            onClick={handleImageButtonClick} // Trigger file input when clicked
            className="flex items-center bg-gray-200 p-2 rounded-lg hover:bg-gray-300 transition duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-4l4.586 4.586a2 2 0 002.828 0l4.586-4.586a2 2 0 00-2.828-2.828l-4.586 4.586m-4-4l4.586 4.586a2 2 0 00-2.828 0L4 12m10-2l4.586 4.586a2 2 0 002.828 0l4.586-4.586a2 2 0 00-2.828-2.828l-4.586 4.586"
              />
            </svg>
            <span className="ml-2 font-medium">Ảnh</span>
          </button>
          {/* Hidden file input to allow multiple files */}
          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            multiple
            className="hidden"
          />
        </div>
        <button
          onClick={handlePost}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 w-full md:w-auto"
          disabled={posting} 
        >
          {posting ? "Đang đăng..." : "Đăng"}
        </button>
      </div>
      {postMessage && (
        <div className={`mt-4 ${posting ? "text-gray-600" : "text-green-600"}`}>
          {postMessage}
        </div>
      )}
    </div>
  );
};

export default PostInput;
