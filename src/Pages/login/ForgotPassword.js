import React, { useState } from 'react';
import { forgotPassword } from '../../Services/login/ForgotService';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            setMessage('Vui lòng nhập email!');
            return;
        }
        setMessage('');
        setLoading(true);
        try {
            setMessage("Gửi mật khẩu thành công! Vui lòng kiểm tra email của bạn.");
        } catch (error) {
            if (error.response && error.response.data) {
                setMessage(error.response.data);
            } else {
                setMessage("Email không hợp lệ hoặc không tồn tại!");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gradient-to-r from-purple-300 to-blue-400 animate-gradientAnimation flex justify-center items-center h-screen">
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
        
                        />
                    </div>

                    {/* Message */}
                    {message && (
                        <div className={`mb-4 text-center ${message.includes('Email không tồn tại') ? 'text-red-500' : 'text-blue-500'}`}>
                            <p>{message}</p>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
                        disabled={loading}
                    >
                        {loading ? 'Đang gửi...' : 'Gửi'}
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
