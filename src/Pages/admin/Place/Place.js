import React, { useState, useEffect } from "react";

const Place = ({ place, onAddPlace, onEditPlace, onCloseModal }) => {
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        description: "",

    });
    useEffect(() => {
        if (place) {
            setFormData({
                name: place.nameplace,
                address: place.address,
                description: place.description,
            });
        } else {
            setFormData({
                name: "",
                address: "",
                description: "",
            });
        }
    }, [place]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (place) {
            // If we're editing, pass updated place data
            onEditPlace({ ...place, ...formData });
        } else {
            // If we're adding, pass new place data
            onAddPlace(formData);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Tên địa điểm</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Địa chỉ</label>
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Mô tả</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md"
                    rows="3"
                />
            </div>
            <div className="flex justify-end space-x-4">
                <button
                    type="button"
                    onClick={onCloseModal}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md"
                >
                    Đóng
                </button>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                    {place ? "Cập nhật địa điểm" : "Thêm địa điểm"}
                </button>
            </div>
        </form>
    );
};

export default Place;
