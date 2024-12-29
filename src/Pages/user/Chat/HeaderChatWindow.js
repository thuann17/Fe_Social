import React from "react";

const HeaderChatWindow = ({ toggleAboutChat }) => {
    return (
        <header className="flex items-center justify-between px-4 py-2" style={{ backgroundColor: '#aea3f2', borderBottom: '1px solid #d1c4e9' }}>
            <div className="flex items-center">
                <img
                    src="https://via.placeholder.com/40"
                    alt="Profile"
                    className="w-10 h-10 rounded-full mr-3 border-2 border-blue-500"
                />
                <div className="text-gray-800">
                    <span className="font-bold text-lg">Thúy Vy</span>
                    <p className="text-sm text-gray-600">Hoạt động 55 phút trước</p>
                </div>
            </div>
            <div className="flex space-x-4">
                <button
                    title="Call"
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-lg hover:bg-green-100 transition duration-200"
                >
                    <svg className="h-6 w-6 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="23 7 16 12 23 17 23 7" />
                        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                    </svg>
                </button>
                <button
                    title="Video"
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-lg hover:bg-red-100 transition duration-200"
                >
                    <svg className="h-6 w-6 text-red-500" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                    </svg>
                </button>
                <button
                    title="Info"
                    onClick={toggleAboutChat}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-lg hover:bg-purple-100 transition duration-200"
                >
                    <svg className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
            </div>
        </header>
    );
};

export default HeaderChatWindow;