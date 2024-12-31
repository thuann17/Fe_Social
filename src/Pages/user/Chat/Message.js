import React, { useState, useEffect, useRef } from "react";

const messagesData = [
  {
    sender: "Chat",
    content: "Chào bạn!",
    time: new Date("2024-12-22T12:00:00"),
    status: "received",
  },
  {
    sender: "You",
    content: "Chào bạn! Mình có thể giúp gì cho bạn?",
    time: new Date("2024-12-22T12:01:00"),
    status: "read",
  },
  {
    sender: "Chat",
    content: "Bạn khỏe không?",
    time: new Date("2024-12-22T13:00:00"),
    status: "received",
  },
  {
    sender: "You",
    content: "Mình ổn, cảm ơn bạn!",
    time: new Date("2024-12-22T14:00:00"),
    status: "sent",
  },
];

const formatTime = (date) =>
  `${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`;

const shouldShowMiddleTime = (current, previous) =>
  Math.abs(current - previous) / (1000 * 60 * 60) >= 1; // Hiển thị thời gian giữa nếu cách nhau 1 giờ

function Message() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(messagesData);
  const messagesEndRef = useRef(null); // Create a ref for the scrollable container

  const handleSendMessage = () => {
    if (!message.trim()) return;
    const newMessage = {
      sender: "You",
      content: message.trim(),
      time: new Date(),
      status: "sent", // Initially, the message is sent
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessage("");
  };

  // Scroll to the bottom every time the messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-[#b8aef3]">
      {/* Tin nhắn */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-4 bg-[#e0e7ff] sm:p-6 md:p-8">
        {messages.map((msg, index) => (
          <div key={index} className="group">
            {/* Hiển thị thời gian giữa nếu cách nhau hơn 1 giờ */}
            {index > 0 &&
              shouldShowMiddleTime(msg.time, messages[index - 1].time) && (
                <div className="text-center text-sm text-gray-500 my-2">
                  {msg.time.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              )}

            <div
              className={`flex ${
                msg.sender === "You" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.sender !== "You" && (
                <img
                  src="path/to/avatar.png" // Replace with the actual path to the avatar image
                  alt="Avatar"
                  className="w-8 h-8 rounded-full mr-2 self-start"
                />
              )}
              {/* Time display, hidden by default and shown on hover */}
              <span className="text-xs text-gray-500 mr-2 self-end opacity-0 group-hover:opacity-100 transition duration-200">
                {formatTime(msg.time)}
              </span>
              <div
                className={`max-w-xs sm:max-w-md p-3 rounded-lg ${
                  msg.sender === "You"
                    ? "bg-[#ad83d9] text-white"
                    : "bg-white text-gray-800"
                }`}
              >
                <p>{msg.content}</p>
              </div>
            </div>
            {/* Trạng thái tin nhắn */}
            {index === messages.length - 1 &&
              msg.sender === "You" &&
              msg.status === "sent" && (
                <div className="text-xs text-gray-400 mt-1 text-right">
                  ✔️ Đã gửi
                </div>
              )}
            {index === messages.length - 1 &&
              msg.sender !== "You" &&
              msg.status === "received" && (
                <div className="text-xs text-gray-400 mt-1 text-right">
                  ✔️✔️ Đã xem
                </div>
              )}
          </div>
        ))}
        {/* Scroll reference to ensure we scroll to the bottom */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input tin nhắn */}
      <div className="flex items-center p-2 bg-white rounded-b-lg sm:p-3 md:p-4 shadow-lg">
        {/* Avatar with white background */}
        <button className="text-gray-600 p-1 hover:bg-gray-200 hover:shadow-sm rounded-full transition ease-in-out duration-300">
          😊
        </button>
        <button className="text-gray-600 p-1 hover:bg-gray-200 hover:shadow-sm rounded-full transition ease-in-out duration-300">
          📎
        </button>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Nhập tin nhắn..."
          className="flex-grow bg-white text-gray-800 rounded-full px-3 py-2 mx-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:px-4 md:px-1"
        />
        <button
          onClick={handleSendMessage}
          className={`p-1 rounded-full transition ease-in-out duration-300 ${
            !message.trim()
              ? "text-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg text-white px-3"
          }`}
        >
          {message.trim() === "" ? "❤️" : "Gửi"}
        </button>
      </div>
    </div>
  );
}

export default Message;
