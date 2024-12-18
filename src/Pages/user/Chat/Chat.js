import React from "react";
import './chat.css';
import LeftChat from "./LeftChat";
import RightChat from "./RightChat";

const Chat = () => {
    return (
        <>
            <div className="h-screen w-full flex antialiased text-gray-200 bg-gray-900 overflow-hidden">
                <div className="flex-1 flex flex-col">

                    <main className="flex-grow flex flex-row min-h-0">

                        <LeftChat></LeftChat>
                        <RightChat></RightChat>
                    </main>
                </div>
            </div></>
    )
}
export default Chat;