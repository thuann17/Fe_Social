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
    }, [currentPage, search, accountType, activeTab]);

    const fetchAccounts = async () => {
        setLoading(true);
        try {
            const cookieUsername = Cookies.get('username');
            const params = {
                page: currentPage,
                size: pageSize,
                search,
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


    const handleLockUnlock = async () => {
        if (!password) {
            toast.error("Vui lòng nhập mật khẩu!");
            return;
        }
        if (userRole !== "Admin") {
            toast.error("Bạn không có quyền thực hiện thao tác này.");
            return;
        }
        if (userRole === "Admin" && selectedAccount?.roles?.role === "Admin") {
            toast.error("Bạn không có quyền thực hiện thao tác này với tài khoản Admin.");
            return;
        }
        try {
            const usernameCookie = Cookies.get('username');
            const isValidPassword = await AccountService.lockUnlockAccount(usernameCookie, password);
            if (!isValidPassword) {
                toast.error("Mật khẩu không đúng! Vui lòng thử lại.");
                return;
            }
            const { username, active } = selectedAccount;
            const updatedStatus = !active;
            await AccountService.updateAccountStatus(username, updatedStatus);
            setShowPopup(false);
            setCurrentPage(0);
            fetchAccounts();
            toast.success("Cập nhật trạng thái tài khoản thành công.");
        } catch (error) {
            toast.error("Sai mật khẩu. Vui lòng thử lại.");
        }
    };
    const handleViewDetails = (account) => {
        console.log(account.username);
        navigate("/admin/account-detail", { state: { accountId: account.username } });
    };

    const renderPagination = () => {
        const pages = [];
        for (let i = 0; i < totalPages; i++) {
            if (
                i === 0 ||
                i === totalPages - 1 ||
                (i >= currentPage - 2 && i <= currentPage + 2)
            ) {
                pages.push(i + 1);
            }
        }

        return (
            <div className="flex space-x-2">
                <button
                    onClick={() => handlePageChange(0)}
                    disabled={currentPage === 0}
                    className="border border-gray-300 text-gray-600 px-4 py-2 rounded-md text-sm hover:bg-gray-100"
                >
                    Đầu
                </button>
                {pages.map((page, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(page - 1)}
                        className={`px-4 py-2 text-sm font-medium rounded-md ${currentPage === page - 1
                            ? "bg-blue-500 text-white"
                            : "bg-white text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        {page}
                    </button>
                ))}
                <button
                    onClick={() => handlePageChange(totalPages - 1)}
                    disabled={currentPage === totalPages - 1}
                    className="border border-gray-300 text-gray-600 px-4 py-2 rounded-md text-sm hover:bg-gray-100"
                >
                    Cuối
                </button>
            </div>
        );
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
                    onChange={(e) => setSearch(e.target.value)}
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
                                            src={account.images || "https://firebasestorage.googleapis.com/v0/b/socialmedia-8bff2.appspot.com/o/ThuanImage%2Favt.jpg?alt=media"}
                                            alt={account.username}
                                            className="w-10 h-10 rounded-full"
                                        />
                                        <div>
                                            <p className="text-sm font-medium text-gray-700">
                                                {account.lastname}      {account.firstname}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {account.email}{account.username}
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
                                                onChange={() => {
                                                    setSelectedAccount(account);
                                                    setShowPopup(true);
                                                }}
                                            />
                                            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
                                        </label>
                                    </td>
                                    <td className="px-1 py-3 text-right">
                                        {account.roles.role !== "Admin" && (
                                            <button
                                                className="text-blue-500 hover:text-blue-700"
                                                onClick={() => handleViewDetails(account)}
                                            >
                                                Xem thông tin
                                            </button>
                                        )}
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
                {renderPagination()}
            </div>

            {showPopup && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
                    <div className="bg-white rounded-lg p-6 w-96">
                        <h3 className="text-lg font-semibold mb-4">Nhập mật khẩu để xác nhận</h3>
                        <input
                            type="password"
                            placeholder="Mật khẩu"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4"
                        />
                        <div className="flex justify-end space-x-2">
                            <button
                                className="bg-gray-300 px-4 py-2 rounded-md"
                                onClick={() => setShowPopup(false)}
                            >
                                Hủy
                            </button>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                onClick={handleLockUnlock}
                            >
                                Xác nhận
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AccountAdmin;
