import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Tracking = () => {
  const [bookingId, setBookingId] = useState("");
  const [details, setDetails] = useState(null);
  const [user, setUser] = useState(null);
  const [showError, setShowError] = useState(false);
  const [newStatus, setNewStatus] = useState(""); // Admin-selected status
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      alert("Please log in first!");
      window.location.href = "/login";
    }
  }, []);

  const handleTrack = async () => {
    if (!bookingId) {
      alert("Please enter a Booking ID!");
      return;
    }

    try {
      let apiUrl = "";

      if (user.role === "ADMIN") {
        apiUrl = `http://localhost:8080/TrackingStatus/${bookingId}`;
      } else {
        apiUrl = `http://localhost:8080/TrackingStatus/${user.userId}/${bookingId}`;
      }

      const res = await axios.get(apiUrl);
      setDetails(res.data);
      if (res.data) setShowError(false);
      else setShowError(true);
    } catch (err) {
      console.error(err);
      setDetails(null);
      setShowError(true);
    }
  };

  // ✅ Admin only: Update parcel status
  const handleStatusUpdate = async () => {
    if (!newStatus) {
      alert("Please select a status before updating!");
      return;
    }

    try {
      await axios.put(
        `http://localhost:8080/DeliveryStatus/${bookingId}`,
        newStatus,
        {
          headers: { "Content-Type": "text/plain" },
        }
      );

      alert("Parcel status updated successfully!");
      setDetails({ ...details, status: newStatus }); // Update UI immediately
      setNewStatus("");
    } catch (err) {
      console.error(err);
      alert("Failed to update status. Please try again.");
    }
  };

  const handleBack = () => {
    navigate("/dashboard");
  };

  if (!user) return null;

  return (
    <div className="container mt-3">
      {/* Back button */}
      <div className="d-flex justify-content-start mb-3">
        <button className="btn btn-danger" onClick={handleBack}>
          Back
        </button>
      </div>

      <h3>
        {user.role === "ADMIN" ? "Track Any Parcel" : "Track Your Parcel"}
      </h3>

      {/* Input for booking ID */}
      <div className="input-group mt-3 mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter Booking ID"
          value={bookingId}
          onChange={(e) => setBookingId(e.target.value)}
        />
        <button className="btn btn-info" onClick={handleTrack}>
          Track
        </button>
      </div>

      {/* Display details */}
      {details && (
        <div className="card mt-4 p-3">
          <h5>Booking Details</h5>
          <p>
            <strong>Booking ID:</strong> {details.bookingId}
          </p>
          <p>
            <strong>Sender:</strong> {details.senderName}
          </p>
          <p>
            <strong>Recipient:</strong> {details.recName}
          </p>
          <p>
            <strong>Status:</strong> {details.status}
          </p>

          {/* ✅ Admin-only status update dropdown */}
          {user.role === "ADMIN" && (
            <div className="mt-4">
              <h6>Update Parcel Status</h6>
              <div className="input-group">
                <select
                  className="form-select"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                >
                  <option value="">Select Status</option>
                  <option value="Booked">Booked</option>
                  <option value="In Transit">In Transit</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                <button
                  className="btn btn-success"
                  onClick={handleStatusUpdate}
                >
                  Update
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Error message */}
      {showError && (
        <h5 style={{ color: "red" }}>Please enter a valid Booking ID!</h5>
      )}
    </div>
  );
};

export default Tracking;
