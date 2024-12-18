import React, { useState } from 'react';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (email) {
            // Giả sử bạn có API gửi email reset mật khẩu
            // Bạn có thể gọi API ở đây để gửi yêu cầu quên mật khẩu.
            // Ví dụ: axios.post('/api/forgot-password', { email })
            setMessage('Một email đã được gửi đến địa chỉ của bạn để đặt lại mật khẩu!');
        } else {
            setMessage('Vui lòng nhập email!');
        }
    };

    return (
        <div className="bg-gray-100 flex justify-center items-center h-screen">
            <div className="w-full md:w-1/3 bg-white shadow rounded-md p-8">
                <h1 className="text-2xl font-semibold mb-4 text-center">Quên mật khẩu?</h1>
                <form onSubmit={handleSubmit}>
                    {/* Email Input */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-600">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                            autoComplete="off"
                            required
                        />
                    </div>

                    {/* Message */}
                    {message && (
                        <div className="mb-4 text-center text-blue-500">
                            <p>{message}</p>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
                    >
                        Gửi
                    </button>
                </form>

                {/* Back to Login Link */}
                <div className="mt-6 text-center">
                    <a href="/login" className="text-blue-500 hover:underline">Quay lại đăng nhập</a>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
