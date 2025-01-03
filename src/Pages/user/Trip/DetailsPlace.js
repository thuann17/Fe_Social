import React, { useState } from "react";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";

const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};

const Card = ({ imageUrl, title, rating, reviews, description, onClick }) => {
  const shortDescription = truncateText(description, 60);
  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <img src={imageUrl} alt={title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-700 mt-2">{shortDescription}</p>
        <div className="flex items-center mt-2">
          <span className="text-yellow-500">
            {"⭐".repeat(Math.round(rating))}
          </span>
          <span className="ml-2 text-gray-600">({reviews} đánh giá)</span>
        </div>
      </div>
    </div>
  );
};

const DetailsPlace = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [tripName, setTripName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [tripDescription, setTripDescription] = useState("");

  const cardsData = [
    {
      imageUrl: "https://cellphones.com.vn/sforum/wp-content/uploads/2024/01/dia-diem-du-lich-o-ha-noi-1.jpg",
      title: "Hồ Hoàn Kiếm",
      rating: 3.9,
      reviews: 5,
      description: "Hồ Hoàn Kiếm, biểu tượng của Hà Nội, là nơi gắn liền với truyền thuyết Rùa thần.",
    },
    {
      imageUrl: "https://dulichvietdu.com/wp-content/uploads/2023/07/quang-truong-ba-dinh.jpg",
      title: "Lăng Hồ Chủ Tịch",
      rating: 4.2,
      reviews: 10,
      description: "Lăng Hồ Chủ Tịch là nơi lưu giữ thi hài của Chủ tịch Hồ Chí Minh vĩ đại.",
    },
    {
      imageUrl: "https://statics.vinpearl.com/dia-diem-du-lich-ha-noi-3_1688468966.jpg",
      title: "Chùa Một Cột",
      rating: 4.5,
      reviews: 8,
      description: "Chùa Một Cột, công trình kiến trúc độc đáo, biểu tượng văn hóa lâu đời.",
    },
    {
      imageUrl: "https://intertour.vn/wp-content/uploads/2022/03/b159cc9c-3010-4e99-be7f-a55419601266-1.jpg",
      title: "Chùa Trấn Quốc",
      rating: 4.0,
      reviews: 12,
      description: "Chùa Trấn Quốc là một trong những ngôi chùa cổ nhất Việt Nam, nằm bên Hồ Tây.",
    },
    {
      imageUrl: "https://intertour.vn/wp-content/uploads/2022/03/e9b300f9-a94b-4339-ab16-e8d2f5517f55.jpg",
      title: "Phủ Tây Hồ",
      rating: 4.8,
      reviews: 20,
      description: "Phủ Tây Hồ nổi tiếng với kiến trúc tinh tế và vị trí tuyệt đẹp bên Hồ Tây.",
    },
    {
      imageUrl: "https://intertour.vn/wp-content/uploads/2022/03/91c4073f-7e28-4087-bdd8-32a2d55f7f07.jpg",
      title: "Đền Quán Thánh",
      rating: 3.5,
      reviews: 6,
      description: "Đền Quán Thánh là ngôi đền linh thiêng, gắn liền với văn hóa tâm linh của người dân Hà Nội.",
    },
  ];

  const openModal = (card) => {
    setSelectedCard(card);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedCard(null);
    setModalVisible(false);
  };

  const handleSaveTrip = (e) => {
    e.preventDefault();
    console.log("Trip Saved:", {
      tripName,
      startDate,
      endDate,
      tripDescription,
      description: selectedCard.description,
    });

    // Reset fields and close modal
    setTripName("");
    setStartDate("");
    setEndDate("");
    setTripDescription("");
    closeModal();
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Các Địa Điểm Du Lịch Nổi Bật Tại: 🗺 HÀ NỘI
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {cardsData.map((card, index) => (
          <Card key={index} {...card} onClick={() => openModal(card)} />
        ))}
      </div>

      {isModalVisible && selectedCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-lg relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              ❎
            </button>
            <img
              src={selectedCard.imageUrl}
              alt={selectedCard.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">{selectedCard.title}</h3>
            <div className="flex items-center mb-4">
              <FaMapMarkerAlt className="text-gray-600 mr-2" />
              <span className="text-gray-700">{selectedCard.description}</span>
            </div>
            <form onSubmit={handleSaveTrip}>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Tên Chuyến Đi:
                </label>
                <input
                  type="text"
                  value={tripName}
                  onChange={(e) => setTripName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập tên chuyến đi"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Thời Gian Bắt Đầu:
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Thời Gian Kết Thúc:
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Mô Tả Lịch Trình:
                </label>
                <textarea
                  value={tripDescription}
                  onChange={(e) => setTripDescription(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập mô tả chi tiết"
                  rows="4"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded-md mt-4 hover:bg-blue-600 transition duration-200"
              >
                Lưu Lịch Trình
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsPlace;
