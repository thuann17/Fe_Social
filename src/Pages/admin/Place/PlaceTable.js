import React from "react";
import { toast } from "react-toastify";

const TABLE_HEAD = ["Tên địa điểm", "Mô tả", "Vị trí", "", ""];

const PlaceTable = ({ places, loading, onEditPlace }) => {
    return (
        <div className="overflow-x-auto">
            {loading ? (
                <div className="text-center py-4 text-gray-700">Đang tải dữ liệu...</div>
            ) : (
                <table className="min-w-full table-auto border-collapse border border-gray-200 rounded-lg shadow-lg">
                    <thead className="bg-blue-50">
                        <tr className="text-left text-sm font-semibold text-gray-600">
                            {TABLE_HEAD.map((head) => (
                                <th
                                    key={head}
                                    className="px-6 py-3 border-b text-gray-700"
                                >
                                    {head}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {places.map((place, index) => (
                            <tr key={place.id ? place.id : index} className="hover:bg-gray-50 transition-all duration-200">
                                <td className="px-6 py-4 text-sm text-gray-700">{place.nameplace}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{place.description}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{place.urlmap}</td>
                                <td className="px-6 py-4 text-sm text-gray-700 text-center">
                                    <button
                                        onClick={() => onEditPlace(place)}
                                        className="text-blue-500 hover:underline text-2xl"
                                    >
                                        🔧
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default PlaceTable;
