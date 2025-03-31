import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Employee from './components/Employee';
import AdminHome from './components/Adminhome';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login onLogin={() => {}} />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/manager" element={<AdminHome />} />
        <Route path="*" element={<Login />} />

      </Routes>
    </Router>
  );
};

export default App;
