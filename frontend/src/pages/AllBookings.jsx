import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [filterType, setFilterType] = useState("userId"); // default filter
  const [filterValue, setFilterValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // ✅ Load logged-in user
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      if (parsedUser.role !== "ADMIN") {
        alert("Access denied. Admins only.");
        window.location.href = "/dashboard";
      }
    } else {
      alert("Please log in first!");
      window.location.href = "/login";
    }
  }, []);

  const handleBack = () => {
    navigate("/dashboard");
  };

  // ✅ Fetch all bookings for admin
  useEffect(() => {
    if (!user) return;

    axios
      .get("http://localhost:8080/allbookings")
      .then((res) => {
        setBookings(res.data);
        setFilteredBookings(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch bookings.");
        setLoading(false);
      });
  }, [user]);

  // ✅ Filter bookings based on selected type & input
  useEffect(() => {
    if (!filterValue) {
      setFilteredBookings(bookings);
    } else {
      const filtered = bookings.filter((b) => {
        const value = filterValue.toLowerCase();
        if (filterType === "userId") return b.userId.toString().includes(value);
        if (filterType === "name")
          return b.senderName.toLowerCase().includes(value);
        if (filterType === "email")
          return b.senderEmail.toLowerCase().includes(value);
        return false;
      });
      setFilteredBookings(filtered);
    }
  }, [filterValue, filterType, bookings]);

  if (loading) return <p className="text-center mt-5">Loading bookings...</p>;
  if (error) return <p className="text-danger mt-5 text-center">{error}</p>;
  if (!user) return null;

  return (
    <div className="container mt-5">
      {/* Back button */}
      <div className="d-flex justify-content-start mb-3">
        <button className="btn btn-danger" onClick={handleBack}>
          Back
        </button>
      </div>

      <h3>All Bookings</h3>

      {/* Filter Section */}
      <div className="d-flex align-items-center mb-4">
        <select
          className="form-select me-2"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="userId">User ID</option>
          <option value="name">Name</option>
          <option value="email">Email</option>
        </select>

        <input
          type="text"
          className="form-control"
          placeholder={`Search by ${filterType}`}
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
        />
      </div>

      {/* Booking Table */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>User ID</th>
            <th>Sender Name</th>
            <th>Sender Email</th>
            <th>Recipient Name</th>
            <th>Recipient Email</th>
            <th>Description</th>
            <th>Status</th>
            <th>Weight (kg)</th>
            <th>Delivery Type</th>
            <th>Packing Preference</th>
            <th>Pickup Date</th>
            <th>Dropoff Date</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
          {filteredBookings.length === 0 ? (
            <tr>
              <td colSpan="14" className="text-center">
                No bookings found.
              </td>
            </tr>
          ) : (
            filteredBookings.map((b) => (
              <tr key={b.bookingId}>
                <td>{b.bookingId}</td>
                <td>{b.userId}</td>
                <td>{b.senderName}</td>
                <td>{b.senderEmail}</td>
                <td>{b.recName}</td>
                <td>{b.recEmail}</td>
                <td>{b.description}</td>
                <td>{b.status}</td>
                <td>{b.weight}</td>
                <td>{b.deliveryType}</td>
                <td>{b.packingPreference}</td>
                <td>
                  {b.pickupTime
                    ? new Date(b.pickupTime).toLocaleDateString()
                    : "-"}
                </td>
                <td>
                  {b.dropoffTime
                    ? new Date(b.dropoffTime).toLocaleDateString()
                    : "-"}
                </td>
                <td>₹{b.serviceCost}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllBookings;
