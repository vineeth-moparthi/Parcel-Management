import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      navigate("/login"); // Redirect if not logged in
    } else {
      setUser(JSON.parse(storedUser)); // Parse stored user data
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) return null; // Prevent rendering until user is loaded

  return (
    <div className="container mt-5">
      <h2>Parcel Management Dashboard</h2>
      <h4 className="mt-3">
        Welcome, {user.name} 👋 ({user.role})
      </h4>

      <div className="d-grid gap-3 mt-4">
        {/* Common buttons for both USER and ADMIN */}
        <button
          className="btn btn-primary"
          onClick={() => navigate("/booking-form")}
        >
          New Booking
        </button>

        <button
          className="btn btn-success"
          onClick={() => navigate("/previous-bookings")}
        >
          Previous Bookings
        </button>

        <button className="btn btn-info" onClick={() => navigate("/tracking")}>
          {user.role === "ADMIN" ? "Track and Update Status" : "Track Parcel"}
        </button>

        {/* Role-based control for Update Booking */}
        {user.role === "ADMIN" ? (
          <button
            className="btn btn-warning"
            onClick={() => navigate("/pickup-drop-update")}
          >
            Update Booking Time (Pickup & Drop)
          </button>
        ) : (
          <button
            className="btn btn-warning"
            onClick={() => navigate("/pickup-drop-update")}
          >
            Update Booking Time (Pickup Only)
          </button>
        )}

        {/* Only ADMIN can access extra management controls */}
        {user.role === "ADMIN" && (
          <>
            <button
              className="btn btn-secondary"
              onClick={() => navigate("/manage-users")}
            >
              Manage Users
            </button>
            <button
              className="btn btn-dark"
              onClick={() => navigate("/all-bookings")}
            >
              View All Bookings
            </button>
          </>
        )}

        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
