import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Schedule.css';
import Reac, { useState } from 'react';  

const Scheduled = () => {
  const navigate = useNavigate();
  const [events] = useState([
    { id: 1, title: 'Team Meeting', date: '2023-11-20', time: '10:00 AM', location: 'Conference Room A' },
    { id: 2, title: 'Client Review', date: '2023-11-22', time: '2:00 PM', location: 'Zoom' },
    { id: 3, title: 'Project Deadline', date: '2023-11-25', time: '5:00 PM', location: 'Office' }
  ]);

  const handleBack = () => {
    navigate('/employee/dashboard');
  };

  return (
    <div className="employee-dashboard-container">
      {/* Same header as Employee.js */}
      <header className="employee-header">
        <div className="logo-container">
          <h1>AXIO CREATIVE STUDIOS</h1>
          <p>Employee Dashboard</p>
        </div>
        <div className="employee-info">
          <span>Welcome, Employee</span>
          <button className="logout-btn" onClick={() => navigate('/login')}>Logout</button>
        </div>
      </header>

      <div className="content-wrapper">
        {/* Same sidebar as Employee.js */}
        <aside className="sidebar">
          {/* ... same sidebar content ... */}
        </aside>

        <main className="main-content">
          <div className="panel-header">
            <button className="back-btn" onClick={handleBack}>
              <i className="fas fa-arrow-left"></i> Back to Dashboard
            </button>
            <h2>Scheduled Events</h2>
          </div>

          <div className="events-calendar">
            <div className="calendar-view">
              {/* Calendar component would go here */}
              <p>Calendar View Placeholder</p>
            </div>
            
            <div className="events-list">
              <h3>Upcoming Events</h3>
              <table>
                <thead>
                  <tr>
                    <th>Event</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Location</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map(event => (
                    <tr key={event.id}>
                      <td>{event.title}</td>
                      <td>{event.date}</td>
                      <td>{event.time}</td>
                      <td>{event.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Same footer as Employee.js */}
      <footer className="employee-footer">
        <p>AXIO CREATIVE STUDIOS © 2023 | Employee Portal v1.0</p>
        <p className="footer-note">
          <i className="fas fa-info-circle"></i> Need help? Contact your manager.
        </p>
      </footer>
    </div>
  );
};

export default Scheduled;