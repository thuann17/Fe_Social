import React from 'react';

const ConfirmationModal = ({ isOpen, onConfirm, onCancel, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-96">
                <h3 className="text-xl font-semibold mb-4">{message}</h3>
                <div className="flex justify-end gap-2">
                    <button
                        onClick={onConfirm}
                        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                    >
                        Xóa
                    </button>
                    <button
                        onClick={onCancel}
                        className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400"
                    >
                        Hủy
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
