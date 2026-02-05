import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState({ username: '', password: '', role: 'employee' });
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await axios.post('http://localhost:8000/api/signup/', formData);
      alert('✅ Signup successful! Please log in.');
      navigate('/login');
    } catch (err) {
      console.error(err.response?.data);
      alert('❌ Signup failed: ' + (err.response?.data?.error || 'Unknown error'));
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Signup</h1>
      <input
        type="text"
        placeholder="Username"
        className="w-full border p-2 mb-2 rounded"
        onChange={e => setFormData({ ...formData, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full border p-2 mb-2 rounded"
        onChange={e => setFormData({ ...formData, password: e.target.value })}
      />
      <select
        className="w-full border p-2 mb-4 rounded"
        onChange={e => setFormData({ ...formData, role: e.target.value })}
        value={formData.role}
      >
        <option value="employee">Employee</option>
        <option value="manager">Manager</option>
      </select>
      <button
        onClick={handleSignup}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Signup
      </button>
    </div>
  );
}

export default Signup;
