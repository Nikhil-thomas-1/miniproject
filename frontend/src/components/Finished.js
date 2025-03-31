import React from 'react';
import { useNavigate } from 'react-router-dom';
import  { useState } from 'react';

import '../Styles/Finished.css';

const Finished = () => {
  const navigate = useNavigate();
  const [completedTasks] = useState([
    { id: 1, title: 'Complete project proposal', completedDate: '2023-11-15', rating: 4 },
    { id: 2, title: 'Client presentation', completedDate: '2023-11-10', rating: 5 },
    { id: 3, title: 'Code review', completedDate: '2023-11-08', rating: 3 }
  ]);

  const handleBack = () => {
    navigate('/employee/dashboard');
  };

  return (
    <div className="employee-dashboard-container">
      {/* Same header as Employee.js */}
      
      <div className="content-wrapper">
        {/* Same sidebar as Employee.js */}
        
        <main className="main-content">
          <div className="panel-header">
            <button className="back-btn" onClick={handleBack}>
              <i className="fas fa-arrow-left"></i> Back to Dashboard
            </button>
            <h2>Completed Work</h2>
          </div>

          <div className="completed-work-container">
            <div className="performance-stats">
              <div className="stat-card">
                <h3>Tasks Completed</h3>
                <p className="stat-value">24</p>
                <p className="stat-period">This Month</p>
              </div>
              <div className="stat-card">
                <h3>Average Rating</h3>
                <p className="stat-value">4.2</p>
                <p className="stat-period">Out of 5</p>
              </div>
            </div>

            <div className="completed-tasks">
              <h3>Recently Completed</h3>
              <table>
                <thead>
                  <tr>
                    <th>Task</th>
                    <th>Completed On</th>
                    <th>Rating</th>
                    <th>Review</th>
                  </tr>
                </thead>
                <tbody>
                  {completedTasks.map(task => (
                    <tr key={task.id}>
                      <td>{task.title}</td>
                      <td>{task.completedDate}</td>
                      <td>
                        <div className="rating-stars">
                          {[...Array(5)].map((_, i) => (
                            <i 
                              key={i} 
                              className={`fas fa-star ${i < task.rating ? 'filled' : ''}`}
                            ></i>
                          ))}
                        </div>
                      </td>
                      <td>
                        <button className="review-btn">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Same footer as Employee.js */}
    </div>
  );
};

export default Finished;