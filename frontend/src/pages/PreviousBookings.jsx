import React, { useEffect, useState } from "react";
import axios from "axios";

const PreviousBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Parse user object from localStorage safely
  const [user] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (!user?.userId) {
      setError("No logged-in user found. Please login first.");
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:8080/previousBooking/${user.userId}`)
      .then((res) => {
        setBookings(res.data);
        setLoading(false);
        // console.log(bookings);
      })
      .catch((err) => {
        console.error("Error fetching bookings:", err);
        setError("Failed to fetch bookings.");
        setLoading(false);
      });
  }, [user?.userId]); // ✅ Runs only when userId changes

  if (loading) return <p className="text-center mt-5">Loading bookings...</p>;
  if (error) return <p className="text-danger mt-5 text-center">{error}</p>;

  return (
    <div className="container mt-5">
      <h3>Previous Bookings</h3>
      <ul className="list-group mt-3">
        {bookings.length === 0 ? (
          <li className="list-group-item text-muted">No bookings found.</li>
        ) : (
          bookings.map((b) => (
            <li key={b.bookingId} className="list-group-item">
              <strong>{b.description}</strong> - {b.status}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default PreviousBookings;
