import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Step 1: Get token
      const res = await axios.post('http://localhost:8000/api/token/', formData);
      const accessToken = res.data.access;
      localStorage.setItem('token', accessToken);

      // Step 2: Get logged-in user's role
      const userRes = await axios.get('http://localhost:8000/api/me/', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      const user = userRes.data;
      const role = user.role.toLowerCase();
      localStorage.setItem('role', role);

      // Step 3: Redirect by role (full reload to re-trigger route logic)
      window.location.href = role === 'manager' ? '/manager' : '/employee';

    } catch (err) {
      console.error(err);
      alert('❌ Login failed: Please check your credentials or try again later.');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <input
        type="text"
        placeholder="Username"
        className="w-full border rounded p-2 mb-2"
        value={formData.username}
        onChange={e => setFormData({ ...formData, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full border rounded p-2 mb-4"
        value={formData.password}
        onChange={e => setFormData({ ...formData, password: e.target.value })}
      />
      <button
        onClick={handleLogin}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Login
      </button>
    </div>
  );
}

export default Login;
