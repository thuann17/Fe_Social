import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa"; // ✅ Thêm icon
import TripService from "../../../Services/user/TripService";
import { toast } from "react-toastify";

const initialTrips = [];

const TripPlanner = () => {
  const [tripDetails, setTripDetails] = useState({ trips: initialTrips });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const navigate = useNavigate();

  // ✅ Hàm format thời gian
  const formatDateTime = (dateString, showTime = true) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };

    if (showTime) {
      options.hour = "2-digit";
      options.minute = "2-digit";
    }

    return new Date(dateString).toLocaleString("vi-VN", options);
  };

  // ✅ Lọc mỗi ngày chỉ đánh dấu 1 lần
  const filterUniqueTripsByDate = (trips) => {
    const uniqueDates = new Set();
    return trips.filter((trip) => {
      const tripDate = formatDateTime(trip.start, false);
      if (!uniqueDates.has(tripDate)) {
        uniqueDates.add(tripDate);
        return true;
      }
      return false;
    });
  };

  // ✅ Fetch dữ liệu và thêm tiêu đề cho sự kiện
  useEffect(() => {
    TripService.getTripStartDates()
      .then((response) => {
        const trips = response.map((trip) => ({
          start: new Date(trip.startdate).toISOString(),
        }));

        const uniqueTrips = filterUniqueTripsByDate(trips);
        setTripDetails({ trips: uniqueTrips });
      })
      .catch((error) => {
        toast.error("Không thể lấy dữ liệu ngày bắt đầu chuyến đi.");
        console.error(error);
      });
  }, []);

  // ✅ Xử lý khi chọn ngày
  const handleDateSelect = (selectInfo) => {
    setSelectedDate(selectInfo.startStr);
    setIsModalOpen(true);
    navigate(`/place`, {
      state: { selectedDate: selectInfo.startStr },
    });
  };

  // ✅ Hiển thị nội dung tuỳ chỉnh trong ngày sự kiện
  const renderEventContent = (eventInfo) => {
    return (
      <div className="custom-event">
        <FaMapMarkerAlt className="text-red-500 inline mr-1" /> {/* ✅ Icon */}
        <strong>{eventInfo.event.title}</strong>
      </div>
    );
  };

  // ✅ Thêm class để đánh dấu ngày có sự kiện
  const eventClassNames = () => {
    return "highlight-trip-day";
  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-6 bg-[#ebc8fe] p-6">
        <div className="w-full bg-white shadow-lg rounded-md p-4">
          <label className="block text-gray-800 font-semibold mb-4 text-lg">
            <FaCalendarAlt className="inline mr-2" />
            Lên lịch trình
          </label>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            selectable
            editable
            locale="vi"
            events={tripDetails.trips}
            select={handleDateSelect}
            eventContent={renderEventContent} // ✅ Hiển thị nội dung tuỳ chỉnh
            eventClassNames={eventClassNames}
          />
        </div>
      </div>

      {/* ✅ Style tuỳ chỉnh cho ngày có sự kiện */}
      <style>
        {`
          .highlight-trip-day {
            background-color: #ffe6f2 !important; /* Hồng nhạt */
            color: #e91e63 !important; /* Hồng đậm */
            border-radius: 10px;
            border: 2px dashed #e91e63;
            font-weight: bold;
            width: 30px; /* Adjust width to make it more compact */
            height: 30px;
          }

          .highlight-trip-day:hover {
            background-color: #f06292 !important;
            color: white !important;
            transform: scale(1.1);
            transition: all 0.2s ease-in-out;
          }

          .custom-event {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.85rem;
            margin-left: 5px;
          
          }
        `}
      </style>
    </>
  );
};

export default TripPlanner;
