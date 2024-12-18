import React, { useState, useEffect } from "react";

const StartJourneyPage = () => {
  const [showMap, setShowMap] = useState(false);
  const [origin, setOrigin] = useState(null); // Initializing origin as null
  const [destination, setDestination] = useState("Destination+Location"); // Can be dynamic too

  const activities = [
    { id: 1, title: "Check-in at hotel", time: "9:00 AM" },
    { id: 2, title: "Visit Museum", time: "11:00 AM" },
    { id: 3, title: "Lunch at local restaurant", time: "1:00 PM" },
    { id: 4, title: "Explore City Center", time: "3:00 PM" },
  ];

  // Use the Geolocation API to get the user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setOrigin(`${latitude},${longitude}`); // Set the origin as lat, long
        },
        (error) => {
          console.error("Error getting geolocation", error);
          setOrigin("Default+Location"); // Fallback location in case of error
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
      setOrigin("Default+Location"); // Fallback location if geolocation is not supported
    }
  }, []);

  const handleStartJourney = () => {
    setShowMap(true);
  };

  return (
    <>
      {!showMap ? (
        <main className="w-11/12 max-w-3xl bg-white shadow-lg rounded-lg p-6 mt-10">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Today's Activities
          </h2>
          <ul className="divide-y divide-gray-200">
            {activities.map((activity) => (
              <li
                key={activity.id}
                className="flex justify-between items-center py-3"
              >
                <span className="font-medium text-gray-800">
                  {activity.title}
                </span>
                <span className="text-gray-500 text-sm">{activity.time}</span>
              </li>
            ))}
          </ul>

          {/* Start Journey Button */}
          <button
            onClick={handleStartJourney}
            className="mt-6 w-full py-3 bg-green-500 text-white text-lg font-medium rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300"
          >
            Start Journey
          </button>
        </main>
      ) : (
        <div className="w-11/12 max-w-5xl bg-white shadow-lg rounded-lg p-6 mt-10">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Your Journey Map
          </h2>

          {/* Dynamically set the iframe src based on origin and destination */}
          {origin ? (
            <iframe
              src={`https://www.google.com/maps/embed/v1/directions?key=AIzaSyCxkRu54HJamPE7DPou_vWQMaoKx1llQyI&origin=${origin}&destination=${destination}`}
              width="100%"
              height="500"
              allowFullScreen=""
              loading="lazy"
              title="Journey Map"
              className="rounded-md shadow-md"
            ></iframe>
          ) : (
            <p>Loading your location...</p>
          )}
        </div>
      )}
    </>
  );
};

export default StartJourneyPage;
