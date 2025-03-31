import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Dashboard.css";
import EmployeeList from "./EmployeeList";
import AddEmployee from "./AddEmployee";

const Dashboard = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([
    { id: 1, name: "John Doe", position: "Developer", department: "IT", worktime: "9:00 AM - 5:00 PM" },
    { id: 2, name: "Jane Smith", position: "Designer", department: "Creative", worktime: "10:00 AM - 6:00 PM" },
  ]);
  const [filterDepartment, setFilterDepartment] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  


  const violationsData = {
    1: [
      { id: 1, description: "Late to work on 10/01/2023" },
      { id: 2, description: "Missed deadline for Project X" },
    ],
    2: [{ id: 3, description: "Unauthorized leave on 10/05/2023" }],
  };

  const handleAddEmployee = (newEmployee) => {
    setEmployees([...employees, { ...newEmployee, id: employees.length + 1 }]);
  };

  const handleDeleteEmployee = (id) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
  };

  const handleEditEmployee = (updatedEmployee) => {
    setEmployees(
      employees.map((emp) =>
        emp.id === updatedEmployee.id ? updatedEmployee : emp
      )
    );
  };

  const handleSelectEmployee = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleBackToAdminHome = () => {
    navigate("/admin-home");
  };
  

  // ✅ Logout function
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include", // Ensures cookies are sent (if using cookies for auth)
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}` // Send token if needed
        },
      });

      if (response.ok) {
        localStorage.removeItem("token"); // Remove stored token
        navigate("/Login"); // Redirect to login page
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const filteredEmployees = filterDepartment
    ? employees.filter((emp) => emp.department === filterDepartment)
    : employees;

  return (
    <div className="dashboard-container">
      <div className="top-bar">
        <button className="back-button" onClick={handleBackToAdminHome}>
          ← Back to Admin Home
        </button>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="left-side-panel">
        <h3>Quick Stats</h3>
        <p>Total Employees: {employees.length}</p>
        <p>IT Department: {employees.filter((emp) => emp.department === "IT").length}</p>
        <p>Creative Department: {employees.filter((emp) => emp.department === "Creative").length}</p>
      </div>

      <div className="middle-content">
        <h1>Axio Creative Studios - Admin Dashboard</h1>
        <div>
          <label>Filter by Department:</label>
          <select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
          >
            <option value="">All</option>
            <option value="IT">IT</option>
            <option value="Creative">Creative</option>
            <option value="HR">HR</option>
          </select>
        </div>
        <EmployeeList
          employees={filteredEmployees}
          onDelete={handleDeleteEmployee}
          onEdit={handleEditEmployee}
          onSelect={handleSelectEmployee}
        />
        <AddEmployee onAdd={handleAddEmployee} />
      </div>

      <div className="right-side-panel">
        <h3>Violations</h3>
        {selectedEmployee ? (
          <>
            <p><strong>Selected Employee:</strong> {selectedEmployee.name}</p>
            <ul>
              {violationsData[selectedEmployee.id] ? (
                violationsData[selectedEmployee.id].map((violation) => (
                  <li key={violation.id}>{violation.description}</li>
                ))
              ) : (
                <li>No violations found.</li>
              )}
            </ul>
          </>
        ) : (
          <p>Select an employee to view violations.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
