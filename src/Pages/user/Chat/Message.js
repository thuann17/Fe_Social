import React, { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../../Services/firebase";
import EmojiPicker from "@emoji-mart/react";
import data from "@emoji-mart/data";

const formatTime = (dateString) => {
  const date = new Date(dateString);
  return isNaN(date)
    ? "Invalid Date"
    : date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const shouldShowMiddleTime = (current, previous) =>
  Math.abs(new Date(current) - new Date(previous)) / (1000 * 60 * 60) >= 1;

function Message({ avt, messages = [], setMessages, handleSendMessage }) {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const messagesEndRef = useRef(null);

  const userFromCookie = Cookies.get("username");

  const handleSendMessageClick = () => {
    if (uploading) return;
  
    if (image) {
      const storageRef = ref(storage, `Images/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);
      setUploading(true);
      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          console.error("Upload failed:", error);
          setUploading(false);
        },
        async () => {
          const url = await getDownloadURL(storageRef);
          const newMessage = {
            sender: userFromCookie,
            content: url,
            time: new Date(),
            read: false,
            type: "image", // Type for image
          };
          handleSendMessage(newMessage); // Send message
          setImage(null);
          setPreviewImage(null);
          setUploading(false);
        }
      );
    } else if (message.trim()) {
      const newMessage = {
        sender: userFromCookie,
        content: message.trim(),
        time: new Date(),
        read: false,
        type: "text", // Type for text message
      };
      handleSendMessage(newMessage); // Send message
      setMessage("");
    } else {
      const newMessage = {
        sender: userFromCookie,
        content: "❤️",
        time: new Date(),
        read: false,
        type: "emoji", // Type for emoji message
      };
      handleSendMessage(newMessage); // Send emoji message
    }
  };
  

  const handleEmojiSelect = (emoji) => {
    setMessage((prev) => prev + emoji.native);
    setShowEmojiPicker(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const clearPreviewImage = () => {
    setImage(null);
    setPreviewImage(null);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-[#f3f4f6]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white sm:p-6 md:p-8">
        {messages.map((msg, index) => (
          <div key={index} className="group">
            {index > 0 && shouldShowMiddleTime(msg.time, messages[index - 1].time) && (
              <div className="text-center text-sm text-gray-500 my-2">
                {formatTime(msg.time)}
              </div>
            )}
            <div className={`flex ${msg.sender === userFromCookie ? "justify-end" : "justify-start"}`}>
              {msg.sender !== userFromCookie && (
                <img
                  src={avt}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full mr-2 self-start"
                />
              )}
              <span className="text-xs text-gray-500 mr-2 self-end opacity-0 group-hover:opacity-100 transition duration-200">
                {formatTime(msg.time)}
              </span>
              <div
                className={`max-w-xs sm:max-w-md p-2 rounded-lg ${msg.sender === userFromCookie
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800"
                  } ${msg.content === "❤️" ? "bg-transparent border-0 text-4xl" : ""}`}
              >
                {msg.type === "image" ? (
                  <img src={msg.content} alt="Sent Image" className="w-full h-auto rounded-lg" />
                ) : (
                  <p>{msg.content}</p>
                )}
                {msg.read && <span className="text-xs text-green-500">Đã xem</span>}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex items-center p-2 bg-white rounded-b-lg sm:p-3 md:p-4 shadow-lg">
        <button
          className="text-gray-600 p-1 hover:bg-gray-200 rounded-full transition ease-in-out duration-300 text-2xl"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        >
          😊
        </button>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
          id="imageInput"
        />
        <label
          htmlFor="imageInput"
          className="text-gray-600 p-1 hover:bg-gray-200 rounded-full cursor-pointer transition ease-in-out duration-300 text-2xl"
        >
          📷
        </label>
        {previewImage && (
          <div className="relative mx-2">
            <img
              src={previewImage}
              alt="Preview"
              className="w-16 h-16 object-cover rounded-lg border border-gray-300"
            />
            <button
              onClick={clearPreviewImage}
              className="absolute top-0 right-0 text-red-500 bg-white rounded-full p-1"
            >
              ✖
            </button>
          </div>
        )}
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message..."
          className="flex-grow bg-white text-gray-800 rounded-full px-3 py-2 mx-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:px-4 md:px-1"
        />
        <button
          onClick={handleSendMessageClick}
          className={`p-1 rounded-full transition ease-in-out duration-300 ${!message.trim() && !image
            ? "text-gray-400 text-2xl"
            : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg text-white px-3 text-1xl"
            }`}
        >
          {message.trim() === "" && !image ? "❤️" : "Gửi"}
        </button>
      </div>
      {showEmojiPicker && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-50">
          <EmojiPicker data={data} onEmojiSelect={handleEmojiSelect} theme="light" />
        </div>
      )}
    </div>
  );
}

export default Message;
