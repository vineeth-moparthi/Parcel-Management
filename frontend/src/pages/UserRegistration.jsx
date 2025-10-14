import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserRegistration() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+91",
    mobile: "",
    address: "",
    pincode: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false); // ✅ track success
  const [redirectTo, setRedirectTo] = useState(null);
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
    if (!/^\d{6}$/.test(formData.pincode))
      newErrors.pincode = "Pincode must be 6 digits";
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
      const payload = { ...formData };
      const response = await axios.post(
        "http://localhost:8080/api/user",
        payload
      );

      // ✅ If user doesn't exist and registration successful
      setMessage("New user registered successfully!");
      setSuccess(true); // ✅ mark success
      setRedirectTo("/login"); // optional redirect
    } catch (error) {
      setSuccess(false);
      const errMsg = error.response?.data || "Something went wrong. Try again.";
      setMessage(errMsg);
    }
  };

  useEffect(() => {
    if (redirectTo) navigate(redirectTo);
  }, [redirectTo, navigate]);

  const handleBack = () => {
    navigate("/login");
  };

  return (
    <div className="container mt-5">
      {/* Back button */}
      <div className="d-flex justify-content-start mb-3">
        <button className="btn btn-danger" onClick={handleBack}>
          Back
        </button>
      </div>
      <form onSubmit={handleSubmit} className="border p-4 rounded shadow">
        <h2 className="mb-4">User Registration</h2>

        {/* Name */}
        <div className="mb-3">
          <label className="form-label">Name</label>
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

        {/* Pincode */}
        <div className="mb-3">
          <label className="form-label">Pincode</label>
          <input
            type="text"
            name="pincode"
            maxLength={6}
            value={formData.pincode}
            onChange={handleChange}
            className="form-control"
            placeholder="6-digit pincode"
          />
          {errors.pincode && (
            <div className="text-danger">{errors.pincode}</div>
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

        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>

      {/* ✅ Display message in green if registration successful */}
      {message && (
        <p className={`mt-3 ${success ? "text-success" : "text-danger"}`}>
          {message}
        </p>
      )}
    </div>
  );
}
