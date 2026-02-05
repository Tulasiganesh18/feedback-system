import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex justify-between items-center">
      <span className="font-bold text-lg">📝 Feedback System</span>

      <div className="space-x-4 flex items-center">
        {/* 🔓 Not Logged In */}
        {!token && (
          <>
            <Link to="/login" className="hover:underline text-blue-300">Login</Link>
            <Link to="/signup" className="hover:underline text-blue-300">Signup</Link>
          </>
        )}

        {/* 🔐 Logged In */}
        {token && (
          <>
            {role === 'manager' && (
              <Link to="/manager" className="hover:underline text-green-300">Manager Dashboard</Link>
            )}
            {role === 'employee' && (
              <Link to="/employee" className="hover:underline text-yellow-300">Employee Dashboard</Link>
            )}
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
