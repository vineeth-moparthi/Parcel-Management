import React, { useState } from "react";
import axios from "axios";

const BookingForm = () => {
  const [booking, setBooking] = useState({
    parcelId: "",
    userId: "",
    senderEmail: "",
    senderName: "",
    senderMobile: "",
    senderAddress: "",
    senderPincode: "",
    recName: "",
    recEmail: "",
    recMobile: "",
    recAddress: "",
    recPincode: "",
    description: "",
    deliveryType: "",
    packingPreference: "",
    status: "",
    weight: "",
    serviceCost: "",
    pickupTime: "",
    dropoffTime: "",
    paymentTime: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBooking({ ...booking, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/booking",
        booking
      );
      alert("Booking created successfully!");
      console.log(response.data);
      setBooking({}); // Reset form
    } catch (error) {
      console.error(error);
      alert("Failed to create booking.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Parcel Booking</h2>
      <form onSubmit={handleSubmit}>
        <h4>Sender Details</h4>
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            name="senderName"
            value={booking.senderName}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            name="senderEmail"
            value={booking.senderEmail}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label>Mobile</label>
          <input
            type="text"
            name="senderMobile"
            value={booking.senderMobile}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label>Address</label>
          <input
            type="text"
            name="senderAddress"
            value={booking.senderAddress}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <h4>Recipient Details</h4>
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            name="recName"
            value={booking.recName}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            name="recEmail"
            value={booking.recEmail}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label>Mobile</label>
          <input
            type="text"
            name="recMobile"
            value={booking.recMobile}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label>Address</label>
          <input
            type="text"
            name="recAddress"
            value={booking.recAddress}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <h4>Parcel Details</h4>
        <div className="mb-3">
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={booking.description}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label>Weight</label>
          <input
            type="number"
            name="weight"
            value={booking.weight}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label>Delivery Type</label>
          <input
            type="text"
            name="deliveryType"
            value={booking.deliveryType}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Submit Booking
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
