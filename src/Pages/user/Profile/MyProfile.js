import React from "react";

const MyProfile = ({ name, username }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md text-center relative mt-12 max-w-[700px] mx-auto">
            <div className="bg-white rounded-full p-2 inline-block shadow-lg"> {/* White frame for the avatar */}
                <img 
                    src="https://via.placeholder.com/140" // Increased size to 140x140
                    alt="User"
                    className="rounded-full w-32 h-32 border-4 border-white" // Removed absolute positioning
                />
            </div>
            <div className="pt-16">
                <h2 className="text-2xl font-semibold">{name}</h2>
                <p className="text-gray-500 text-lg">@{username}</p>
               
            </div>
        </div>
    );
};

export default MyProfile;