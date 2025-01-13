import { Disclosure, Menu } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon, ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"
function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Example() {
    const navigate = useNavigate();

    const handleSignOut = () => {
        Cookies.remove("username");
        Cookies.remove("role");
        Cookies.remove("token");
        navigate("/login");
    };
    return (
        <Disclosure as="nav" className="bg-gray-800 sticky top-0 z-50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
             
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
        
                        <div className="flex shrink-0 items-center">
                        </div>
                    </div>

                    {/* Search Box */}


                    {/* Right section */}
                    <div className="absolute inset-y-0 right-0 flex items-center space-x-4 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        {/* Messages */}
                        <button
                            type="button"
                            className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                            <span className="sr-only">View messages</span>
                            <ChatBubbleLeftIcon className="h-6 w-6" aria-hidden="true" />
                        </button>

                        {/* Notifications */}
                        <button
                            type="button"
                            className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                            <span className="sr-only">View notifications</span>
                            <BellIcon className="h-6 w-6" aria-hidden="true" />
                        </button>

                        {/* Profile dropdown */}
                        <Menu as="div" className="relative">
                            <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                <span className="sr-only">Open user menu</span>
                                <img
                                    className="h-8 w-8 rounded-full"
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    alt=""
                                />
                            </Menu.Button>
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">

                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            onClick={() => navigate("/admin/profile")}
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
