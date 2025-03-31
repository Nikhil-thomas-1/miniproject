import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Employee.css';

const Employee = () => {
  const navigate = useNavigate();
  
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Complete project proposal', due: '2023-11-20', status: 'Pending' },
    { id: 2, title: 'Review design mockups poda', due: '2023-11-18', status: 'In Progress' },
    { id: 3, title: 'Team meeting', due: '2023-11-15', status: 'Completed' }
  ]);

  const handleTaskComplete = (id) => {
    setTasks((prevTasks) => 
      prevTasks.map(task => 
        task.id === id ? { ...task, status: 'Completed' } : task
      )
    );
  };

  const handleLogout = async () => {
    try {
      // Clear the token from localStorage first
      localStorage.removeItem("token");
      
      // Make API call to logout
      const response = await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Redirect to login page
        navigate("/login");
      } else {
        console.error("Logout failed");
        // Even if API fails, we still redirect to login
        navigate("/login");
      }
    } catch (error) {
      console.error("Error logging out:", error);
      // On error, still redirect to login
      navigate("/login");
    }
  };

  const navigateTo = (page) => navigate(`/employee/${page}`);

  return (
    <div className="employee-dashboard-container">
      <header className="employee-header">
        <div className="logo-container">
          <h1>AXIO CREATIVE STUDIOS</h1>
          <p>Employee Dashboard</p>
        </div>
        <div className="employee-info">
          <span>Welcome, Employee</span>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <div className="content-wrapper">
        <aside className="sidebar">
          <div className="sidebar-section">
            <h3>Navigation</h3>
            {['dashboard', 'scheduled', 'tasks', 'finished', 'resources'].map((page, index) => (
              <button 
                key={index} 
                className={`sidebar-btn ${window.location.pathname.includes(page) ? 'active' : ''}`}
                onClick={() => navigateTo(page)}
              >
                <i className={`fas fa-${page === 'dashboard' ? 'home' : page}`}></i> {page.charAt(0).toUpperCase() + page.slice(1)}
              </button>
            ))}
          </div>

          <div className="sidebar-section">
            <h3>Quick Stats</h3>
            {['Pending', 'In Progress', 'Completed'].map((status, index) => (
              <div key={index} className="status-item">
                <span>{status} Tasks: {tasks.filter(t => t.status === status).length}</span>
              </div>
            ))}
          </div>
        </aside>

        <main className="main-content">
          <div className="welcome-banner">
            <h2>Welcome to Axio Creative Studios</h2>
            <p>Your creative workspace for amazing projects</p>
          </div>

          <div className="dashboard-cards">
            {['scheduled', 'tasks', 'finished', 'resources'].map((page, index) => (
              <div key={index} className="dashboard-card" onClick={() => navigateTo(page)}>
                <div className="card-icon">
                  <i className={`fas fa-${page === 'tasks' ? 'tasks' : page}`}></i>
                </div>
                <h3>{page.charAt(0).toUpperCase() + page.slice(1)}</h3>
                <p>{`View your ${page} details`}</p>
                <button className="view-btn">View {page.charAt(0).toUpperCase() + page.slice(1)}</button>
              </div>
            ))}
          </div>

          <div className="tasks-panel">
            <h3>Your Current Tasks</h3>
            <table>
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map(task => (
                  <tr key={task.id}>
                    <td>{task.title}</td>
                    <td>{task.due}</td>
                    <td>
                      <span className={`status-badge ${task.status.toLowerCase().replace(' ', '-')}`}>
                        {task.status}
                      </span>
                    </td>
                    <td>
                      <button 
                        className="complete-btn"
                        onClick={() => handleTaskComplete(task.id)}
                        disabled={task.status === 'Completed'}
                      >
                        {task.status === 'Completed' ? 'Done' : 'Mark Complete'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      <footer className="employee-footer">
        <p>AXIO CREATIVE STUDIOS © 2023 | Employee Portal v1.0</p>
        <p className="footer-note">
          <i className="fas fa-info-circle"></i> Need help? Contact your manager.
        </p>
      </footer>
    </div>
  );
};

export default Employee;