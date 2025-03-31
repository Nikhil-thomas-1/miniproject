import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/home.css";

const AdminHome = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("warnings");
  const [violations, setViolations] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  // Employee State
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    password: "",
    role: "manager",
    workingHours: [{ day: "", hours: "" }],
  });

  // Fetch Violations
  useEffect(() => {
    const fetchViolations = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/alerts");
        setViolations(response.data);
      } catch (err) {
        setError("Failed to fetch security violations");
      } finally {
        setLoading(false);
      }
    };

    fetchViolations();
  }, []);

  // Fetch Users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/users");
        setUsers(response.data);
      } catch (err) {
        setError("Failed to fetch users");
      }
    };

    fetchUsers();
  }, []);

  // Handle Violation Resolution
  const handleResolveViolation = (id) => {
    setViolations(
      violations.map((violation) =>
        violation._id === id ? { ...violation, status: "Resolved" } : violation
      )
    );
  };

  const handleLogout = () => {
    navigate("/login");
  };

  // Employee Form Handlers
  const handleEmployeeChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleWorkingHoursChange = (index, field, value) => {
    const updatedHours = [...employee.workingHours];
    updatedHours[index][field] = value;
    setEmployee({ ...employee, workingHours: updatedHours });
  };

  const addWorkingHour = () => {
    setEmployee({
      ...employee,
      workingHours: [...employee.workingHours, { day: "", hours: "" }],
    });
  };

  // Submit Employee Form
  const handleEmployeeSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", employee);
      setSuccessMessage("Employee added successfully!");
      setEmployee({
        name: "",
        email: "",
        password: "",
        role: "manager",
        workingHours: [{ day: "", hours: "" }],
      });
    } catch (error) {
      setError("Failed to add employee");
    }
  };

  return (
    <div className="admin-home-container">
      <header className="admin-header">
        <div className="logo-container">
          <h1>AXIO CREATIVE STUDIOS</h1>
          <p>Internal Threat Prevention System</p>
        </div>
        <div className="admin-info">
          <span>Welcome, Admin</span>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <div className="content-wrapper">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-section">
            <h3>Quick Actions</h3>
            <button
              className={`sidebar-btn ${activeTab === "warnings" ? "active" : ""}`}
              onClick={() => setActiveTab("warnings")}
            >
              Security Warnings
            </button>
            <button
              className={`sidebar-btn ${activeTab === "addEmployee" ? "active" : ""}`}
              onClick={() => setActiveTab("addEmployee")}
            >
              Add Employee
            </button>
            <button
              className={`sidebar-btn ${activeTab === "users" ? "active" : ""}`}
              onClick={() => setActiveTab("users")}
            >
              Users
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          {/* Security Warnings */}
          {activeTab === "warnings" && (
            <div className="warnings-panel">
              <h2>Security Violations & Threats</h2>
              <button className="refresh-btn" onClick={() => window.location.reload()}>
                Refresh
              </button>

              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p className="error-message">{error}</p>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Violation Type</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {violations.map((violation) => (
                      <tr key={violation._id}>
                        <td>{violation.name}</td>
                        <td>{violation.email}</td>
                        <td>{violation.reason}</td>
                        <td>{new Date(violation.attemptedAt).toLocaleDateString()}</td>
                        <td>{violation.status || "Pending"}</td>
                        <td>
                          <button
                            className="resolve-btn"
                            onClick={() => handleResolveViolation(violation._id)}
                            disabled={violation.status === "Resolved"}
                          >
                            {violation.status === "Resolved" ? "Resolved" : "Mark Resolved"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* Add Employee Form */}
          {activeTab === "addEmployee" && (
            <div className="add-employee-form">
              <h2>Add New Employee</h2>
              {successMessage && <p className="success-message">{successMessage}</p>}
              <form onSubmit={handleEmployeeSubmit}>
                <input type="text" name="name" placeholder="Name" value={employee.name} onChange={handleEmployeeChange} required />
                <input type="email" name="email" placeholder="Email" value={employee.email} onChange={handleEmployeeChange} required />
                <input type="password" name="password" placeholder="Password" value={employee.password} onChange={handleEmployeeChange} required />

                <select name="role" value={employee.role} onChange={handleEmployeeChange} required>
                  <option value="manager">Manager</option>
                  <option value="employee">Employee</option>
                </select>

                <label>Working Hours:</label>
                {employee.workingHours.map((wh, index) => (
                  <div key={index} className="working-hours-input">
                    <input type="text" placeholder="Day" value={wh.day} onChange={(e) => handleWorkingHoursChange(index, "day", e.target.value)} required />
                    <input type="text" placeholder="Hours" value={wh.hours} onChange={(e) => handleWorkingHoursChange(index, "hours", e.target.value)} required />
                  </div>
                ))}
                <button type="button" onClick={addWorkingHour}>Add More Hours</button>
                <button type="submit">Add Employee</button>
              </form>
            </div>
          )}

          {/* User List */}
          {activeTab === "users" && (
            <div className="users-panel">
              <h2>Employee List</h2>
              {users.length === 0 ? <p>No employees found.</p> : (
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminHome;
