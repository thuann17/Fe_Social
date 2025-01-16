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
            eventContent={getEventContent} // Render only one icon per day
            validRange={{
              start: today, // Prevent selecting dates before today
            }}
          />
        </div>
      </div>
    </>
  );
};

export default TripPlanner;
