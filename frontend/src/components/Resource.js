import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Resources.css'; // Make sure this import path is correct

const Resources = ({ onLogout }) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);
  const [error, setError] = useState('');
  
  const RESOURCE_PASSWORD = "secure@123";

  const [resources] = useState([
    { id: 1, name: 'Brand Guidelines', type: 'PDF', category: 'Design', date: '2023-10-15' },
    { id: 2, name: 'Employee Handbook', type: 'PDF', category: 'HR', date: '2023-11-01' },
    { id: 3, name: 'Project Template', type: 'DOCX', category: 'Templates', date: '2023-09-20' }
  ]);

  const handleBack = () => navigate('/employee/dashboard');

  const handleDownloadClick = (resource) => {
    setSelectedResource(resource);
    setShowPasswordModal(true);
    setError('');
  };

  const verifyPassword = () => {
    if (password === RESOURCE_PASSWORD) {
      // Download logic here
      const content = `This is a dummy ${selectedResource.type} file for ${selectedResource.name}.`;
      const blob = new Blob([content], { type: 'application/octet-stream' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${selectedResource.name}.${selectedResource.type.toLowerCase()}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      setShowPasswordModal(false);
      setPassword('');
    } else {
      setError('Incorrect password');
    }
  };

  return (
    <div className="resource-page-container">
      <header className="employee-header">
        <div className="logo-container">
          <h1>AXIO CREATIVE STUDIOS</h1>
          <p>Employee Dashboard</p>
        </div>
        <div className="employee-info">
          <span>Welcome, Employee</span>
          <button className="logout-btn" onClick={onLogout}>Logout</button>
        </div>
      </header>

      <div className="resource-content-wrapper">
        <aside className="resource-sidebar">
          <div className="resource-sidebar-section">
            <h3>Navigation</h3>
            <button 
              className="resource-sidebar-btn" 
              onClick={() => navigate('/employee/dashboard')}
            >
              <i className="fas fa-home"></i> Dashboard
            </button>
            {/* Other sidebar buttons */}
          </div>
        </aside>

        <main className="resource-main-content">
          <div className="resource-panel-header">
            <button className="resource-back-btn" onClick={handleBack}>
              <i className="fas fa-arrow-left"></i> Back
            </button>
            <h2 className="resource-panel-title">Company Resources</h2>
            <div className="resource-search-bar">
              <input 
                type="text" 
                placeholder="Search resources..." 
                className="resource-search-input" 
              />
              <button className="resource-search-btn">
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>

          <div className="resource-layout">
            <div className="resource-categories">
              <div className="resource-categories-panel">
                <h3>Categories</h3>
                <ul className="resource-category-list">
                  <li className="resource-category-item active">All Resources</li>
                  {/* Other categories */}
                </ul>
              </div>
            </div>

            <div className="resource-list-container">
              <div className="resource-table-container">
                <table className="resource-table">
                  <thead>
                    <tr>
                      <th>Resource Name</th>
                      <th>Type</th>
                      <th>Category</th>
                      <th>Date Added</th>
                      <th>Download</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resources.map(resource => (
                      <tr key={resource.id}>
                        <td>{resource.name}</td>
                        <td>{resource.type}</td>
                        <td>{resource.category}</td>
                        <td>{resource.date}</td>
                        <td>
                          <button 
                            className="resource-download-btn"
                            onClick={() => handleDownloadClick(resource)}
                          >
                            <i className="fas fa-download"></i> Download
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>

      {showPasswordModal && (
        <div className="resource-modal-overlay">
          <div className="resource-password-modal">
            <h3>Enter Password to Download</h3>
            <p>Accessing: <strong>{selectedResource?.name}</strong></p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="resource-password-input"
              placeholder="Enter password"
              autoFocus
            />
            {error && <p className="resource-error-message">{error}</p>}
            <div className="resource-modal-actions">
              <button 
                className="resource-modal-btn resource-modal-cancel"
                onClick={() => {
                  setShowPasswordModal(false);
                  setPassword('');
                  setError('');
                }}
              >
                Cancel
              </button>
              <button 
                className="resource-modal-btn resource-modal-confirm"
                onClick={verifyPassword}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="employee-footer">
        <p>AXIO CREATIVE STUDIOS © 2023 | Employee Portal v1.0</p>
      </footer>
    </div>
  );
};

export default Resources;