import React, { useState } from 'react';

const AddEmployee = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [department, setDepartment] = useState('');
  const [worktime, setWorktime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !position || !department || !worktime) {
      alert('Please fill all fields');
      return;
    }
    onAdd({ name, position, department, worktime });
    setName('');
    setPosition('');
    setDepartment('');
    setWorktime('');
  };

  return (
    <div className="add-employee-form">
      <h3>Add New Employee</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Position:</label>
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Department:</label>
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Worktime:</label>
          <input
            type="text"
            value={worktime}
            onChange={(e) => setWorktime(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployee;