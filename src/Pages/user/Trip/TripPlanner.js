import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import TripService from "../../../Services/user/TripService"; // Import your TripService
import { toast } from "react-toastify"; // Assuming you're using toast notifications

const initialTrips = [
  // Initial trip data (if needed)
];

const TripPlanner = () => {
  const [tripDetails, setTripDetails] = useState({ trips: initialTrips });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [tripTitle, setTripTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [isAddTripModalOpen, setIsAddTripModalOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch trips data from API
    TripService.getTripStartDates()
      .then((response) => {
        const trips = response.map((trip) => ({
          title: trip.tripname,
          start: new Date(trip.startdate).toISOString(),
        }));
        setTripDetails({ trips });
      })
      .catch((error) => {
        toast.error("Không thể lấy dữ liệu ngày bắt đầu chuyến đi.");
        console.error(error); // Log error for debugging
      });
  }, []);

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

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTripTitle("");
    setStartTime("");
  };

  const handleOpenAddTripModal = (hour) => {
    setStartTime(hour);
    setIsAddTripModalOpen(true);
  };

  const handleCloseModalTrip = () => {
    setIsAddTripModalOpen(false);
    setTripTitle("");
    setStartTime("");
    setStartDate("");
    setEndDate("");
    setDescription("");
  };

  const handleSaveTrip = (e) => {
    e.preventDefault();
    if (tripTitle && startDate && endDate && description) {
      const newTrip = {
        id: String(tripDetails.trips.length + 1), // You may want to improve this for ID generation
        title: tripTitle,
        start: `${startDate}T${startTime}`,
        end: `${endDate}`,
        description: description,
      };

      setTripDetails({ trips: [...tripDetails.trips, newTrip] });
      handleCloseModalTrip();
    } else {
      alert("Vui lòng nhập đầy đủ thông tin!");
    }
  };

  // Filter trips by the same day
  const groupTripsByDay = (date) => {
    const tripsOnSameDay = tripDetails.trips.filter((trip) => {
      // Convert the trip's start date to Vietnam time (UTC+7)
      const tripDate = new Date(trip.start)
        .toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" })
        .split(",")[0]; // Get the date in "MM/DD/YYYY" format

      // Convert the selected date to Vietnam time (UTC+7)
      const selectedDate = new Date(date)
        .toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" })
        .split(",")[0]; // Get the date in "MM/DD/YYYY" format

      return tripDate === selectedDate; // Compare the dates
    });

    console.log(tripsOnSameDay);
    return tripsOnSameDay;
  };

  const getEventContent = (eventInfo) => {
    // Get the trips for the same day
    const tripsOnSameDay = groupTripsByDay(eventInfo.event.startStr);

    // Only render one icon for the day if there are trips
    if (tripsOnSameDay.length > 0) {
      return (
        <div className="event-content flex items-center ml-6">
          <FaMapMarkerAlt className="mr-2 text-red-500" size="30px" />
        </div>
      );
    }

    return null; // No icon if no trips are available
  };

  // Get today's date in "YYYY-MM-DD" format
  const today = new Date().toISOString().split("T")[0];

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
            events={tripDetails.trips} // Add events data here from state
            select={handleDateSelect}
            eventContent={getEventContent} // Render only one icon per day
            validRange={{
              start: today, // Prevent selecting dates before today
            }}
          />
        </div>
      </div>

      {/* Add/Edit Trip Modal */}
      <div
        className={`modal ${isAddTripModalOpen ? "open" : "closed"}`}
        onClick={handleCloseModalTrip}
      >
        <div className="modal-content">
          <h2>Thêm Chuyến Đi</h2>
          <form onSubmit={handleSaveTrip}>
            <div className="form-group">
              <label>Tiêu đề chuyến đi:</label>
              <input
                type="text"
                value={tripTitle}
                onChange={(e) => setTripTitle(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Ngày bắt đầu:</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Ngày kết thúc:</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Mô tả:</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <button type="submit">Lưu</button>
            <button type="button" onClick={handleCloseModalTrip}>
              Hủy
            </button>
          </form>
        </div>
      </div>

      {/* Custom styles */}
      <style>
        {`
          .highlight-trip-day {
            background-color: #ffe6f2 !important;
            color: #e91e63 !important;
            border-radius: 10px;
            border: 2px dashed #e91e63;
            font-weight: bold;
            width: 30px;
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

          .modal {
            display: none;
          }

          .modal.open {
            display: block;
          }

          .modal-content {
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }

          .form-group {
            margin-bottom: 15px;
          }

          .form-group label {
            display: block;
            margin-bottom: 5px;
          }

          .form-group input,
          .form-group textarea {
            width: 100%;
            padding: 8px;
            border: 1px solid #ccc;
            border-radius: 4px;
          }

          .form-group button {
            padding: 10px 20px;
            border: none;
            background-color: #e91e63;
            color: white;
            font-size: 14px;
            border-radius: 4px;
            cursor: pointer;
          }

          .form-group button[type="button"] {
            background-color: #ccc;
          }
        `}
      </style>
    </>
  );
};

export default TripPlanner;
