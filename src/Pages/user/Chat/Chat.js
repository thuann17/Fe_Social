import React, { useState } from 'react';
import Message from './Message';
import Sidebar from './Sidebar';
import HeaderChatWindow from './HeaderChatWindow';
import AboutChat from './about';

function Chat() {
    const [messages, setMessages] = useState([
        { sender: 'Rey Jhon', content: 'Hello po ang pogi niyo :)', time: new Date() },
        { sender: 'You', content: 'Hello? How can I help you?', time: new Date() },
        { sender: 'Rey Jhon', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', time: new Date() },
        { sender: 'You', content: 'Lorem ipsum dolor sit amet...', time: new Date() },
        { sender: 'Rey Jhon', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', time: new Date() },
        { sender: 'You', content: 'Lorem ipsum dolor sit amet...', time: new Date() },
    ]);
    const [showAbout, setShowAbout] = useState(false); // State to control AboutChat visibility

    const handleSendMessage = (newMessageContent) => {
        const newMessage = {
            sender: 'You',
            content: newMessageContent,
            time: new Date(),
        };
        setMessages([...messages, newMessage]);
    };

    const toggleAboutChat = () => {
        setShowAbout(!showAbout); // Toggle visibility
    };

    return (
        <>
            <div className="flex flex-col sm:flex-row h-screen bg-white text-blue-900">
                {/* Sidebar (Hidden on small screens) */}
                <Sidebar />
                {/* Main chat window */}
                <div className="flex flex-col flex-1 bg-white overflow-hidden border-l border-blue-200 h-full">
                    <HeaderChatWindow toggleAboutChat={toggleAboutChat} />
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-blue-50">
                        <Message />
                    </div>
                </div>
                {showAbout && <AboutChat />}
            </div>
        </>
    );
}

export default Chat;
