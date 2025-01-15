import { Disclosure, Menu } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Example() {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);
    const username = Cookies.get("username");
    const handleSignOut = () => {
        Cookies.remove("username");
        Cookies.remove("role");
        Cookies.remove("token");
        navigate("/");
    };
    useEffect(() => {
        if (username) {
            axios
                .get(`http://localhost:8080/api/admin/profile/${username}`)
                .then((response) => {
                    setUserInfo(response.data);
                })
                .catch((error) => {
                    console.error("Lỗi khi lấy thông tin người dùng:", error);
                });
        }
    }, [username]);
    return (
        <Disclosure as="nav" className="bg-gray-800 sticky top-0 z-50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">

                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">

                        <div className="flex shrink-0 items-center">
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center space-x-4 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <h1 className="text-white">Xin chào: {userInfo?.lastname} {userInfo?.firstname}
                            </h1>  <Menu as="div" className="relative">
                            <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                <img
                                    className="h-10 w-10 rounded-full"
                                    src={userInfo?.images?.[userInfo.images.length - 1]?.avatarrurl}
                                    alt={userInfo?.username || "User Avatar"}
                                />

                            </Menu.Button>
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">

                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            onClick={() => navigate("/profile")}
                                            className={classNames(
                                                active ? "bg-gray-100" : "",
                                                "block px-4 py-2 text-sm text-gray-700",
                                                "cursor-pointer"
                                            )}
                                        >
                                            Hồ sơ
                                        </a>
                                    )}
                                </Menu.Item>

                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            onClick={handleSignOut}
                                            className={classNames(
                                                active ? "bg-gray-100" : "",
                                                "block px-4 py-2 text-sm text-gray-700"
                                            )}
                                        >
                                            Đăng xuất
                                        </button>
                                    )}
                                </Menu.Item>
                            </Menu.Items>
                        </Menu>
                    </div>
                </div>
            </div>
        </Disclosure>
    );
}
