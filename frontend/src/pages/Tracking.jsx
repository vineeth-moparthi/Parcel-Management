import React, { useState } from "react";
import axios from "axios";

const Tracking = () => {
  const [bookingId, setBookingId] = useState("");
  const [details, setDetails] = useState(null);

  const handleTrack = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/TrackingStatus/${bookingId}`
      );
      setDetails(res.data);
    } catch (err) {
      console.error(err);
      alert("Booking not found!");
    }
  };

  return (
    <div className="container mt-5">
      <h3>Track Parcel</h3>
      <div className="input-group mt-3">
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

      {details && (
        <div className="card mt-4 p-3">
          <h5>Booking Details</h5>
          <p>
            <strong>Sender:</strong> {details.senderName}
            {/* console.log(details.senderName) */}
          </p>
          <p>
            <strong>Recipient:</strong> {details.recName}
            {/* console.log(details.recName) */}
          </p>
          <p>
            <strong>Status:</strong> {details.status}
            {/* console.log(details.status) */}
          </p>
        </div>
      )}
    </div>
  );
};

export default Tracking;
