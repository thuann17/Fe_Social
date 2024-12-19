import React from "react";
import { FaUserFriends, FaUsers, FaVideo, FaClock, FaEnvelope } from "react-icons/fa";

const Sidebar = () => {
    const mainSections = [
        { name: "Bạn bè", icon: <FaUserFriends className="text-blue-500" /> },
        { name: "Nhóm", icon: <FaUsers className="text-green-500" /> },
        { name: "Bài đăng", icon: <FaVideo className="text-red-500" /> },
    ];

    const yourMomentsSections = [
        { name: "Lịch trình", icon: <FaClock className="text-purple-500" /> },
        { name: "Tin nhắn", icon: <FaEnvelope className="text-orange-500" /> },
    ];

    return (
        <aside className="w-64 h-auto bg-white shadow-lg p-4">
            {/* Logo */}
            <div className="flex justify-center mb-4">
                <img 
                    src="/logoreback.png" // Change to your logo path
                    alt="Logo"
                    className="h-16 w-auto" // Adjust size as needed
                />
            </div>

            {/* Main Sections */}
            <div className="mb-6">
                {mainSections.map((section, index) => (
                    <div
                        key={index}
                        className="flex items-center p-2 hover:bg-gray-100 transition duration-200 rounded-lg"
                    >
                        <span className="text-xl mr-2">{section.icon}</span>
                        <span className="font-medium">{section.name}</span>
                    </div>
                ))}
            </div>

            {/* Your Moments Sections */}
            <div>
                <h3 className="font-semibold mb-2">Khoảnh khắc</h3>
                {yourMomentsSections.map((section, index) => (
                    <div
                        key={index}
                        className="flex items-center p-2 hover:bg-gray-100 transition duration-200 rounded-lg"
                    >
                        <span className="text-xl mr-2">{section.icon}</span>
                        <span className="font-medium">{section.name}</span>
                    </div>
                ))}
            </div>
        </aside>
    );
};

export default Sidebar;