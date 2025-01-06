import React, { useState } from "react";
import CallWindow from "../../../Components/user/CallWindow";

const HeaderChatWindow = ({ username, avt, toggleAboutChat }) => {
    const [callType, setCallType] = useState(null); // Audio/Video call state
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state

    const toggleCallWindow = () => {
        setIsModalOpen(false);
        setCallType(null);
    };

    const handleCall = (type) => {
        setCallType(type); // Set call type (audio/video)
        setIsModalOpen(true); // Open modal
    };

    return (
        <header className="flex items-center justify-between px-4 py-2 bg-indigo-200 border-b border-indigo-300">
            <div className="flex items-center space-x-3">
                <img src={avt} alt="Profile" className="w-10 h-10 rounded-full border-2 border-blue-500" />
                <div className="text-gray-800">
                    <span className="font-bold text-lg">{username || "Không có"}</span>
                </div>
            </div>
            <div className="flex space-x-4">
                <button
                    title="Call"
                    onClick={() => handleCall("audio")}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-lg hover:bg-green-100 transition duration-200"
                >
                    <svg className="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="23 7 16 12 23 17 23 7" />
                        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                    </svg>
                </button>
                <button
                    title="Video"
                    onClick={() => handleCall("video")}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-lg hover:bg-red-100 transition duration-200"
                >
                    <svg className="h-6 w-6 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                    </svg>
                </button>
                <button
                    title="Info"
                    onClick={toggleAboutChat}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-lg hover:bg-purple-100 transition duration-200"
                >
                    <svg className="h-6 w-6 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
            </div>

            {isModalOpen && (
                <CallWindow
                    isVideoCall={callType === "video"}
                    toggleCallWindow={toggleCallWindow}
                />
            )}
        </header>
    );
};

export default HeaderChatWindow;
