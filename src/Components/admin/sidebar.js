import React from "react";
import { NavLink } from "react-router-dom";
import {
    HomeIcon,
    UserGroupIcon,
    CogIcon,
    ChartBarIcon,
} from "@heroicons/react/24/outline";

const SidebarAdmin = () => {
    const navigation = [
        { name: "Dashboard", icon: HomeIcon, href: "dashboard" },
        { name: "Quản lý địa điểm", icon: UserGroupIcon, href: "place" },
        { name: "Quản lý tài khoản", icon: UserGroupIcon, href: "account" },
        { name: "Quản lý bài đăng", icon: ChartBarIcon, href: "post" },
        { name: "Cấp tài khoản quản lý", icon: CogIcon, href: "register-admin" },
    ];

    return (
        <div className="bg-gray-800 text-white h-screen w-64 fixed top-0 left-0">
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
