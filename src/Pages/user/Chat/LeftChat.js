import React from "react";

const LeftChat = () => {
    return (
        <>
            <section className="flex flex-col flex-none overflow-auto w-24 group lg:max-w-sm md:w-2/5 transition-all duration-300 ease-in-out">
                <div className="contacts p-2 flex-1 overflow-y-scroll">
                    <div className="flex justify-between items-center p-3 hover:bg-gray-800 rounded-lg relative">
                        <div className="w-16 h-16 relative flex flex-shrink-0">
                            <img className="shadow-md rounded-full w-full h-full object-cover"
                                src="https://randomuser.me/api/portraits/women/61.jpg"
                                alt=""
                            />
                        </div>
                        <div className="flex-auto min-w-0 ml-4 mr-6 hidden md:block group-hover:block">
                            <p>Angelina Jolie</p>
                            <div className="flex items-center text-sm text-gray-600">
                                <div className="min-w-0">
                                    <p className="truncate">Ok, see you at the subway in a bit.</p>
                                </div>
                                <p className="ml-2 whitespace-no-wrap">Just now</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center p-3 hover:bg-gray-800 rounded-lg relative">
                        <div className="w-16 h-16 relative flex flex-shrink-0">
                            <img className="shadow-md rounded-full w-full h-full object-cover"
                                src="https://randomuser.me/api/portraits/men/97.jpg"
                                alt=""
                            />
                            <div className="absolute bg-gray-900 p-1 rounded-full bottom-0 right-0">
                                <div className="bg-green-500 rounded-full w-3 h-3"></div>
                            </div>
                        </div>
                        <div className="flex-auto min-w-0 ml-4 mr-6 hidden md:block group-hover:block">
                            <p className="font-bold">Tony Stark</p>
                            <div className="flex items-center text-sm font-bold">
                                <div className="min-w-0">
                                    <p className="truncate">Hey, Are you there?</p>
                                </div>
                                <p className="ml-2 whitespace-no-wrap">10min</p>
                            </div>
                        </div>
                        <div className="bg-blue-700 w-3 h-3 rounded-full flex flex-shrink-0 hidden md:block group-hover:block"></div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg relative">
                        <div className="w-16 h-16 relative flex flex-shrink-0">
                            <img className="shadow-md rounded-full w-full h-full object-cover"
                                src="https://randomuser.me/api/portraits/women/33.jpg"
                                alt=""
                            />
                        </div>
                        <div className="flex-auto min-w-0 ml-4 mr-6 hidden md:block group-hover:block">
                            <p>Scarlett Johansson</p>
                            <div className="flex items-center text-sm text-gray-600">
                                <div className="min-w-0">
                                    <p className="truncate">You sent a photo.</p>
                                </div>
                                <p className="ml-2 whitespace-no-wrap">1h</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center p-3 hover:bg-gray-800 rounded-lg relative">
                        <div className="w-16 h-16 relative flex flex-shrink-0">
                            <img className="shadow-md rounded-full w-full h-full object-cover"
                                src="https://randomuser.me/api/portraits/men/12.jpg"
                                alt=""
                            />
                        </div>
                        <div className="flex-auto min-w-0 ml-4 mr-6 hidden md:block group-hover:block">
                            <p>John Snow</p>
                            <div className="flex items-center text-sm text-gray-600">
                                <div className="min-w-0">
                                    <p className="truncate">You missed a call John.</p>
                                </div>
                                <p className="ml-2 whitespace-no-wrap">4h</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default LeftChat;
