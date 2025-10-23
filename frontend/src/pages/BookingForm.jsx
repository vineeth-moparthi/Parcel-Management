import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BookingForm = () => {
  const navigate = useNavigate();

  const [booking, setBooking] = useState({
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
    serviceCost: 0,
    pickupTime: "",
    dropoffTime: "",
    paymentTime: "",
  });

  const [user, setUser] = useState(null);

  // ✅ Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      // ✅ Pre-fill only if user.role === "USER"
      if (parsedUser.role === "USER") {
        setBooking((prev) => ({
          ...prev,
          userId: parsedUser.userId,
          senderName: parsedUser.name,
          senderEmail: parsedUser.email,
          senderMobile: parsedUser.mobile,
          senderAddress: parsedUser.address,
          senderPincode: parsedUser.pincode,
        }));
      }
    }
  }, []);

  // ✅ Calculate cost dynamically
  useEffect(() => {
    if (booking.weight && booking.deliveryType && booking.packingPreference) {
      const cost = calculateCost(
        parseFloat(booking.weight),
        booking.deliveryType,
        booking.packingPreference
      );
      setBooking((prev) => ({ ...prev, serviceCost: cost.toFixed(2) }));
    }
  }, [booking.weight, booking.deliveryType, booking.packingPreference]);

  // ✅ Cost formula (same as backend logic)
  const calculateCost = (weight, deliveryType, packingPreference) => {
    const baseRatePerKg = 10;
    let deliveryMultiplier = 1.0;
    if (deliveryType === "Express") deliveryMultiplier = 1.5;

    let packagingMultiplier = 1.0;
    if (packingPreference === "Regular") packagingMultiplier = 1.2;
    else if (packingPreference === "Fragile") packagingMultiplier = 1.5;
    else if (packingPreference === "Gift Wrap") packagingMultiplier = 1.3;

    return weight * baseRatePerKg * deliveryMultiplier * packagingMultiplier;
  };

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

      // ✅ This will now print the long value
      console.log(response.data);

      // ✅ Use response.data directly for navigation
      if (response.data) {
        // setBooking({}); // Optional: clear the form
        navigate(`/generateInvoice/${response.data}`);
      }
      
    } catch (error) {
      console.error("Error creating booking:", error.response || error);
      alert("Failed to create booking.");
    }
  };

  const handleBack = () => {
    navigate("/dashboard");
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-start mb-3">
        <button className="btn btn-danger" onClick={handleBack}>
          Back
        </button>
      </div>

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
            readOnly={user?.role === "USER"}
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
            readOnly={user?.role === "USER"}
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
            readOnly={user?.role === "USER"}
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
            readOnly={user?.role === "USER"}
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
          <label>Weight (kg)</label>
          <input
            type="number"
            name="weight"
            value={booking.weight}
            onChange={handleChange}
            className="form-control"
            min="0"
            step="0.1"
            required
          />
        </div>

        <div className="mb-3">
          <label>Packing Preference</label>
          <select
            name="packingPreference"
            value={booking.packingPreference}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option value="">Select Packing Preference</option>
            <option value="Regular">Regular</option>
            <option value="Fragile">Fragile</option>
            <option value="Gift Wrap">Gift Wrap</option>
          </select>
        </div>

        <div className="mb-3">
          <label>Delivery Type</label>
          <select
            name="deliveryType"
            value={booking.deliveryType}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option value="">Select Delivery Type</option>
            <option value="Express">Express</option>
            <option value="Standard">Standard</option>
          </select>
        </div>

        {/* ✅ Dynamic Cost Display */}
        <div className="mb-3">
          <label>Estimated Service Cost</label>
          <input
            type="text"
            value={booking.serviceCost ? `₹${booking.serviceCost}` : "—"}
            className="form-control"
            readOnly
          />
        </div>

        <div className="mb-3">
          <label>Pickup Date</label>
          <input
            type="date"
            name="pickupTime"
            value={booking.pickupTime}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        {user?.role === "ADMIN" && (
          <div className="mb-3">
            <label>Dropoff Date</label>
            <input
              type="date"
              name="dropoffTime"
              value={booking.dropoffTime}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        )}

        <button type="submit" className="btn btn-primary mt-3">
          Submit Booking
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
