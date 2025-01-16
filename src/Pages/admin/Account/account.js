import React, { useState, useEffect } from "react";
import AccountService from "../../../Services/admin/AccountService";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const ACCOUNT_TYPES = [
    { label: "Người dùng", value: "User" },
    { label: "Quản trị viên", value: "Admin" },
];

const TABS = [
    { label: "Tất cả", value: "all" },
    { label: "Đang hoạt động", value: "monitored" },
    { label: "Tạm ngưng hoạt động", value: "unmonitored" },
];

const TABLE_HEAD = ["STT", "Người dùng", "Vai trò", "Ngày sinh", "Trạng thái", ""];

function AccountAdmin() {
    const [accountType, setAccountType] = useState("User");
    const [activeTab, setActiveTab] = useState("all");
    const [search, setSearch] = useState("");
    const [accounts, setAccounts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(7);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [password, setPassword] = useState("");
    const [selectedAccount, setSelectedAccount] = useState(null);
    const userRole = Cookies.get("role");
    const navigate = useNavigate();

    useEffect(() => {
        fetchAccounts();
    }, [currentPage, accountType, activeTab]);

    const fetchAccounts = async () => {
        setLoading(true);
        try {
            const cookieUsername = Cookies.get('username');
            const params = {
                page: currentPage,
                size: pageSize,
                active: activeTab === "all" ? null : activeTab === "monitored",
                role: accountType === "User" ? "User" : "Admin",
            };

            const response =
                accountType === "User"
                    ? await AccountService.getUserAccounts(params)
                    : await AccountService.getAdminAccounts(cookieUsername, params);

            setAccounts(response.data.content);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            toast.error("Đã có lỗi xảy ra khi tải dữ liệu tài khoản.");
        } finally {
            setLoading(false);
        }
    };

    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearch(query);  // Update the search state

        // Filter accounts by email (case-insensitive)
        const filteredAccounts = accounts.filter((account) =>
            account.email.toLowerCase().includes(query)
        );

        setAccounts(filteredAccounts);  // Update the accounts state with filtered results
    };

    const handlePageChange = (page) => {
        if (page >= 0 && page < totalPages) {
            setCurrentPage(page);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleDateString("vi-VN");
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6 w-full">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-700">Quản lý tài khoản</h2>
            </div>

            <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-4">
                    {ACCOUNT_TYPES.map((type) => (
                        <button
                            key={type.value}
                            onClick={() => setAccountType(type.value)}
                            className={`px-4 py-2 text-sm font-medium rounded-md border transition-all ${accountType === type.value
                                ? "bg-blue-500 text-white border-blue-500"
                                : "border-gray-300 text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            {type.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-4">
                    {TABS.map((tab) => (
                        <button
                            key={tab.value}
                            onClick={() => setActiveTab(tab.value)}
                            className={`px-4 py-2 text-sm font-medium rounded-md border transition-all ${activeTab === tab.value
                                ? "bg-blue-500 text-white border-blue-500"
                                : "border-gray-300 text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
                <input
                    type="text"
                    placeholder="Tìm kiếm theo email..."
                    value={search}
                    onChange={handleSearchChange}  // Use the new handleSearchChange function
                    className="border border-gray-300 rounded-md px-4 py-2 text-sm w-64 focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {loading ? (
                <div className="text-center py-4">
                    <span>Đang tải dữ liệu...</span>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full table-auto border-collapse">
                        <thead>
                            <tr className="bg-gray-100">
                                {TABLE_HEAD.map((head) => (
                                    <th
                                        key={head}
                                        className="px-4 py-2 text-left text-sm font-medium text-gray-600 border-b"
                                    >
                                        {head}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {accounts.map((account, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-4 items-center">{index + 1}</td>
                                    <td className=" py-3 flex items-center space-x-3">
                                        <img
                                            src={account.images[0].avatarrurl || "https://firebasestorage.googleapis.com/v0/b/socialmedia-8bff2.appspot.com/o/ThuanImage%2Favt.jpg?alt=media"}
                                            alt={account.username}
                                            className="w-10 h-10 rounded-full"
                                        />
                                        <div>
                                            <p className="text-sm font-medium text-gray-700">
                                                {account.lastname} {account.firstname}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {account.email}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-700">
                                        <p>{account.roles.role}</p>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-700">
                                        {formatDate(account.birthday)}
                                    </td>
                                    <td className="px-4 py-3">
                                        <label className="inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="sr-only peer"
                                                checked={account.active}
                                                onChange={() => { }}
                                            />
                                        </label>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <div className="flex justify-between items-center mt-4">
                <p className="text-sm text-gray-600">
                    Trang {currentPage + 1} / {totalPages}
                </p>
            </div>
        </div>
    );
}

export default AccountAdmin;
