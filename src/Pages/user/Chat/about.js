import React from "react";

const AboutChat = () => {
    return (
        <div className="h-screen sm:w-72 w-full p-4 flex flex-col" style={{ backgroundColor: '#b8aef3' }}>
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

                <button className="flex items-center px-4 py-2 text-black hover:bg-gray-700 rounded">
                    <svg className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v1a3 3 0 0 0 6 0v-1" />
                    </svg>
                    <span className="ml-2">Tắt thông báo</span>
                </button>

                <button className="flex items-center px-4 py-2 text-black hover:bg-gray-700 rounded">
                    <svg className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v1a3 3 0 0 0 6 0v-1" />
                    </svg>
                    <span className="ml-2">Tìm kiếm</span>
                </button>
            </div>

            {/* Additional Sections */}
            <div className="mt-6">
                <h4 className="font-semibold text-black">Thông tin về đoạn chat</h4>
                <button className="flex justify-between items-center text-black hover:bg-gray-700 rounded px-4 py-2 w-full">
                    <span>Tùy chỉnh đoạn chat</span>
                    <svg className="h-4 w-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
                <button className="flex justify-between items-center text-black hover:bg-gray-700 rounded px-4 py-2 w-full">
                    <span>File phương tiện & file</span>
                    <svg className="h-4 w-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
                <button className="flex justify-between items-center text-black hover:bg-gray-700 rounded px-4 py-2 w-full">
                    <span>Quyền riêng tư và hỗ trợ</span>
                    <svg className="h-4 w-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default AboutChat;