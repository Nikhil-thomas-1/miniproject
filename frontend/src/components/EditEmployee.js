import React, { useState } from 'react';

const EditEmployee = ({ employee, onSave, onCancel }) => {
  const [name, setName] = useState(employee.name);
  const [position, setPosition] = useState(employee.position);
  const [department, setDepartment] = useState(employee.department);
  const [worktime, setWorktime] = useState(employee.worktime);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...employee, name, position, department, worktime });
  };

  return (
    <div className="edit-employee-form">
      <h3>Edit Employee</h3>
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
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditEmployee;