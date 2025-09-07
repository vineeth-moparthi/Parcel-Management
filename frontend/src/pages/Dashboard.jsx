import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      navigate("/login"); // redirect if not logged in
    } else {
      setUser(JSON.parse(storedUser)); // parse user object
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="container mt-5">
      <h2>Parcel Management Dashboard</h2>
      {user && <h4 className="mt-3">Welcome, {user.name} 👋</h4>}

      <div className="d-grid gap-3 mt-4">
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
          Track Parcel
        </button>

        <button
          className="btn btn-warning"
          onClick={() => navigate("/pickup-drop-update")}
        >
          Update Booking Time
        </button>

        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
