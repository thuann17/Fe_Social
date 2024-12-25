import React from "react";

const HeaderChatWindow = ({ toggleAboutChat }) => {
    return (
        <>
            <header className="flex items-center justify-between px-4 py-2 bg-blue-500">
                <div className="flex items-center">
                    <img
                        src="https://via.placeholder.com/40"
                        alt="Profile"
                        className="w-10 h-10 rounded-full mr-3"
                    />
                    <span className="text-white font-bold text-lg">Xàmmmmmm</span>
                </div>
                <div className="flex space-x-4">
                    <button title="Call" className="w-8 h-8 flex items-center justify-center text-pink-500 hover:text-pink-400">
                        <svg className="h-8 w-8 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polygon points="23 7 16 12 23 17 23 7" />  
                            <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                        </svg>
                    </button>
                    <button title="Video" className="w-8 h-8 flex items-center justify-center text-pink-500 hover:text-pink-400">
                        <svg className="h-8 w-8 text-gray-500" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                        </svg>
                    </button>
                    <button 
                        title="Info" 
                        onClick={toggleAboutChat} // Trigger toggle on click
                        className="w-8 h-8 flex items-center justify-center text-pink-500 hover:text-pink-400">
                        <svg className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                </div>
            </header>
        </>
    );
};

export default HeaderChatWindow;
