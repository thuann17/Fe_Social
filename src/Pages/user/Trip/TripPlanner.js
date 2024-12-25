import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import {
  FaPlus,
  FaTimes,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaStar,
} from "react-icons/fa";

const initialTrips = [
  // Initial trips data...
];

const allHours = Array.from({ length: 24 }, (_, i) => {
  const hour = i < 10 ? `0${i}:00` : `${i}:00`;
  return hour;
});

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

  const handleDateSelect = (selectInfo) => {
    setSelectedDate(selectInfo.startStr);
    setIsModalOpen(true);
  };

  const navigate = useNavigate();

  const handleImageClick = () => {
    navigate(`/user/place`);
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
        id: String(tripDetails.trips.length + 1),
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

  const filterTripsByHour = (hour) => {
    return tripDetails.trips.filter((trip) => {
      const tripHour = new Date(trip.start).getHours();
      return tripHour === parseInt(hour.split(":")[0]);
    });
  };

  const getTripStatus = (tripStart) => {
    const now = new Date();
    const tripDate = new Date(tripStart);
    if (tripDate > now) return "upcoming";
    if (tripDate < now) return "past";
    return "ongoing";
  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Calendar Component */}
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
          />
        </div>
      </div>

      {/* Modal for Trip Details */}
      <Dialog
        open={isModalOpen}
        onClose={handleCloseModal}
        className="relative z-50"
      >
        <DialogBackdrop className="fixed inset-0 bg-gray-500/75 transition-opacity" />
        <div className="fixed inset-0 overflow-y-auto flex items-center justify-center">
          <DialogPanel className="bg-white rounded-lg shadow-xl p-8 transition-all w-11/12 md:w-1/2">
            <h3 className="text-2xl font-semibold mb-6 text-center">
              Chuyến đi hôm nay
            </h3>
            <div className="h-96 overflow-y-auto border-t border-gray-300">
              {allHours.map((hour) => (
                <div
                  key={hour}
                  className="border-b py-6 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                >
                  <p className="font-bold text-gray-800 text-lg">⏰ {hour}</p>
                  {filterTripsByHour(hour).length > 0 ? (
                    filterTripsByHour(hour).map((trip) => (
                      <div
                        key={trip.id}
                        className="mt-2 p-2 rounded-md"
                        style={{
                          backgroundColor:
                            getTripStatus(trip.start) === "upcoming"
                              ? "rgb(255, 165, 0)"
                              : "rgb(255, 99, 71)",
                        }}
                      >
                        {trip.title}
                      </div>
                    ))
                  ) : (
                    <p
                      className="mt-2 text-gray-500 cursor-pointer"
                      onClick={() => handleImageClick()}
                    >
                      <FaPlus className="inline mr-1" />
                      Không có chuyến đi được lên. Thêm lịch trình mới
                    </p>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={handleCloseModal}
                className="px-6 py-3 bg-gray-300 rounded-lg flex items-center hover:bg-gray-400 transition"
              >
                <FaTimes className="mr-2" />
                Đóng
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Modal for Adding New Trip */}

    </>
  );
};

export default TripPlanner;
