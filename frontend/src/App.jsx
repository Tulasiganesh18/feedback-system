import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ManagerDashboard from './pages/ManagerDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import Navbar from './components/Navbar';

function App() {
  const [role, setRole] = useState(localStorage.getItem('role'));

  useEffect(() => {
    const handleStorageChange = () => {
      setRole(localStorage.getItem('role'));
    };

    // Listen to storage updates
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/manager" element={role?.toLowerCase() === 'manager' ? <ManagerDashboard /> : <Navigate to="/login" />} />
        <Route path="/employee" element={role?.toLowerCase() === 'employee' ? <EmployeeDashboard /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
