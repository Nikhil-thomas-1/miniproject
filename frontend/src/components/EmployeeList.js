import React, { useState } from 'react';
import EditEmployee from './EditEmployee';

const EmployeeList = ({ employees, onDelete, onEdit, onSelect }) => {
  const [editEmployee, setEditEmployee] = useState(null);

  const handleEdit = (employee) => {
    setEditEmployee(employee);
  };

  const handleSave = (updatedEmployee) => {
    onEdit(updatedEmployee);
    setEditEmployee(null);
  };

  return (
    <div>
      <h3>Employee List</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Position</th>
            <th>Department</th>
            <th>Worktime</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id} onClick={() => onSelect(emp)} style={{ cursor: 'pointer' }}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.position}</td>
              <td>{emp.department}</td>
              <td>{emp.worktime}</td>
              <td className="actions-cell">
                <button onClick={(e) => { e.stopPropagation(); handleEdit(emp); }}>Edit</button>
                <button onClick={(e) => { e.stopPropagation(); onDelete(emp.id); }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editEmployee && (
        <EditEmployee
          employee={editEmployee}
          onSave={handleSave}
          onCancel={() => setEditEmployee(null)}
        />
      )}
    </div>
  );
};

export default EmployeeList;
