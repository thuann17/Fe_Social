import React from "react";
import { useNavigate } from 'react-router-dom';
import "./trip.css";
import { useLocation } from "react-router-dom";

const images = [
  {
    id: 1,
    title: "Hà Nội",
    path: "Ha Noi",
    src: "https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/shutterstock1391898416-1646649508378.png",
  },
  {
    id: 2,
    title: "Đà Nẵng",
    path: "Da Nang",
    src: "https://vcdn1-dulich.vnecdn.net/2022/06/03/cauvang-1654247842-9403-1654247849.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=Swd6JjpStebEzT6WARcoOA",
  },
  {
    id: 3,
    title: "Hồ Chí Minh",
    path : "Ho Chi Minh",
    src: "https://cdn.media.dulich24.com.vn/bai-viet/tu-van-du-lich-thanh-pho-ho-chi-minh-1.jpg",
  },
  {
    id: 4,
    title: "Kiên Giang",
    path : "Kien Giang",
    src: "https://cdn.tuoitre.vn/471584752817336320/2023/4/18/tp-nha-trang-16818161974101240202452.jpeg",
  },
  {
    id: 5,
    title: "Quảng Bình",
    path : "Quang Binh",
    src: "https://i2.ex-cdn.com/crystalbay.com/files/content/2024/07/30/du-lich-ha-long-1-1133.jpg",
  },
  {
    id: 6,
    title: "An Giang",
    path : "An Giang",
    src: "https://mia.vn/media/uploads/blog-du-lich/mua-vang-an-giang-dep-ngo-ngang-qua-lang-kinh-cua-duong-viet-anh-5-1667013847.jpg",
  },
  {
    id: 7,
    title: "Hải Phòng",
    path : "Hai Phong",
    src: "https://file3.qdnd.vn/data/images/0/2023/03/31/nguyenthao/hai%20phong.jpg?dpi=150&quality=100&w=870",
  },
  {
    id: 8,
    title: "Đà Lạt",
    path :"Da Lat",
    src: "https://vcdn1-dulich.vnecdn.net/2022/04/18/dulichSaPa-1650268886-1480-1650277620.png?w=0&h=0&q=100&dpr=2&fit=crop&s=JTUw8njZ_Glkqf1itzjObg",
  },
];

const PlaceTrip = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedDate } = location.state || {}; // Access the passed date

  const handleImageClick = (path) => {
    
    navigate(`/user/detailsplace/${path}`, {
      state: { selectedDate: selectedDate },
    }); 
  };

  return (
    <div className="container mx-auto p-2">
      <h1 className="text-3xl font-bold text-center mb-6">ĐỊA ĐIỂM NỔI BẬT:</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-hidden">
        {images.map((image) => (
          <div key={image.id} onClick={() => handleImageClick(image.path)} className="relative group">
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
