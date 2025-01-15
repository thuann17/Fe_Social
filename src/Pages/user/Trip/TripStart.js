import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { FaRegClock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Assuming you are using react-toastify for notifications

// Component for displaying a single trip
const TripItem = ({ trip, onDelete }) => {
  const navigate = useNavigate();

  const itemStyles = {
    margin: "20px 0",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    transition: "transform 0.2s, box-shadow 0.2s",
    position: "relative",  // Relative position for dot button
  };

  const imgStyles = {
    width: "180px",
    height: "180px",
    objectFit: "cover",
    borderRadius: "10px",
    marginRight: "20px",
  };

  const contentStyles = {
    flex: 1,
  };

  const titleStyles = {
    fontSize: "22px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "8px",
  };

  const descStyles = {
    fontSize: "16px",
    color: "#666",
    marginBottom: "10px",
    lineHeight: "1.5",
  };

  const dateStyles = {
    fontSize: "14px",
    color: "#888",
    marginBottom: "5px",
  };

  const buttonStyles = {
    backgroundColor: "green",
    color: "#fff",
    border: "none",
    float: "right",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background-color 0.2s",
  };

  const dotButtonStyles = {
    backgroundColor: "transparent",
    border: "none",
    fontSize: "20px",
    color: "#555",
    cursor: "pointer",
    position: "absolute",  // Positioning it relative to its parent
    top: "10px",           // Adjust the distance from the top
    right: "10px",         // Adjust the distance from the right
  };

  const handleDelete = () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa chuyến đi này?")) {
      onDelete(trip.id);  // Trigger delete function from parent
    }
  };

  const avatarUrl = trip.users?.[0]?.images?.[0]?.avatarrurl || null;
  const placeImageUrl = trip.placetrips?.[0]?.placeid?.placeimages?.[0]?.image;

  return (
    <div>
      <li style={itemStyles}>
        <img
          src={placeImageUrl || "default-image-url.jpg"}
          alt={trip.tripname}
          style={imgStyles}
        />
        <div style={contentStyles}>
          <h3 style={titleStyles}>{trip.tripname}</h3>
          <p style={descStyles}>{trip.description}</p>

          <p style={{ ...dateStyles, display: "flex", alignItems: "center" }}>
            <FaRegClock style={{ marginRight: "6px", color: "#555" }} />
            <strong>Bắt đầu:</strong>&nbsp;
            {new Date(trip.startdate).toLocaleDateString("vi-VN")} -{" "}
            {new Date(trip.startdate).toLocaleTimeString("vi-VN", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>

          <p style={{ ...dateStyles, display: "flex", alignItems: "center" }}>
            <FaRegClock style={{ marginRight: "6px", color: "#555" }} />
            <strong>Kết thúc:</strong>&nbsp;
            {new Date(trip.enddate).toLocaleDateString("vi-VN")} -{" "}
            {new Date(trip.enddate).toLocaleTimeString("vi-VN", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>

          <button style={buttonStyles}>📝 Cập nhật</button>
          <button style={dotButtonStyles} onClick={handleDelete}>
            ...
          </button>
        </div>
      </li>
    </div>
  );
};

// Component for displaying a list of trips
const TripList = ({ trips, onDelete }) => {
  const listStyles = {
    listStyleType: "none",
    padding: 0,
    margin: 0,
  };

  return (
    <ul style={listStyles}>
      {trips.map((trip) => (
        <TripItem key={trip.id} trip={trip} onDelete={onDelete} />
      ))}
    </ul>
  );
};

// Main page component
const TripPage = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const username = Cookies.get("username");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/user/trip/tripplace/${username}`)
      .then((response) => {
        setTrips(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Không thể tải danh sách chuyến đi");
        setLoading(false);
      });
  }, [username]);

  const handleDeleteTrip = (tripId) => {
    axios
      .delete(`http://localhost:8080/api/trips/${tripId}`)
      .then(() => {
        setTrips(trips.filter((trip) => trip.id !== tripId));
        toast.success("Chuyến đi đã được xóa.");
      })
      .catch((error) => {
        toast.error("Xóa chuyến đi không thành công.");
      });
  };

  const pageStyles = {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "40px 20px",
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
  };

  const headerStyles = {
    fontSize: "28px",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: "30px",
    color: "#333",
  };

  const addButtonStyles = {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "12px 25px",
    cursor: "pointer",
    fontSize: "15px",
    position: "fixed",
    bottom: "30px",
    right: "300px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    transition: "background-color 0.2s",
  };

  const handleAddTrip = () => {
    navigate(`/user/cal`);
  };

  if (loading)
    return <p style={{ textAlign: "center" }}>Đang tải chuyến đi...</p>;
  if (error)
    return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;

  return (
    <div style={pageStyles}>
      <h2 style={headerStyles}>Danh sách chuyến đi:</h2>
      <TripList trips={trips} onDelete={handleDeleteTrip} />
      {/* Add Trip Button */}
      <button style={addButtonStyles} onClick={handleAddTrip}>
        ➕ Thêm chuyến đi
      </button>
    </div>
  );
};

export default TripPage;
