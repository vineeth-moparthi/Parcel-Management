import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "../pages/Home";
import Login from "../pages/Login";
import UserRegistration from "../pages/UserRegistration";
import AdminRegistration from "../pages/AdminRegistration";
import BookingForm from "../pages/BookingForm";
import Dashboard from "../pages/Dashboard";
import PreviousBookings from "../pages/PreviousBookings";
import Tracking from "../pages/Tracking";
import PickupDropUpdate from "../pages/PickupDropUpdate";
import ManageUsers from "../pages/ManageUsers";
import AllBookings from "../pages/AllBookings";

// import Dashboard from '../pages/Dashboard';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/user-registration" element={<UserRegistration />} />
        <Route path="/admin-registration" element={<AdminRegistration />} />
        {/* <Route path="/bookingpage" element={<BookingPage />} /> */}
        {/* <Route path="/bookingservice" element={<BookingServicePage />} /> */}
        <Route path="/booking-form" element={<BookingForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/booking-form" element={<BookingForm />} />
        <Route path="/previous-bookings" element={<PreviousBookings />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path="/pickup-drop-update" element={<PickupDropUpdate />} />
        <Route path="/manage-users" element={<ManageUsers />} />
        <Route path="/all-bookings" element={<AllBookings />} />
      </Routes>
    </BrowserRouter>
  );
}
