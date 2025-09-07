import React, { useState } from "react";
import axios from "axios";

const PickupDropUpdate = () => {
  const [bookingId, setBookingId] = useState("");
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [updatedBooking, setUpdatedBooking] = useState(null);

  const handleUpdate = async () => {
    try {
      // Ensure datetime is in ISO format
      const pickupISO = new Date(pickup).toISOString();
      const dropoffISO = new Date(dropoff).toISOString();

      const res = await axios.post(
        `http://localhost:8080/PickupDropUpdate/${bookingId}/${pickupISO}/${dropoffISO}`
      );

      setUpdatedBooking(res.data);
      alert("Pickup & Drop updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update pickup/dropoff times!");
    }
  };

  return (
    <div className="container mt-5">
      <h3>Update Pickup & Drop Time</h3>
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

      <div className="form-group mt-3">
        <label>Dropoff Time</label>
        <input
          type="datetime-local"
          className="form-control"
          value={dropoff}
          onChange={(e) => setDropoff(e.target.value)}
        />
      </div>

      <button className="btn btn-primary mt-3" onClick={handleUpdate}>
        Update
      </button>

      {updatedBooking && (
        <div className="card mt-4 p-3">
          <h5>Updated Booking</h5>
          <p>
            <strong>ID:</strong> {updatedBooking.bookingId}
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
