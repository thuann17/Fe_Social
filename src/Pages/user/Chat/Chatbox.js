import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import WebSocketService from "../../../Services/WebSocketService";
import ChatService from "../../../Services/user/ChatService";
import Message from "./Message";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Chatbox({ chat, onClose }) {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [currentFriendChannel, setCurrentFriendChannel] = useState(null);
    const userFromCookie = Cookies.get('username');

    useEffect(() => {
        if (userFromCookie) {
            setUsername(userFromCookie);
            WebSocketService.connect("http://localhost:8080/ws");
        }
        return () => {
            if (currentFriendChannel) {
                WebSocketService.unsubscribe(currentFriendChannel);
            }
            WebSocketService.disconnect();
        };
    }, [userFromCookie, currentFriendChannel]);

    useEffect(() => {
        const fetchMessages = async () => {
            setLoading(true);
            try {
                const response = await ChatService.getMessagesBetweenUsers(userFromCookie, chat.friendUserName);
                setMessages(response.data || []);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        if (chat) {
            fetchMessages();
            console.log("Hello");

            if (WebSocketService.isConnected()) {
                console.log("Hellooooô" + chat.friendUserName);
                const newChannel = `/topic/public/${chat.friendUserName}`;
                if (newChannel !== currentFriendChannel) {
                    if (currentFriendChannel) {
                        WebSocketService.unsubscribe(currentFriendChannel);
                    }
                    WebSocketService.subscribe(newChannel, (message) => {
                        // Khi nhận được tin nhắn qua WebSocket, cập nhật ngay vào messages
                        setMessages((prevMessages) => [...prevMessages, message]);
                    });
                    setCurrentFriendChannel(newChannel);
                }
            }
        }

        return () => {
            if (currentFriendChannel) {
                WebSocketService.unsubscribe(currentFriendChannel);
            }
        };
    }, [chat, userFromCookie, currentFriendChannel]);

    const handleSendMessage = (newMessageContent) => {
        const newMessage = {
            sender: userFromCookie,
            receiver: chat.friendUserName,
            content: newMessageContent,
            time: new Date(),
        };

        // Gửi tin nhắn qua WebSocket
        WebSocketService.send("/app/chat.sendMessage", newMessage);

        // Cập nhật tin nhắn vào trạng thái ngay lập tức
        setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    return (
        <div className="flex flex-col fixed bottom-0 right-0 bg-purple-200 shadow-lg rounded-lg w-72 h-80 md:w-96 md:h-[70vh] border-2 border-gray-300">
            <div className="flex items-center bg-blue-500 rounded-t-lg p-3">
                <img
                    src={chat.friendAvatar}
                    alt="avatar"
                    className="h-10 w-10 rounded-full"
                />
                <div className="ml-3">
                    <h2 className="font-bold text-white text-sm">{chat.friendName}</h2>
                    <span className="text-xs text-blue-100">Online</span>
                </div>
                <div className="ml-auto flex space-x-2">
                  
                    <button className="text-white text-sm" onClick={onClose}>✖</button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
                <Message
                    avt={chat.friendAvatar}
                    messages={messages}
                    setMessages={setMessages}
                    handleSendMessage={handleSendMessage}
                />
            </div>
        </div>
    );
}

export default Chatbox;
