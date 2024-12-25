import React from "react";

const AboutChat = () => {
    return (
        <>
            <div className="bg-white border-l border-gray-200 h-screen sm:w-72 w-full p-4 flex flex-col">
                {/* Profile Section */}
                <div className="flex flex-col items-center mb-6">
                    <img
                        src="https://via.placeholder.com/80"
                        alt="Profile"
                        className="rounded-full w-20 h-20 mb-4"
                    />
                    <h3 className="text-lg font-semibold text-gray-800">Xămmmmmmm</h3>
                </div>

                <div className="flex space-x-4">
                    <button className="flex flex-col items-center px-4 py-2 text-gray-800 hover:bg-gray-100 rounded">
                        <svg className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Trang cá nhân</span>
                    </button>

                    <button className="flex flex-col items-center px-4 py-2 text-gray-800 hover:bg-gray-100 rounded">
                        <svg class="h-8 w-8 text-gray-500" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
                            <path d="M9 17v1a3 3 0 0 0 6 0v-1" /></svg>
                        <span>Tắt thông báo</span>
                    </button>

                    <button className="flex flex-col items-center px-4 py-2 text-gray-800 hover:bg-gray-100 rounded">
                        <svg class="h-8 w-8 text-gray-500" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" />  <circle cx="10" cy="10" r="7" />  <line x1="21" y1="21" x2="15" y2="15" /></svg>
                        <span>Tìm kiếm</span>
                    </button>
                </div>


                {/* Additional Sections */}
                <div className="mt-6 space-y-4">

                </div>
            </div></>
    );
};

export default AboutChat;
