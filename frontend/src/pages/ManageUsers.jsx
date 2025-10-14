import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminRegistration from "./AdminRegistration";

const ManageUsers = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [deleteField, setDeleteField] = useState("");

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch users.");
    }
  };

  // Check access
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      if (parsedUser.role === "ADMIN") {
        fetchUsers();
      } else {
        alert("Access denied! Only admins can manage users.");
        navigate("/dashboard");
      }
    } else {
      alert("Please log in first!");
      navigate("/login");
    }
  }, [navigate]);

  // Delete user by ID or email
  const handleDeleteUser = async () => {
    if (!deleteField) {
      alert("Please enter a User ID or Email to delete!");
      return;
    }

    try {
      await axios.delete(`http://localhost:8080/api/user/${deleteField}`);
      alert("User deleted successfully!");
      setDeleteField("");
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Failed to delete user.");
    }
  };

  const handleBack = () => {
    navigate("/dashboard");
  };

  if (!user) return null;

  return (
    <div className="container mt-5">
      {" "}
      {/* Back button */}
      <div className="d-flex justify-content-start mb-3">
        <button className="btn btn-danger" onClick={handleBack}>
          Back
        </button>
      </div>
      <h3>Manage Users (Admin Panel)</h3>
      {/* Admin Registration */}
      <AdminRegistration onNewAdmin={fetchUsers} />
      {/* Delete User Section */}
      <div className="card p-3 mt-4">
        <h5>Delete User</h5>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter User ID or Email"
            value={deleteField}
            onChange={(e) => setDeleteField(e.target.value)}
          />
          <button className="btn btn-danger" onClick={handleDeleteUser}>
            Delete
          </button>
        </div>
      </div>
      {/* User List Section */}
      <div className="card p-3 mt-4">
        <h5>All Users</h5>
        <table className="table table-bordered mt-3">
          <thead className="table-light">
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center">
                  No users found
                </td>
              </tr>
            )}
            {users.map((u) => (
              <tr key={u.userId}>
                <td>{u.userId}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.mobile}</td>
                <td>
                  <span
                    className={`badge ${
                      u.role === "ADMIN" ? "bg-success" : "bg-primary"
                    }`}
                  >
                    {u.role}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
