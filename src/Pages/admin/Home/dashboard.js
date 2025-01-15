import React, { useState, useEffect } from "react";
import HomeService from "../../../Services/admin/HomeService";

const Dashboard = () => {
    const [postCount, setPostCount] = useState(null);
    const [mostActiveUser, setMostActiveUser] = useState(null);
    const [popularActiveUsers, setPopularActiveUsers] = useState([]);
    const [isLoading, setIsLoading] = useState({
        posts: true,
        mostActiveUser: true,
        popularActiveUsers: true,
    });

    const [selectedMonths, setSelectedMonths] = useState({
        posts: { month: "Tất Cả", year: "2025" },
        users: { month: "Tất Cả", year: "2025" },
        total: { month: "Tất Cả", year: "2025" },
        products: { month: "Tất Cả", year: "2025" },
    });

    const months = [
        "Tất Cả", "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
        "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
    ];

    const monthToNumber = {
        "Tất Cả": "",
        "Tháng 1": 1,
        "Tháng 2": 2,
        "Tháng 3": 3,
        "Tháng 4": 4,
        "Tháng 5": 5,
        "Tháng 6": 6,
        "Tháng 7": 7,
        "Tháng 8": 8,
        "Tháng 9": 9,
        "Tháng 10": 10,
        "Tháng 11": 11,
        "Tháng 12": 12
    };

    const currentYear = new Date().getFullYear();
    const years = ["Tất Cả"];
    for (let year = currentYear; year >= 2020; year--) {
        years.push(year);
    }

    const handleMonthChange = (section, month) => {
        setSelectedMonths(prevState => ({
            ...prevState,
            [section]: { ...prevState[section], month: month },
        }));
    };

    const handleYearChange = (section, year) => {
        setSelectedMonths(prevState => ({
            ...prevState,
            [section]: { ...prevState[section], year: year === "Tất Cả" ? "" : year },
        }));
    };

    useEffect(() => {
        const { year, month } = selectedMonths.posts;
        const monthNumber = monthToNumber[month];
        setIsLoading(prev => ({ ...prev, posts: true }));
        HomeService.getPostCountByYearAndMonth(year, monthNumber)
            .then(data => setPostCount(data))
            .catch(error => console.error("Error fetching post count", error))
            .finally(() => setIsLoading(prev => ({ ...prev, posts: false })));
    }, [selectedMonths.posts]);

    useEffect(() => {
        const { year, month } = selectedMonths.total;
        const monthNumber = monthToNumber[month];
        setIsLoading(prev => ({ ...prev, mostActiveUser: true }));
        HomeService.getTopOne(year, monthNumber)
            .then(data => setMostActiveUser(data?.[0] || null))
            .catch(error => console.error("Error fetching most active user", error))
            .finally(() => setIsLoading(prev => ({ ...prev, mostActiveUser: false })));
    }, [selectedMonths.total]);

    useEffect(() => {
        const { year, month } = selectedMonths.products;
        const monthNumber = monthToNumber[month];
        setIsLoading(prev => ({ ...prev, popularActiveUsers: true }));
        HomeService.getTopFive(year, monthNumber)
            .then(data => setPopularActiveUsers(data || []))
            .catch(error => console.error("Error fetching popular active users", error))
            .finally(() => setIsLoading(prev => ({ ...prev, popularActiveUsers: false })));
    }, [selectedMonths.products]);
    return (
        <div className="bg-white p-6 text-gray-800">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="bg-gradient-to-r from-blue-100 to-blue-300 shadow rounded-lg p-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold">Tổng quan</h2>
                        <div className="flex items-center space-x-2">
                            <select
                                className="border rounded-lg p-2 text-gray-700 text-sm"
                                value={selectedMonths.posts.month}
                                onChange={(e) => handleMonthChange('posts', e.target.value)}
                            >
                                {months.map((month) => (
                                    <option key={month} value={month}>
                                        {month}
                                    </option>
                                ))}
                            </select>
                            <select
                                className="border rounded-lg p-2 text-gray-700 text-sm"
                                value={selectedMonths.posts.year}
                                onChange={(e) => handleYearChange('posts', e.target.value)}
                            >
                                {years.map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="p-4 bg-white text-center rounded-lg">
                            <p className="text-xl font-semibold">{postCount?.countPost || 0}</p>
                            <p className="text-sm">Số lượng bài viết</p>
                        </div>
                        <div className="p-4 bg-white  text-center rounded-lg">
                            <p className="text-xl font-semibold">{postCount?.tripCount || 0}</p>
                            <p className="text-sm">Tổng số chuyến đi</p>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-yellow-100 to-yellow-300 shadow rounded-lg p-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold">Người dùng đăng bài nhiều nhất</h2>
                        <div className="flex items-center space-x-2">
                            <select
                                className="border rounded-lg p-2 text-gray-700 text-sm"
                                value={selectedMonths.total.month}
                                onChange={(e) => handleMonthChange('total', e.target.value)}
                            >
                                {months.map((month) => (
                                    <option key={month} value={month}>
                                        {month}
                                    </option>
                                ))}
                            </select>

                            <select
                                className="border rounded-lg p-2 text-gray-700 text-sm"
                                value={selectedMonths.total.year}
                                onChange={(e) => handleYearChange('total', e.target.value)}
                            >
                                {years.map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="mt-4">
                        {mostActiveUser ? (
                            <div className="h-32 bg-white rounded-lg flex justify-center items-center">
                                <div className="flex items-center">
                                    {/* Avatar section on the left */}
                                    <div className="bg-white rounded-full p-2 shadow-lg">
                                        <img
                                            src={mostActiveUser.Avatar || "/default-avatar.png"}
                                            alt="User Avatar"
                                            className="rounded-full w-20 h-20 border-4 border-white object-cover"
                                        />
                                    </div>

                                    {/* Information section on the right */}
                                    <div className="ml-4 text-center">
                                        <h2 className="text-2xl font-semibold">
                                            {mostActiveUser.FullName}
                                        </h2>
                                        <p className="text-gray-700">{`Năm: ${mostActiveUser.Year}`}</p>
                                        <p className="text-gray-500">📧 {mostActiveUser.USERNAME}</p>
                                        <p className="text-gray-500">Số bài viết: {mostActiveUser.PostCount}</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p className="text-center text-gray-500">Tháng này không có người dùng đăng bài nhiều nhất</p>
                        )}
                    </div>
                </div>

            </div>

            {/* Top products section */}
            <div className="bg-gradient-to-r from-purple-100 to-purple-300 shadow rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Người dùng nổi bật</h2>
                    <div className="flex items-center space-x-2">
                        <select
                            className="border rounded-lg p-2 text-gray-700 text-sm"
                            value={selectedMonths.products.month}
                            onChange={(e) => handleMonthChange('products', e.target.value)}
                        >
                            {months.map((month) => (
                                <option key={month} value={month}>
                                    {month}
                                </option>
                            ))}
                        </select>

                        <select
                            className="border rounded-lg p-2 text-gray-700 text-sm"
                            value={selectedMonths.products.year}
                            onChange={(e) => handleYearChange('products', e.target.value)}
                        >
                            {years.map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <table className="w-full mt-4 text-left">
                    <thead>
                        <tr>
                            <th className="py-2 px-4">#</th>
                            <th className="py-2 px-4">Tài khoản</th>
                            <th className="py-2 px-4">Mức độ phổ biến</th>
                        </tr>
                    </thead>
                    <tbody>
                        {popularActiveUsers.map((user, index) => (
                            <tr key={user.USERNAME}>
                                <td className="py-2 px-4">{index + 1}</td>
                                <td className="py-2 px-4 flex items-center">
                                    <img
                                        src={user.Avatar || "/default-avatar.png"}
                                        alt="User Avatar"
                                        className="w-10 h-10 rounded-full mr-2"
                                    />
                                    {user.FullName}
                                </td>
                                <td className="py-2 px-4">{user.PostCount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
