import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import ProfileService from "../../../Services/admin/ProfileService";
import UserService from "../../../Services/user/UserService";
import { toast } from "react-toastify";
import { format } from "date-fns";
const ProfileAdmin = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [updateInfo, setUpdateInfo] = useState({
        firstname: "",
        lastname: "",
        email: "",
        hometown: "",

    });
    const [updatePassword, setUpdatePassword] = useState({
        currentPassword: "",
        oldPassword: "",
        newPassword: "",
    });
    const [activeTab, setActiveTab] = useState("info");
    useEffect(() => {
        UserService.getInfo(Cookies.get("username"))
            .then((data) => {
                setUserInfo(data);
                setUpdateInfo({
                    firstname: data.firstname || "",
                    lastname: data.lastname || "",
                    email: data.email || "",
                    hometown: data.hometown || "",
                });
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message || "Failed to load user data");
                setLoading(false);
            });
    }, []);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdateInfo({
            ...updateInfo,
            [name]: value,
        });
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setUpdatePassword({
            ...updatePassword,
            [name]: value,
        });
    };

    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        if (!updateInfo.firstname || !updateInfo.lastname || !updateInfo.email || !updateInfo.hometown) {
            toast.error("Vui lòng điền đầy đủ thông tin.");
            return;
        }

        ProfileService.updateInfo(Cookies.get("username"), updateInfo)
            .then(() => {
                toast.success("Thông tin cá nhân đã được cập nhật thành công.");
                setUserInfo((prev) => ({ ...prev, ...updateInfo }));
            })
            .catch((err) => {
                console.log(err);

                toast.error("Có lỗi xảy ra khi cập nhật thông tin: " + (err.response?.data?.message || "Không xác định"));
            });
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();

        // Kiểm tra mật khẩu mới và mật khẩu xác nhận có khớp không
        if (updatePassword.newPassword !== updatePassword.confirmPassword) {
            toast.error("Mật khẩu xác nhận không khớp.");
            return;
        }
        if (updatePassword.newPassword.length < 6) {
            toast.error("Mật khẩu mới phải có ít nhất 6 ký tự.");
            return;
        }

        ProfileService.updatePassword(Cookies.get("username"), updatePassword)
            .then(() => {
                toast.success("Mật khẩu đã được cập nhật thành công.");
                setUpdatePassword({ currentPassword: "", oldPassword: "", newPassword: "" });
            })
            .catch((err) => {
                toast.error("Có lỗi xảy ra khi cập nhật mật khẩu: " + (err.response?.data?.message || err.message || "Không xác định"));
            });
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <div className="error"><h2>Error: {error}</h2></div>;
    }

    if (!userInfo) {
        return <p>User not found.</p>;
    }
    const formattedBirthday = userInfo.birthday ? format(new Date(userInfo.birthday), 'dd/MM/yyyy') : 'Chưa có';

    return (
        <div className="bg-white p-6 py-11 rounded-lg shadow-md mx-auto flex gap-8 relative ">
            <div className="w-1/3 bg-gradient-to-r from-blue-100 to-blue-300   p-4 rounded-lg shadow-md">
                <div className="flex flex-col items-center">
                    <div className="bg-white rounded-full p-2 shadow-lg">
                        <img
                            src={userInfo.avatarUrl}
                            alt=""
                            className="rounded-full w-32 h-32 border-4 border-white object-cover"
                        />
                    </div>
                    <div className="mt-4 text-center">
                        <h2 className="text-2xl font-semibold">
                            {userInfo.lastname} {userInfo.firstname}
                        </h2><p className="text-gray-700"> {formattedBirthday}</p>
                        <p className="text-gray-500">📧 {userInfo.email}</p>
                        <p className="text-gray-700">🏡 {userInfo.hometown}</p>
                        <p className="text-gray-700">Bio: {userInfo.bio}</p>
                    </div>
                </div>
            </div>

            <div className="w-2/3 bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-center mb-6">
                    <button
                        className={`px-4 py-2 rounded-l-md ${activeTab === "info" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
                        onClick={() => setActiveTab("info")}
                    >
                        Cập nhật thông tin
                    </button>
                    <button
                        className={`px-4 py-2 rounded-r-md ${activeTab === "password" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
                        onClick={() => setActiveTab("password")}
                    >
                        Cập nhật mật khẩu
                    </button>
                </div>

                {activeTab === "info" && (
                    <form onSubmit={handleUpdateSubmit} className="flex flex-col gap-4">
                        <div className="flex gap-4">
                            <div className="w-1/2">
                                <label className="block text-sm font-medium text-gray-700">Họ</label>
                                <input
                                    type="text"
                                    name="lastname"
                                    value={updateInfo.lastname}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-md"
                                />
                            </div>
                            <div className="w-1/2">
                                <label className="block text-sm font-medium text-gray-700">Tên</label>
                                <input
                                    type="text"
                                    name="firstname"
                                    value={updateInfo.firstname}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-md"
                                />
                            </div>
                        </div>
                        <div className="w-full">
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={updateInfo.email}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md"
                            />
                        </div>

                        <div className="w-full">
                            <label className="block text-sm font-medium text-gray-700">Địa chỉ</label>
                            <input
                                type="text"
                                name="hometown"
                                value={updateInfo.hometown}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md"
                            />
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                            Cập nhật thông tin
                        </button>
                    </form>
                )}

                {activeTab === "password" && (
                    <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Mật khẩu hiện tại</label>
                            <input
                                type="password"
                                name="currentPassword"
                                value={updatePassword.currentPassword}
                                onChange={handlePasswordChange}
                                className="w-full p-2 border rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Mật khẩu mới</label>
                            <input
                                type="password"
                                name="newPassword"
                                value={updatePassword.newPassword}
                                onChange={handlePasswordChange}
                                className="w-full p-2 border rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Xác nhận mật khẩu</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={updatePassword.confirmPassword}
                                onChange={handlePasswordChange}
                                className="w-full p-2 border rounded-md"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                            Cập nhật mật khẩu
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ProfileAdmin;
