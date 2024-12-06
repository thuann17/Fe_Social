import React from "react";

const RightSidebar = () => {
    const friends = [
        { name: "John Doe", status: "Online" },
        { name: "Jane Smith", status: "Offline" },
        { name: "Alice Johnson", status: "Online" }, { name: "John Doe", status: "Online" },
        { name: "Jane Smith", status: "Offline" },
        { name: "Alice Johnson", status: "Online" }, { name: "John Doe", status: "Online" },
        { name: "Jane Smith", status: "Offline" },
        { name: "Alice Johnson", status: "Online" }, { name: "John Doe", status: "Online" },
        { name: "Jane Smith", status: "Offline" },
        { name: "Alice Johnson", status: "Online" }, { name: "John Doe", status: "Online" },
        { name: "Jane Smith", status: "Offline" },
        { name: "Alice Johnson", status: "Online" },
    ];

    return (
        <aside className="fixed top-16 right-0 w-64 h-[calc(100vh-4rem)] bg-gray-100 shadow-lg">
            {/* Header của Sidebar */}
            <div className="p-4 border-b bg-gray-800 text-white font-semibold">
                Friends
            </div>

            {/* Danh sách bạn bè */}
            <ul className="divide-y divide-gray-200 overflow-y-auto h-full">
                {friends.map((friend, index) => (
                    <li
                        key={index}
                        className="flex items-center justify-between p-4 hover:bg-gray-50"
                    >
                        <span className="font-medium text-gray-700">{friend.name}</span>
                        <span
                            className={`text-sm ${friend.status === "Online"
                                ? "text-green-500"
                                : "text-gray-500"
                                }`}
                        >
                            {friend.status}
                        </span>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default RightSidebar;