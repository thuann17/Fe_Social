import React from "react";
import { NavLink } from "react-router-dom";
import {
    HomeIcon,
    UserGroupIcon,
    CogIcon,
    ChartBarIcon,
    MapIcon,
} from "@heroicons/react/24/outline";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SidebarAdmin = () => {
    const navigation = [
        { name: "Dashboard", icon: HomeIcon, href: "dashboard" },
        { name: "Quản lý địa điểm", icon: MapIcon, href: "place" },
        { name: "Quản lý bài đăng", icon: ChartBarIcon, href: "post" },
        { name: "Quản lý tài khoản", icon: UserGroupIcon, href: "account" },
        { name: "Cấp tài khoản quản lý", icon: CogIcon, href: "register-admin" },
    ];

    const handleNavClick = (name, href, event) => {
        if (name === "Quản lý địa điểm") {
            event.preventDefault();
            toast.info("Tính năng đang phát triển!")
        }
    };

    return (
        <div className="bg-gray-800 text-white h-screen w-64 fixed top-0 left-0">
            <ToastContainer />
            <div
                className="text-xl font-semibold border-b border-gray-700"
                style={{ padding: "1.1rem" }}
            >
                FSHARK
            </div>
            <nav className="mt-4">
                {navigation.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.href}
                        className={({ isActive }) =>
                            `flex items-center px-4 py-4 text-sm font-medium ${isActive
                                ? "bg-gray-700 text-white"
                                : "text-gray-400"
                            } hover:bg-gray-700 hover:text-white`
                        }
                        end
                        onClick={(event) => handleNavClick(item.name, item.href, event)}
                    >
                        <item.icon className="h-5 w-5 mr-3" />
                        {item.name}
                    </NavLink>
                ))}
            </nav>
        </div>
    );
};

export default SidebarAdmin;
