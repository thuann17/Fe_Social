// Chat.js
import React, { useState, useEffect } from "react";
import Message from "./Message";
import Sidebar from "./Sidebar";
import HeaderChatWindow from "./HeaderChatWindow";
import ChatService from "../../../Services/user/ChatService";
import AboutChat from "./about";
import Cookies from "js-cookie";
import WebSocketService from "../../../Services/WebSocketService";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [showAbout, setShowAbout] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
  const [currentFriendChannel, setCurrentFriendChannel] = useState(null);
  const userFromCookie = Cookies.get("username");

  useEffect(() => {
    if (userFromCookie) {
      setUsername(userFromCookie);
      WebSocketService.connect("http://localhost:8080/ws"); // Connect to WebSocket server
    }
    return () => {
      WebSocketService.disconnect(); // Disconnect when component unmounts
    };
  }, [userFromCookie]);

  const handleSelectFriend = async (friend) => {
    setSelectedFriend(friend);
    setLoading(true);
    setError(null);
    try {
      const response = await ChatService.getMessagesBetweenUsers(username, friend.friendUserName);
      if (response.data && response.data.length > 0) {
        setMessages(response.data);
      } else {
        setMessages([]);
      }

      if (currentFriendChannel) {
        WebSocketService.unsubscribe(currentFriendChannel);
      }

      if (WebSocketService.isConnected()) {
        const newChannel = `/topic/public/${friend.friendUserName}`;
        WebSocketService.subscribe(newChannel, (message) => {
          setMessages((prevMessages) => [...prevMessages, message]);
        });
        setCurrentFriendChannel(newChannel);
      }
    } catch (err) {
      setError("Không thể tải tin nhắn");
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = (newMessageContent) => {
    const newMessage = {
      sender: userFromCookie,
      receiver: selectedFriend.friendUserName,
      content: newMessageContent,
      time: new Date(),
    };
    WebSocketService.send("/app/chat.sendMessage", newMessage); // Send message using WebSocket
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const toggleAboutChat = () => {
    setShowAbout(!showAbout);
  };

  return (
    <div className="flex flex-col sm:flex-row h-screen bg-white text-blue-900">
      <Sidebar onSelectFriend={handleSelectFriend} />
      <div className="flex flex-col flex-1 bg-white overflow-hidden border-l border-blue-200 h-full">
        <HeaderChatWindow
          username={selectedFriend?.friendName}
          avt={selectedFriend?.friendAvatar}
          toggleAboutChat={toggleAboutChat}
        />
        <div className="flex-1 overflow-y-auto space-y-4 bg-blue-50 p-4">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <p className="text-lg text-gray-500">Đang tải...</p>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center h-full">
              <p className="text-lg text-red-500">{error}</p>
            </div>
          ) : selectedFriend ? (
            <div className="flex flex-col h-full">
              <Message
                avt={selectedFriend?.friendAvatar}
                messages={messages}
                setMessages={setMessages}
                handleSendMessage={handleSendMessage}
              />
            </div>
          ) : (
            <div className="flex justify-center items-center h-full">
              <p className="text-lg text-gray-500">Chọn bạn bè để bắt đầu trò chuyện</p>
            </div>
          )}
        </div>
      </div>
      {showAbout && <AboutChat />}
    </div>
  );
}

export default Chat;
