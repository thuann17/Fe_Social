import React, { useState } from "react";

const Dashboard = () => {
    // Tạo một state để quản lý tháng và năm cho từng phần riêng biệt
    const [selectedMonths, setSelectedMonths] = useState({
        posts: { month: "Tháng Một", year: 2024 },
        users: { month: "Tháng Một", year: 2024 },
        total: { month: "Tháng Một", year: 2024 },
        products: { month: "Tháng Một", year: 2024 },
    });

    // Mảng tháng
    const months = [
        "Tháng Một", "Tháng Hai", "Tháng Ba", "Tháng Tư", "Tháng Năm", "Tháng Sáu",
        "Tháng Bảy", "Tháng Tám", "Tháng Chín", "Tháng Mười", "Tháng Mười Một", "Tháng Mười Hai"
    ];

    // Mảng năm (có thể tùy chỉnh phạm vi năm nếu cần)
    const years = [2023, 2024, 2025, 2026];

    // Hàm thay đổi tháng hoặc năm khi người dùng chọn
    const handleMonthChange = (section, month) => {
        setSelectedMonths(prevState => ({
            ...prevState,
            [section]: { ...prevState[section], month: month }
        }));
    };

    const handleYearChange = (section, year) => {
        setSelectedMonths(prevState => ({
            ...prevState,
            [section]: { ...prevState[section], year: year }
        }));
    };

    return (
        <div className="bg-white min-h-screen p-6 text-gray-800">

            {/* Header với phần chọn tháng và năm */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Dashboard</h2>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                        <label className="text-sm">Chọn tháng:</label>
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
                    </div>

                    <div className="flex items-center space-x-2">
                        <label className="text-sm">Chọn năm:</label>
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
            </div>

            {/* Phần tổng quan */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Phần tổng số bài đăng */}
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
                        <div className="p-4 bg-white rounded-lg">
                            <p className="text-xl font-semibold">$5k</p>
                            <p className="text-sm">Số lượng bài viết</p>
                        </div>
                        <div className="p-4 bg-white rounded-lg">
                            <p className="text-xl font-semibold">500</p>
                            <p className="text-sm">Tổng số người dùng</p>
                        </div>
                        <div className="p-4 bg-white rounded-lg">
                            <p className="text-xl font-semibold">9</p>
                            <p className="text-sm">Tổng số chuyến đi</p>
                        </div>
                        <div className="p-4 bg-white rounded-lg">
                            <p className="text-xl font-semibold">12</p>
                            <p className="text-sm">Tổng số yêu thích và bình luận </p>
                        </div>
                    </div>
                </div>

                {/* Phần thống kê người dùng */}
                <div className="bg-gradient-to-r from-green-100 to-green-300 shadow rounded-lg p-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg  font-semibold">Người dùng có bài đăng nhiều tương tác nhất</h2>
                        <div className="flex items-center space-x-2">
                            <select
                                className="border rounded-lg p-2 text-gray-700 text-sm"
                                value={selectedMonths.users.month}
                                onChange={(e) => handleMonthChange('users', e.target.value)}
                            >
                                {months.map((month) => (
                                    <option key={month} value={month}>
                                        {month}
                                    </option>
                                ))}
                            </select>

                            <select
                                className="border rounded-lg p-2 text-gray-700 text-sm"
                                value={selectedMonths.users.year}
                                onChange={(e) => handleYearChange('users', e.target.value)}
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
                        <div className="h-32 bg-white rounded-lg p-4">
                        </div>
                    </div>
                </div>

                {/* Phần thống kê khác */}
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
                        <div className="h-32 bg-white rounded-lg"></div>
                    </div>
                </div>
            </div>

            {/* Phần sản phẩm top */}
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
                            <th className="py-2 px-4">Tên</th>
                            <th className="py-2 px-4">Mức độ phổ biến</th>
                            <th className="py-2 px-4">Doanh thu</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-t">
                            <td className="py-2 px-4">01</td>
                            <td className="py-2 px-4">Dòng trang trí nội thất</td>
                            <td className="py-2 px-4">
                                <div className="w-3/4 bg-gray-200 rounded-full h-2.5">
                                    <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: "78%" }}></div>
                                </div>
                            </td>
                            <td className="py-2 px-4">78%</td>
                        </tr>
                        <tr className="border-t">
                            <td className="py-2 px-4">02</td>
                            <td className="py-2 px-4">Váy công chúa Disney</td>
                            <td className="py-2 px-4">
                                <div className="w-3/4 bg-gray-200 rounded-full h-2.5">
                                    <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: "62%" }}></div>
                                </div>
                            </td>
                            <td className="py-2 px-4">62%</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default Dashboard;
