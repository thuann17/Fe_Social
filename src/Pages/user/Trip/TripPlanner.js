import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { FaPlus, FaTimes, FaCalendarAlt, FaMapMarkerAlt, FaStar } from "react-icons/fa";
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
      .catch(() => {
        toast.error("Không thể lấy dữ liệu ngày bắt đầu chuyến đi.");
      });
  }, []);

  const handleDateSelect = (selectInfo) => {
    setSelectedDate(selectInfo.startStr);
    setIsModalOpen(true);
    navigate(`/place`, {
      state: { selectedDate: selectInfo.startStr },
    });
  };

  const handleImageClick = () => {
    navigate(`/place`);
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
      <div className="flex flex-col md:flex-row gap-6 bg-[#ebc8fe] p-6">
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
            events={tripDetails.trips} // Add events data here from state
            select={handleDateSelect}
            eventContent={(eventInfo) => (
              <div className="event-content flex items-center ml-6">
                <FaMapMarkerAlt className="mr-2 text-red-500" size="30px"/> {/* Map icon */}
              </div>
            )}
          />
        </div>
      </div>

     
    </>
  );
};

export default TripPlanner;
