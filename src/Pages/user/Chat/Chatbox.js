import React, { useState, useRef } from "react";
import Message from "./Message";

function Chatbox({ chat, onClose }) {
    const [isOpen, setIsOpen] = useState(false);  // Chatbox state
    const [dialogVisible, setDialogVisible] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);  // State for icon visibility
    const dialogButtonRef = useRef(null);

    const closeChat = () => {
        setIsOpen(false);  // Hide the chatbox
        setIsMinimized(true);  // Show the icon when chat is closed
        if (onClose) onClose();
    };

    const toggleDialog = () => {
        setDialogVisible(!dialogVisible);
    };

    const openChat = () => {
        setIsOpen(true);  // Open the chatbox
        setIsMinimized(false);  // Hide the icon when chat is opened
    };

    if (!chat || (!isOpen && !isMinimized)) return null;  // Return null if chat is closed and icon is not visible

    return (
        <>
            {/* Chatbox component */}
            {isOpen && (
                <div className="flex flex-col" style={{ backgroundColor: '#e0aafe', borderRadius: '0.5rem', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', width: '50vh', maxWidth: '50vh', position: 'fixed', bottom: '0', right: '7rem', border: '1px solid #ccc', height: '65vh', maxHeight: '65vh' }}>
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
                            <button
                                ref={dialogButtonRef}
                                className="text-white text-sm"
                                onClick={toggleDialog}
                            >
                                ❗
                            </button>
                            <button onClick={closeChat} className="text-white text-sm">✖</button>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto overflow-x-hidden">
                        <Message />
                    </div>
                    {dialogVisible && (
                        <div
                            className="absolute rounded-lg p-4 w-48"
                            style={{
                                backgroundColor: '#e0aafe',
                                top: dialogButtonRef.current
                                    ? dialogButtonRef.current.getBoundingClientRect().top + window.scrollY - 200
                                    : 0,
                                right: 2,
                            }}
                        >
                            <ul>
                                <li className="py-2 hover:bg-purple-500 transition-colors duration-200 cursor-pointer rounded">
                                    Mở trong Messenger
                                </li>
                                <li className="py-2 hover:bg-purple-500 transition-colors duration-200 cursor-pointer rounded">
                                    Xem trang cá nhân
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            )}

            {/* Icon when chatbox is minimized */}
            {isMinimized && (
                <div
                    className="fixed bottom-6 right-7 cursor-pointer"
                    onClick={openChat}  // Open the chatbox again when clicked
                >
                    <img
                        src="https://via.placeholder.com/40"
                        alt="Chat Icon"
                        className="rounded-full w-10 h-10"
                    />
                </div>
            )}
        </>
    );
}

export default Chatbox;
