import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
const initialTrips = [
  {
    id: "1",
    title: "Chuyến đi đến Hà Nội",
    start: "2024-12-16T08:00",
  },
  {
    id: "2",
    title: "Chuyến đi đến Hồ Chí Minh",
    start: "2024-12-16T10:00",
  },
  {
    id: "3",
    title: "Chuyến đi đến Đà Nẵng",
    start: "2024-12-17T14:00",
  },
  {
    id: "4",
    title: "Chuyến đi đến Nha Trang",
    start: "2024-12-16T16:00",
  },
  {
    id: "5",
    title: "Chuyến đi đến Phú Quốc",
    start: "2024-12-16T18:00",
  },
];

// Tạo danh sách các giờ trong ngày
const allHours = Array.from({ length: 24 }, (_, i) => {
  const hour = i < 10 ? `0${i}:00` : `${i}:00`;
  return hour;
});

const TripPlanner = () => {
  const [tripDetails, setTripDetails] = useState({
    trips: initialTrips,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [tripTitle, setTripTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [isAddTripModalOpen, setIsAddTripModalOpen] = useState(false);
  // mở modal
  const handleDateSelect = (selectInfo) => {
    setSelectedDate(selectInfo.startStr);
    setIsModalOpen(true);
  };

  // Đóng modal
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
    setIsAddTripModalOpen(false); // Đóng modal
    setTripTitle(""); // Xóa tiêu đề chuyến đi khi đóng modal
    setStartTime(""); // Xóa giờ bắt đầu khi đóng modal
  };

  // Lưu chuyến đi
  const handleSaveTrip = () => {
    if (tripTitle && startTime) {
      const newTrip = {
        id: String(tripDetails.trips.length + 1),
        title: tripTitle,
        start: `${selectedDate}T${startTime}`,
      };

      setTripDetails({
        ...tripDetails,
        trips: [...tripDetails.trips, newTrip],
      });
      handleCloseModalTrip();
    } else {
      alert("Vui lòng nhập đầy đủ thông tin!");
    }
  };

  // Xử lý sự kiện thả (drag-and-drop)
  const handleTripDrop = (event, hour) => {
    const updatedTrips = tripDetails.trips.map((trip) => {
      if (trip.id === event.id) {
        // Cập nhật giờ bắt đầu của chuyến đi khi kéo và thả
        trip.start = `${selectedDate}T${hour}`;
      }
      return trip;
    });

    setTripDetails({
      ...tripDetails,
      trips: updatedTrips,
    });
  };

  // lấy id của chuyến đi khi bắt đầu kéo
  const handleDragStart = (event) => {
    event.dataTransfer.setData("tripId", event.target.id);
  };

  // Lọc chuyến đi theo giờ
  const filterTripsByHour = (hour) => {
    return tripDetails.trips.filter((trip) => {
      const tripHour = new Date(trip.start).getHours();
      return tripHour === parseInt(hour.split(":")[0]);
    });
  };
  const getTripStatus = (tripStart) => {
    const now = new Date();
    const tripDate = new Date(tripStart);
    if (tripDate > now) {
      return "upcoming"; // Chuyến đi sắp tới
    } else if (tripDate < now) {
      return "past"; // Chuyến đi đã qua
    }
    return "ongoing"; // Chuyến đi đang diễn ra
  };

  const filterTripsByDate = (date) => {
    if (!date) return tripDetails.trips;
    return tripDetails.trips.filter((trip) => {
      const tripDate = new Date(trip.start);
      const selectedDate = new Date(date);
      return (
        tripDate.getFullYear() === selectedDate.getFullYear() &&
        tripDate.getMonth() === selectedDate.getMonth() &&
        tripDate.getDate() === selectedDate.getDate()
      );
    });
  };

  // Xử lý khi người dùng chọn ngày để lọc
  const handleDateChange = (e) => {
    setFilterDate(e.target.value); // Cập nhật ngày lọc
  };
  return (
    <>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3 bg-white shadow rounded-md p-4">
          {/* Bộ lọc */}
          <label className="block text-gray-700 font-medium mb-4">
            Lọc theo ngày
          </label>
          <input
            type="date"
            value={filterDate}
            onChange={handleDateChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />

          {/* Cột danh sách chuyến đi */}
          <label className="block text-gray-700 font-medium mb-4">
            Danh sách chuyến đi
          </label>

          {/* Danh sách chuyến đi với thanh cuộn */}
          <ul className="space-y-4 h-96 overflow-y-auto max-h-96">
            {filterTripsByDate(filterDate).length > 0 ? (
              filterTripsByDate(filterDate).map((trip) => (
                <li
                  key={trip.id}
                  className="p-4 border border-gray-300 rounded-md bg-gray-100"
                >
                  <h3 className="font-semibold">{trip.title}</h3>
                  <p>
                    Từ: {new Date(trip.start).toLocaleDateString("vi-VN")}
                  </p>
                </li>
              ))
            ) : (
              <li className="text-gray-500">Không có chuyến đi nào</li>
            )}
          </ul>
        </div>

        {/* Cột lịch */}
        <div className="w-full md:w-2/3 bg-white shadow rounded-md p-4">
          <label className="block text-gray-700 font-medium mb-4">Lên lịch trình</label>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            selectable
            editable
            locale="vi"
            events={tripDetails.trips}
            select={handleDateSelect}
            height="auto"
            className="text-yellow-500"
            eventClick={(info) => {
              console.alert("Sự kiện được chạm:", info.event.title);
            }}
          />
        </div>
      </div>

      {/* Modal HeadlessUI */}
      <Dialog open={isModalOpen} onClose={handleCloseModal} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-gray-500/75 transition-opacity" />
        <div className="fixed inset-0 overflow-y-auto flex items-center justify-center">
          <DialogPanel
            className="bg-white rounded-lg shadow-xl p-8 transition-all"
            style={{ width: "66vw", height: "auto", maxHeight: "90vh" }}
          >
            <h3 className="text-2xl font-semibold mb-6 text-center">
              Chuyến đi hôm nay
            </h3>

            {/* Container cuộn dọc */}
            <div className="h-96 overflow-y-auto border-t border-gray-300">
              {allHours.map((hour) => (
                <div
                  key={hour}
                  className="border-b py-6 bg-gray-100 rounded-lg"
                  onDragOver={(e) => e.preventDefault()} // Cần để thả vào được
                  onDrop={(e) => {
                    const tripId = e.dataTransfer.getData("tripId");
                    const trip = tripDetails.trips.find((t) => t.id === tripId);
                    handleTripDrop(trip, hour);
                  }}
                >
                  <p className="font-bold text-gray-800 text-lg">⏰ {hour}</p>
                  {/* Các chuyến đi trong khung giờ này */}
                  {filterTripsByHour(hour).length > 0 ? (
                    filterTripsByHour(hour).map((trip) => (
                      <div
                        key={trip.id}
                        id={trip.id}
                        className="mt-2 p-2 rounded-md"
                        draggable
                        onDragStart={handleDragStart}
                        style={{
                          backgroundColor:
                            getTripStatus(trip.start) === "upcoming"
                              ? "rgb(255, 165, 0)" // Màu cam cho chuyến đi sắp diễn ra
                              : "rgb(255, 99, 71)", // Màu đỏ cho chuyến đi đã qua
                        }}
                      >
                        {trip.title}
                      </div>
                    ))
                  ) : (
                    <p
                      className="mt-2 text-gray-500 cursor-pointer"
                      onClick={() => handleOpenAddTripModal(hour)}
                    >
                      — Không có chuyến đi được lên. Thêm lịch trình mới
                    </p>

                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={handleCloseModal}
                className="px-6 py-3 bg-gray-300 rounded-lg mr-2"
              >
                Đóng
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
      <Dialog open={isAddTripModalOpen} onClose={handleCloseModalTrip} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-gray-500/75 transition-opacity" />
        <div className="fixed inset-0 overflow-y-auto flex items-center justify-center">
          <DialogPanel className="bg-white rounded-lg shadow-xl p-8 transition-all" style={{ width: "66vw", height: "auto", maxHeight: "90vh" }}>
            <h3 className="text-2xl font-semibold mb-6 text-center">Thêm lịch trình mới</h3>

            <div className="space-y-4">
              <label className="block text-gray-700 font-medium">Tiêu đề chuyến đi</label>
              <input
                type="text"
                value={tripTitle}
                onChange={(e) => setTripTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Nhập tiêu đề chuyến đi"
              />

              <label className="block text-gray-700 font-medium">Giờ bắt đầu</label>
              <input
                type="time"
                value={startTime} // Giá trị sẽ là giờ người dùng chọn
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />

              <div className="flex justify-end mt-6">
                <button onClick={handleSaveTrip} className="px-6 py-3 bg-blue-500 text-white rounded-lg mr-2">
                  Lưu
                </button>
                <button onClick={handleCloseModalTrip} className="px-6 py-3 bg-gray-300 rounded-lg">
                  Hủy
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

    </>
  );
};

export default TripPlanner;
