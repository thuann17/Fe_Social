import React from "react";
import "./sidebar.css";

function Sidebar() {
  const chats = [
    { name: "Rey Jhon", message: "Hey there! Are you fini...", time: "just now" },
    { name: "Cherry Ann", message: "Hello? Are you availabl...", time: "12:00" },
    { name: "Lalaine", message: "I'm thinking of resigni...", time: "yesterday" },
    { name: "Princess", message: "I found a job :)", time: "1 day ago" },
    { name: "Charm", message: "Can you buy me some choc...", time: "1 day ago" },
    { name: "Garen", message: "I'm the bravest of all kind", time: "1 day ago" },
  ];

  return (
    <div className="w-1/5 bg-white p-4 h-screen border-r border-blue-200">
      {/* Title */}
      <h2 className="text-xl font-bold mb-4 text-blue-900 hidden md:block">
        Recent Chats
      </h2>

      {/* Chat List */}
      <div className="space-y-4 overflow-y-auto h-[calc(100vh-4rem)] sidebar-scrollbar">
        {chats.map((chat, index) => (
          <div
            key={index}
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-50"
          >
            {/* Avatar */}
            <div className="h-10 w-10 bg-blue-500 rounded-full"></div>

            {/* Chat Info (Hidden on small screens) */}
            <div className="hidden md:block">
              <h3 className="text-sm font-semibold text-blue-900">{chat.name}</h3>
              <p className="text-xs text-gray-500">{chat.message}</p>
            </div>

            {/* Time (Hidden on small screens) */}
            <span className="ml-auto text-xs text-gray-400 hidden md:inline">
              {chat.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
