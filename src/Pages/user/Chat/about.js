import React, { useState, useEffect } from "react";

const AboutChat = ({ toggleAboutChat }) => {
    const images = [
        "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/anh-phat-dep-lam-hinh-nen-62.jpg",
        "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/anh-phat-dep-lam-hinh-nen-62.jpg",
        "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/anh-phat-dep-lam-hinh-nen-62.jpg"
    ];
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false); // Track if the screen is mobile size

    // Handle screen resize to toggle mobile state
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
                    src="https://via.placeholder.com/80"
                    alt="Profile"
                    className="rounded-full w-20 h-20 mb-4 border-2 border-gray-500"
                />
                <h3 className="text-lg font-semibold text-black">Thúy Vy</h3>
                <p className="text-sm text-black">Hoạt động 55 phút trước</p>
                <button className="mt-2 text-blue-600">Được mã hóa đầu cuối</button>
            </div>

            <div className="flex flex-col space-y-4">
                <button className="flex items-center px-4 py-2 text-black hover:bg-gray-700 rounded">
                    <svg className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="ml-2">Trang cá nhân</span>
                </button>
            </div>

            {/* Scrollable Content Section */}
            <div className="mt-6 overflow-y-auto max-h-[75vh]">
                <h4 className="font-semibold text-black">File phương tiện</h4>
                {/* Multiple images display */}
                <div className="mt-4 grid grid-cols-2 gap-4">
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`File Media ${index + 1}`}
                            className="rounded-lg w-full h-auto cursor-pointer"
                            onClick={openModal}
                        />
                    ))}
                </div>
            </div>

            {/* Modal for showing all images */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-4 rounded-lg max-w-3xl max-h-[90vh] overflow-y-auto relative">
                        <button
                            className="absolute top-2 right-2 text-red-600 text-2xl"
                            onClick={closeModal}
                        >
                            ❎
                        </button>

                        <div className="space-y-4">
                            {/* Display all images vertically */}
                            {images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Selected Media ${index + 1}`}
                                    className="rounded-lg w-full h-auto"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AboutChat;
