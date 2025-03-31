import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Task.css';

const Tasks = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Complete project proposal', project: 'Website Redesign', due: '2023-11-20', priority: 'High' },
    { id: 2, title: 'Review design mockups', project: 'Mobile App', due: '2023-11-18', priority: 'Medium' },
    { id: 3, title: 'Prepare presentation', project: 'Client Meeting', due: '2023-11-22', priority: 'High' }
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
            <h2>Your Tasks</h2>
            <button className="add-task-btn">
              <i className="fas fa-plus"></i> Add New Task
            </button>
          </div>

          <div className="tasks-container">
            <div className="task-filters">
              <div className="filter-group">
                <label>Filter by:</label>
                <select>
                  <option>All Tasks</option>
                  <option>High Priority</option>
                  <option>Due This Week</option>
                </select>
              </div>
              <div className="filter-group">
                <label>Sort by:</label>
                <select>
                  <option>Due Date</option>
                  <option>Priority</option>
                  <option>Project</option>
                </select>
              </div>
            </div>

            <table className="tasks-table">
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Project</th>
                  <th>Due Date</th>
                  <th>Priority</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map(task => (
                  <tr key={task.id}>
                    <td>{task.title}</td>
                    <td>{task.project}</td>
                    <td>{task.due}</td>
                    <td>
                      <span className={`priority-badge ${task.priority.toLowerCase()}`}>
                        {task.priority}
                      </span>
                    </td>
                    <td>
                      <button className="task-action-btn">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button className="task-action-btn">
                        <i className="fas fa-check"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* Same footer as Employee.js */}
    </div>
  );
};

export default Tasks;