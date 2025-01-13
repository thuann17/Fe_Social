import React, { useState, useEffect } from "react";
import PlaceForm from "./Place";
import PlaceTable from "./PlaceTable";
import PlaceService from "../../../Services/admin/PlaceService";
import { toast } from "react-toastify";

const PlacesManager = () => {
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedPlace, setSelectedPlace] = useState(null); // Store the place being edited

    const fetchPlaces = async () => {
        setLoading(true);
        try {
            const response = await PlaceService.getPlace();
            setPlaces(response.data);
        } catch (error) {
            toast.error("Đã có lỗi xảy ra khi tải dữ liệu địa điểm.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPlaces();
    }, []);

    const handleAddPlace = (newPlace) => {
        setPlaces([...places, newPlace]);
        setShowModal(false);
        toast.success("Đã thêm địa điểm thành công.");
    };

    const handleEditPlace = (updatedPlace) => {
        setPlaces(places.map((place) => (place.id === updatedPlace.id ? updatedPlace : place)));
        setShowModal(false);
        toast.success("Đã cập nhật địa điểm thành công.");
    };

    const handleDeletePlace = (placeId) => {
        setPlaces(places.filter((place) => place.id !== placeId));
        toast.success("Đã xóa địa điểm thành công.");
    };

    const handleEditClick = (place) => {
        setSelectedPlace(place); // Set the selected place for editing
        setShowModal(true); // Open the modal
    };

    const modalTitle = selectedPlace ? "Cập nhật địa điểm" : "Thêm địa điểm"; // Set the title based on edit or add

    return (
        <div className="bg-white shadow-md rounded-lg p-6 w-full">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-700">Quản lý địa điểm</h2>
                <button
                    onClick={() => {
                        setSelectedPlace(null); // Clear selected place for adding new place
                        setShowModal(true);
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                    Thêm địa điểm
                </button>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
                        <h3 className="text-xl font-semibold mb-4">{modalTitle}</h3>
                        <PlaceForm
                            place={selectedPlace} // Pass the selected place to the form for editing
                            onAddPlace={handleAddPlace}
                            onEditPlace={handleEditPlace}
                            onCloseModal={() => setShowModal(false)}
                        />
                    </div>
                </div>
            )}

            <PlaceTable
                places={places}
                loading={loading}
                onDeletePlace={handleDeletePlace}
                onEditPlace={handleEditClick} // Pass the function to edit
            />
        </div>
    );
};

export default PlacesManager;
