import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ManagerDashboard() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmp, setSelectedEmp] = useState('');
  const [formData, setFormData] = useState({
    strengths: '',
    areas_to_improve: '',
    sentiment: 'positive',
  });

  useEffect(() => {
    axios.get('http://localhost:8000/api/users/', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => setEmployees(res.data));
  }, []);

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:8000/api/feedbacks/', {
        ...formData,
        employee: parseInt(selectedEmp),
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('✅ Feedback submitted!');
      setFormData({ strengths: '', areas_to_improve: '', sentiment: 'positive' });
    } catch (err) {
      console.log("🔥 Backend Error:", JSON.stringify(err.response?.data, null, 2));
      alert('❌ Failed to submit feedback');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Manager Dashboard</h1>

      <div className="space-y-2 mb-6">
        <select
          className="border p-2 rounded w-full"
          value={selectedEmp}
          onChange={e => setSelectedEmp(e.target.value)}
        >
          <option value="">Select Employee</option>
          {employees.map(emp => (
            <option key={emp.id} value={emp.id}>
              {emp.username}
            </option>
          ))}
        </select>

        <textarea
          placeholder="Strengths"
          className="w-full p-2 border rounded"
          value={formData.strengths}
          onChange={e => setFormData({ ...formData, strengths: e.target.value })}
        />

        <textarea
          placeholder="Areas to Improve"
          className="w-full p-2 border rounded"
          value={formData.areas_to_improve}
          onChange={e => setFormData({ ...formData, areas_to_improve: e.target.value })}
        />

        <select
          className="w-full p-2 border rounded"
          value={formData.sentiment}
          onChange={e => setFormData({ ...formData, sentiment: e.target.value })}
        >
          <option value="positive">Positive</option>
          <option value="neutral">Neutral</option>
          <option value="negative">Negative</option>
        </select>

        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Submit Feedback
        </button>
      </div>
    </div>
  );
}

export default ManagerDashboard;
