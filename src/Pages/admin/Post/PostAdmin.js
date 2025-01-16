import React, { useState, useEffect } from "react";
import PostService from "../../../Services/admin/PostService";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Post from "./Post";

const POST_STATUSES = [
    { label: "Tất cả", value: "all" },
    { label: "Đã khoá", value: "true" },
    { label: "Chưa khoá", value: "false" },
];

const TABLE_HEAD = ["STT", "Tác giả", "Tiêu đề", "Ngày dăng", "Trạng thái", " Yêu thích", "Bình luận", ""];

function PostAdmin() {
    const [status, setStatus] = useState("all");
    const [search, setSearch] = useState("");
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(7);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState(null);

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
            toast.success("Trạng thái bài viết đã được cập nhật thành công!");
        } catch (error) {
            console.error("Error updating post status:", error);
            toast.error("Cập nhật trạng thái bài viết thất bại!");
        }
    };


    const fetchPosts = async () => {
        setLoading(true);
        try {
            const params = {
                page: currentPage,
                size: pageSize,
                status: status === "all" ? undefined : status,
            };
            const response = await PostService.getPosts(params);
            const sortedPosts = response.data.content.sort(
                (a, b) => new Date(b.createdate) - new Date(a.createdate)
            );
            setPosts(sortedPosts);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            toast.error("Lỗi khi tải bài viết!");
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

        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        };
        return date.toLocaleString("vi-VN", options);
    };



    const handleShowModal = (postId) => {
        setSelectedPostId(postId); // Lưu ID bài viết được chọn
        setShowModal(true); // Hiển thị modal
    };

    const handleCloseModal = () => {
        setShowModal(false); // Đóng modal
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
                <h2 className="text-xl font-semibold text-gray-700">Quản lý bài đăng</h2>
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
                            {posts.map((post, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-4 items-center">{index + 1}</td>
                                    <td className="px-4 py-3 flex items-center space-x-3">
                                        <img
                                            src={post.username.images[0].avatarrurl
                                                || "https://firebasestorage.googleapis.com/v0/b/socialmedia-8bff2.appspot.com/o/ThuanImage%2Favt.jpg?alt=media"}
                                            alt={post.username}
                                            className="w-10 h-10 rounded-full"
                                        />
                                        <div>
                                            <p className="text-sm font-medium text-gray-700">
                                                {post.username.lastname} {post.username.firstname}  {post.id}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {post.username.email}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-700 truncate max-w-xs whitespace-nowrap overflow-hidden">
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
                                        <button
                                            className="text-blue-500 hover:text-blue-700"
                                            onClick={() => handleShowModal(post.id)}
                                        >
                                            Chi tiết
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

            {/* Modal hiển thị thông tin bài viết */}
            {showModal && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white w-3/4 p-6 rounded-lg shadow-lg relative">
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <Post postId={selectedPostId} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default PostAdmin;
