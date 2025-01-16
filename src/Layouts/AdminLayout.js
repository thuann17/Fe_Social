import React from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "../Components/admin/header";
import SidebarAdmin from "../Components/admin/sidebar";
import { ToastContainer } from "react-toastify";
function AdminLayout() {
    return (<>

        <div className="flex">
            <SidebarAdmin />     <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                className={"z-50"}
            />
            {/* Main Content Area */}
            <div className="flex-1 flex flex-col ml-64">
                <AdminHeader />
                <main className="p-4 bg-gray-100 ">
                    <Outlet />
                </main>
            </div>
        </div></>
    );
}

export default AdminLayout;
