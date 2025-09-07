import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Registration() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+91",
    mobile: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const countryCodes = ["+91", "+1", "+44", "+61", "+81"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name || formData.name.length > 50)
      newErrors.name = "Name is required (max 50 characters)";
    if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Valid email is required";
    if (!/^\d{10}$/.test(formData.mobile))
      newErrors.mobile = "Mobile number must be 10 digits";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.password || formData.password.length > 30)
      newErrors.password = "Password is required (max 30 characters)";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await axios.post(
        "http://localhost:8080/api/registration",
        formData
      );
      setMessage(response.data);

      if (response.data === "User registered successfully") {
        alert("Registration successful! Please login.");
        navigate("/login");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit} className="border p-4 rounded shadow">
        <h2 className="mb-4">Customer Registration</h2>

        {/* Name */}
        <div className="mb-3">
          <label className="form-label">Customer Name</label>
          <input
            type="text"
            name="name"
            maxLength={50}
            value={formData.name}
            onChange={handleChange}
            className="form-control"
          />
          {errors.name && <div className="text-danger">{errors.name}</div>}
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
          />
          {errors.email && <div className="text-danger">{errors.email}</div>}
        </div>

        {/* Mobile */}
        <div className="mb-3">
          <label className="form-label">Mobile Number</label>
          <div className="input-group">
            <select
              name="countryCode"
              value={formData.countryCode}
              onChange={handleChange}
              className="form-select"
              style={{ maxWidth: "100px" }}
            >
              {countryCodes.map((code) => (
                <option key={code} value={code}>
                  {code}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="mobile"
              maxLength={10}
              value={formData.mobile}
              onChange={handleChange}
              className="form-control"
              placeholder="10-digit number"
            />
          </div>
          {errors.mobile && <div className="text-danger">{errors.mobile}</div>}
        </div>

        {/* Address */}
        <div className="mb-3">
          <label className="form-label">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="form-control"
          ></textarea>
          {errors.address && (
            <div className="text-danger">{errors.address}</div>
          )}
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            maxLength={30}
            value={formData.password}
            onChange={handleChange}
            className="form-control"
          />
          {errors.password && (
            <div className="text-danger">{errors.password}</div>
          )}
        </div>

        {/* Confirm Password */}
        <div className="mb-3">
          <label className="form-label">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            maxLength={30}
            value={formData.confirmPassword}
            onChange={handleChange}
            className="form-control"
          />
          {errors.confirmPassword && (
            <div className="text-danger">{errors.confirmPassword}</div>
          )}
        </div>

        {/* Submit */}
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>

      {message && <p className="mt-3">{message}</p>}
    </div>
  );
}
