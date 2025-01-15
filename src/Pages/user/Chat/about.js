import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const AboutChat = ({ toggleAboutChat, selectedFriend }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const navigate = useNavigate();
    const goToProfile = () => {

        if (selectedFriend) {
            navigate(`/friendprofile/${selectedFriend.friendUserName}`);
        }
    };
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 640); // Tailwind's sm breakpoint (640px)
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const goBack = () => {
        toggleAboutChat(); // Close About Chat modal when back button is clicked
    };

    return (
        <div className="h-screen sm:w-72 w-full p-4 flex flex-col" style={{ backgroundColor: '#b8aef3' }}>
            {/* Back Button on mobile */}
            {isMobile && (
                <button
                    onClick={goBack}
                    className="absolute top-4 left-4 text-2xl text-blue-600 bg-white p-2 rounded-full shadow-lg"
                >
                    ←
                </button>
            )}

            {/* Profile Section */}
            <div className="flex flex-col items-center mb-6">
                <img
                    src={selectedFriend?.friendAvatar || "https://via.placeholder.com/80"}
                    alt="Profile"
                    className="rounded-full w-20 h-20 mb-4 border-2 border-gray-500"
                />
                <h3 className="text-lg font-semibold text-black">{selectedFriend?.friendName || "Tên người dùng"}</h3>
            </div>

            <div className="flex flex-col space-y-4">
                <button className="flex items-center px-4 py-2 text-black hover:bg-gray-700 rounded">
                    <svg className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="ml-2" onClick={goToProfile}  >Trang cá nhân</span>
                </button>
            </div>




        </div>
    );
};

export default AboutChat;
