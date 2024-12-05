import React from "react";
import { Routes, Route } from "react-router-dom";
import Index from "../pages/user/Index";
// import About from "../pages/user/About";
// import Friends from "../pages/user/Friends";
// import Schedule from "../pages/user/Schedule";
// import Chat from "../pages/user/Chat";

function UserRoutes() {
    return (
        <Routes>
            <Route path="index" element={<Index />} />
            {/* <Route path="about/:username" element={<About />} />
            <Route path="friends/:username" element={<Friends />} />
            <Route path="schedule/:username" element={<Schedule />} />
            <Route path="chat" element={<Chat />} /> */}
        </Routes>
    );
}

export default UserRoutes;
