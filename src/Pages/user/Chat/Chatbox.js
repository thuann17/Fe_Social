import React, { useState } from "react";
import Message from "./Message";

function Chatbox({ chat, onClose }) {
    const [isOpen, setIsOpen] = useState(true);

    if (!chat || !isOpen) return null;

    const closeChat = () => {
        setIsOpen(false);
        if (onClose) onClose();
    };

    return (
        <div className="flex flex-col bg-white rounded-lg shadow-lg w-[50vh] max-w-[50vh] fixed bottom-0 right-7 border border-gray-300 h-[65vh] max-h-[65vh]">
            <div className="flex items-center bg-blue-500 rounded-t-lg p-2">
                <img
                    src={chat.avatar || "https://via.placeholder.com/40"}
                    alt="avatar"
                    className="h-8 w-8 rounded-full"
                />
                <div className="ml-3">
                    <h2 className="font-bold text-white text-sm">{chat.name}</h2>
                    <span className="text-xs text-blue-100">Online</span>
                </div>
                <div className="ml-auto flex space-x-2">
                    <button className="text-white text-sm">📞</button>
                    <button className="text-white text-sm">📹</button>
                    <button className="text-white text-sm">➖</button>
                    <button onClick={closeChat} className="text-white text-sm">✖</button>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto overflow-x-hidden">
                <Message />
            </div>
        </div>
    );
}

export default Chatbox;
