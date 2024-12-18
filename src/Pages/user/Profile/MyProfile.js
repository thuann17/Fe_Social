import React from "react";

const MyProfile = ({ name, username }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md text-center mt-12 max-w-md mx-auto relative">
            {/* Avatar Section */}
            <div className="relative -mt-20">
                <div className="bg-white rounded-full p-2 inline-block shadow-lg">
                    {/* Avatar Image */}
                    <img
                        src="https://via.placeholder.com/140" // Adjust the size as needed
                        alt="User"
                        className="rounded-full w-32 h-32 border-4 border-white object-cover"
                    />
                </div>
            </div>
            {/* Profile Information */}
            <div className="mt-6">
                <h2 className="text-2xl font-semibold">{name || "User Name"}</h2>
                <p className="text-gray-500 text-lg">@{username || "username"}</p>
            </div>
        </div>
    );
};

export default MyProfile;