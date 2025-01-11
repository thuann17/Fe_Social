import React, { useState, useEffect } from "react";
import PostService from "../../../Services/admin/PostService";
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

const POST_STATUSES = [
    { label: "Tất cả", value: "all" },
    { label: "Đã khoá", value: "true" },
    { label: "Chưa khoá", value: "false" },
];

const TABLE_HEAD = ["Tác giả", "Tiêu đề", "Ngày tạo", "Trạng thái", "Lượt yêu thích", "Lượt bình luận", ""];

function PostAdmin() {
    const [status, setStatus] = useState("all");
    const [search, setSearch] = useState("");
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(7);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchPosts();
    }, [currentPage, search, status]);

    const togglePostStatus = async (postId, currentStatus) => {
        try {
            const updatedStatus = !currentStatus;
            await PostService.updatePostStatus(postId, updatedStatus);
            setPosts((prevPosts) =>
                prevPosts.map((post) =>
                    post.id === postId ? { ...post, status: updatedStatus } : post
                )
            );
            toast.success("Trạng thái bài viết đã được cập nhật thành công!"); // Success message
        } catch (error) {
            console.error("Error updating post status:", error);
            toast.error("Cập nhật trạng thái bài viết thất bại!"); // Error message
        }
    };

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const params = {
                page: currentPage,
                size: pageSize,
                search,
                status: status === "all" ? null : status === "true" ? true : false,
            };
            const response = await PostService.getPosts(params);
            console.log(response.data);

            const sortedPosts = response.data.content.sort(
                (a, b) => new Date(b.createdate) - new Date(a.createdate)
            );
            setPosts(sortedPosts);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error("Error fetching posts:", error);
            toast.error("Lỗi khi tải bài viết!"); // Error message
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = (value) => {
        setStatus(value);
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
                <h2 className="text-xl font-semibold text-gray-700">Quản lý bài viết</h2>
            </div>

            {/* Status Toggle */}
            <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-4">
                    {POST_STATUSES.map((type) => (
                        <button
                            key={type.value}
                            onClick={() => setStatus(type.value)}
                            className={`px-4 py-2 text-sm font-medium rounded-md border transition-all ${status === type.value
                                ? "bg-blue-500 text-white border-blue-500"
                                : "border-gray-300 text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            {type.label}
                        </button>
                    ))}
                </div>
                <input
                    type="text"
                    placeholder="Tìm kiếm"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border border-gray-300 rounded-md px-4 py-2 text-sm w-64 focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Loading Indicator */}
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
                            {posts.map((post, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 flex items-center space-x-3">
                                        <img
                                            src={post.username.images || "https://firebasestorage.googleapis.com/v0/b/socialmedia-8bff2.appspot.com/o/ThuanImage%2Favt.jpg?alt=media"}
                                            alt={post.username}
                                            className="w-10 h-10 rounded-full"
                                        />
                                        <div>
                                            <p className="text-sm font-medium text-gray-700">
                                                {post.username.lastname} {post.username.firstname}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {post.username.email}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-700">
                                        {post.content}
                                    </td>

                                    <td className="px-4 py-3 text-sm text-gray-700">
                                        {formatDate(post.createdate)}
                                    </td>
                                    <td className="px-4 py-3">
                                        <label className="inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="sr-only peer"
                                                checked={post.status}
                                                onChange={() => togglePostStatus(post.id, post.status)}
                                            />
                                            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 
                                            peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 
                                            peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full 
                                            peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 
                                            after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full 
                                            after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
                                        </label>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-700">
                                        {post.countLike}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-700">
                                        {post.countComment}
                                    </td>
                                    <td className="px-1 py-3 text-right">
                                        <button className="text-blue-500 hover:text-blue-700">
                                            Xem thông tin
                                        </button>
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
        </div>
    );
}

export default PostAdmin;
