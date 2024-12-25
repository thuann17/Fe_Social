// src/ImageGrid.js
import React from "react";
import { useNavigate } from 'react-router-dom';
import "./trip.css";

const images = [
  {
    id: 1,
    title: "Hà Nội",
    src: "https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/shutterstock1391898416-1646649508378.png",
  },
  {
    id: 2,
    title: "Đà Nẵng",
    src: "https://vcdn1-dulich.vnecdn.net/2022/06/03/cauvang-1654247842-9403-1654247849.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=Swd6JjpStebEzT6WARcoOA",
  },
  {
    id: 3,
    title: "Hồ Chí Minh",
    src: "https://cdn.media.dulich24.com.vn/bai-viet/tu-van-du-lich-thanh-pho-ho-chi-minh-1.jpg",
  },
  {
    id: 4,
    title: "Nha Trang",
    src: "https://cdn.tuoitre.vn/471584752817336320/2023/4/18/tp-nha-trang-16818161974101240202452.jpeg",
  },
  {
    id: 5,
    title: "Hạ Long",
    src: "https://i2.ex-cdn.com/crystalbay.com/files/content/2024/07/30/du-lich-ha-long-1-1133.jpg",
  },
  {
    id: 6,
    title: "Huế",
    src: "https://motogo.vn/wp-content/uploads/2023/10/dai-noi-kinh-thanh-hue.jpg",
  },
  {
    id: 7,
    title: "Phú Quốc",
    src: "https://bcp.cdnchinhphu.vn/334894974524682240/2024/4/27/phuquoc-17142159895461759842212.jpg",
  },
  {
    id: 8,
    title: "Sapa",
    src: "https://vcdn1-dulich.vnecdn.net/2022/04/18/dulichSaPa-1650268886-1480-1650277620.png?w=0&h=0&q=100&dpr=2&fit=crop&s=JTUw8njZ_Glkqf1itzjObg",
  },
];

const PlaceTrip = () => {
  const navigate = useNavigate();
  const handleImageClick = () => {
    // Điều hướng đến trang mới, ví dụ: /image/:id
    navigate(`/user/detailsplace`);
  };

  return (
    <div className="container mx-auto p-2">
      <h1 className="text-3xl font-bold text-center mb-6">ĐỊA ĐIỂM NỔI BẬT:</h1>
      <div  onClick={() => handleImageClick()} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-hidden">
        {images.map((image) => (
          <div key={image.id} className="relative group">
            <img
              src={image.src}
              alt={image.title}
              className="rounded-lg w-full h-40 object-cover bg-gray-200"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-white text-lg font-semibold">
                {image.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaceTrip;
