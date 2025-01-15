import { Disclosure } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie"
const navigation = [
  { name: "Trang chủ", href: "/index" },
  { name: "Lịch trình", href: "/cal" },
  { name: "Bạn bè", href: "/friends" },
  { name: "Trang cá nhân", href: "/myprofile" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = () => {
    Cookies.remove("role")
    Cookies.remove("token")
    Cookies.remove("username")
    navigate("/login");
  };
  const handleHoSo = () => {

    navigate("/hoso");
  };

  return (
    <Disclosure as="nav" className="bg-[#c67dff] sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-900 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
            </Disclosure.Button>
          </div>

          {/* Logo and Navigation */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            {/* Logo */}
            <div className="flex shrink-0 items-center">
              <span className="text-white text-lg font-semibold ml-2">FShark </span>
            </div>

            {/* Navigation Links */}
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      location.pathname === item.href
                        ? "bg-white text-gray-900"
                        : "text-gray-900 hover:bg-gray-100 hover:text-gray-900",
                      "rounded-md px-3 py-2 text-sm font-medium"
                    )}
                    aria-current={location.pathname === item.href ? "page" : undefined}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Search Box */}
          <div className="hidden sm:block sm:ml-6">
            <div className="relative">
            
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M13.293 14.707a8 8 0 111.414-1.414l3.75 3.75a1 1 0 01-1.414 1.414l-3.75-3.75zM8 14a6 6 0 100-12 6 6 0 000 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
          <button
            onClick={handleHoSo}
            className="block px-6 py-2 text-base font-semibold text-white bg-indigo-600 rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out transform hover:scale-105 ml-auto"
          >
            Hồ sơ
          </button>
          <button
            onClick={handleSignOut}
            className="block px-6 py-2 ms-2 text-base font-semibold text-white bg-indigo-600 rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out transform hover:scale-105 ml-auto"
          >
            Đăng xuất
          </button>

        </div>
      </div>

      {/* Mobile menu */}
      <Disclosure.Panel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <Disclosure.Button
              key={item.name}
              as="a"
              href={item.href}
              className={classNames(
                location.pathname === item.href
                  ? "bg-white text-gray-900"
                  : "text-gray-900 hover:bg-gray-100 hover:text-gray-900",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
              aria-current={location.pathname === item.href ? "page" : undefined}
            >
              {item.name}
            </Disclosure.Button>
          ))}
        </div>
      </Disclosure.Panel>
    </Disclosure>
  );
}
