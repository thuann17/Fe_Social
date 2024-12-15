import React from "react";

const RightSidebar = () => {
    const friends = [
        { name: "John Doe", status: "Online" },
        { name: "Jane Smith", status: "Offline" },
        { name: "Alice Johnson", status: "Online" },
        { name: "Michael Brown", status: "Offline" },
        { name: "Emily Davis", status: "Online" },
        { name: "Chris Wilson", status: "Online" },
        { name: "Sarah Lee", status: "Offline" },
        { name: "David Clark", status: "Online" },
        { name: "Rachel Green", status: "Online" },
        { name: "Ross Geller", status: "Online" },
        { name: "Monica Geller", status: "Offline" },
        { name: "Chandler Bing", status: "Online" },
        { name: "Phoebe Buffay", status: "Offline" },
    ];

    const suggestions = ["User1", "User2", "User3", "User4", "User5", "User6"];

    return (
        <aside className="w-64 h-screen bg-white shadow-lg p-4">
            {/* Suggestions Section */}
            <div className="mb-7">
                <h3 className="font-semibold text-lg mb-2">Yêu cầu kết bạn</h3>
                <div className="max-h-36 overflow-y-auto">
                    <ul>
                        {suggestions.map((user, index) => (
                            <li key={index} className="flex justify-between items-center p-2 hover:bg-gray-100 transition duration-200">
                                <span>{user}</span>
                                <button className="bg-blue-500 text-white px-2 py-1 rounded">Follow</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Online Friends Section */}
            <div>
                <h3 className="font-semibold text-lg mb-2">Đang truy cập</h3>
                <div className="max-h-60 overflow-y-auto">
                    <ul className="divide-y divide-gray-200">
                        {friends.filter(friend => friend.status === "Online").map((friend, index) => (
                            <li key={index} className="flex items-center justify-between p-2 hover:bg-gray-100 transition duration-200">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold">
                                        {friend.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-800">{friend.name}</p>
                                        <p className="text-sm text-green-500">{friend.status}</p>
                                    </div>
                                </div>
                                <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </aside>
    );
};

export default RightSidebar;