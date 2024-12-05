import React from "react";
import { Routes, Route } from "react-router-dom";
// import Dashboard from "../pages/admin/Dashboard";
// import Account from "../pages/admin/Account";
// import Trip from "../pages/admin/Trip";
// import Post from "../pages/admin/Post";
// import ProfileAdmin from "../pages/admin/ProfileAdmin";
// import PostDetail from "../pages/admin/PostDetail";
// import AccountDetail from "../pages/admin/AccountDetail";

function AdminRoutes() {
    return (
        <Routes>
            {/* <Route path="dashboard" element={<Dashboard />} />
            <Route path="account" element={<Account />} />
            <Route path="trip" element={<Trip />} />
            <Route path="post" element={<Post />} />
            <Route path="profileadmin" element={<ProfileAdmin />} />
            <Route path="post/:postId" element={<PostDetail />} />
            <Route path="account/:username" element={<AccountDetail />} /> */}
        </Routes>
    );
}

export default AdminRoutes;
