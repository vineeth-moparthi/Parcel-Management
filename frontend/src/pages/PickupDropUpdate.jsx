import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PickupDropUpdate = () => {
  const [bookingId, setBookingId] = useState("");
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [updatedBooking, setUpdatedBooking] = useState(null);
  const [user, setUser] = useState(null);
  const [showError, setShowError] = useState(false); // for invalid booking
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

  const handleUpdate = async () => {
    if (!bookingId || !pickup) {
      alert("Please provide at least Booking ID and Pickup Time!");
      return;
    }

    try {
      const pickupISO = new Date(pickup).toISOString();
      let url = "";

      if (user.role === "ADMIN") {
        // Admin updates both pickup & dropoff
        const dropoffISO = new Date(dropoff).toISOString();
        url = `http://localhost:8080/PickupDropUpdate/${bookingId}/${pickupISO}/${dropoffISO}`;
      } else {
        // User updates only pickup
        url = `http://localhost:8080/PickupUpdate/${bookingId}/${pickupISO}`;
      }

      const res = await axios.put(url);

      if (!res.data) {
        // Booking ID invalid
        setShowError(true);
        setUpdatedBooking(null);
        return;
      }

      setUpdatedBooking(res.data);
      setShowError(false);
      alert(
        user.role === "ADMIN"
          ? "Pickup & Drop updated successfully!"
          : "Pickup time updated successfully!"
      );
    } catch (err) {
      console.error(err);
      setShowError(true);
      setUpdatedBooking(null);
      alert("Failed to update booking time!");
    }
  };

  const handleBack = () => {
    navigate("/dashboard");
  };

  if (!user) return null;

  return (
    <div className="container mt-5">
      {/* Back button */}
      <div className="d-flex justify-content-start mb-3">
        <button className="btn btn-danger" onClick={handleBack}>
          Back
        </button>
      </div>
      <h3>
        {user.role === "ADMIN"
          ? "Update Pickup & Drop Time"
          : "Update Pickup Time"}
      </h3>

      <div className="form-group mt-3">
        <label>Booking ID</label>
        <input
          type="text"
          className="form-control"
          value={bookingId}
          onChange={(e) => setBookingId(e.target.value)}
        />
      </div>

      <div className="form-group mt-3">
        <label>Pickup Time</label>
        <input
          type="datetime-local"
          className="form-control"
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
        />
      </div>

      {/* Dropoff field visible only to ADMIN */}
      {user.role === "ADMIN" && (
        <div className="form-group mt-3">
          <label>Dropoff Time</label>
          <input
            type="datetime-local"
            className="form-control"
            value={dropoff}
            onChange={(e) => setDropoff(e.target.value)}
          />
        </div>
      )}

      <button className="btn btn-primary mt-3" onClick={handleUpdate}>
        {user.role === "ADMIN" ? "Update Pickup & Drop" : "Update Pickup"}
      </button>

      {showError && <h5 className="text-danger mt-3">Invalid Booking ID!</h5>}

      {updatedBooking && (
        <div className="card mt-4 p-3">
          <h5>Updated Booking Details</h5>
          <p>
            <strong>Booking ID:</strong> {updatedBooking.bookingId}
          </p>
          <p>
            <strong>Sender Name:</strong> {updatedBooking.senderName}
          </p>
          <p>
            <strong>Receiver Name:</strong> {updatedBooking.recName}
          </p>
          <p>
            <strong>Description:</strong> {updatedBooking.description}
          </p>
          <p>
            <strong>Status:</strong> {updatedBooking.status}
          </p>
        </div>
      )}
    </div>
  );
};

export default PickupDropUpdate;
