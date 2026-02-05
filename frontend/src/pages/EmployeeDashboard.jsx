import React, { useEffect, useState } from 'react';
import axios from 'axios';

function EmployeeDashboard() {
  const [feedbacks, setFeedbacks] = useState([]);

  const fetchFeedbacks = () => {
    axios.get('http://localhost:8000/api/feedbacks/', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => setFeedbacks(res.data));
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleAcknowledge = async (id) => {
    await axios.post(`http://localhost:8000/api/feedbacks/${id}/acknowledge/`, {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    fetchFeedbacks();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Your Feedback</h1>
      {feedbacks.map(fb => (
        <div key={fb.id} className="border p-4 rounded mb-3">
          <p><strong>From:</strong> {fb.manager.username}</p>
          <p><strong>Strengths:</strong> {fb.strengths}</p>
          <p><strong>Areas to Improve:</strong> {fb.areas_to_improve}</p>
          <p><strong>Sentiment:</strong> {fb.sentiment}</p>
          <p><strong>Acknowledged:</strong> {fb.acknowledged ? '✅' : '❌'}</p>
          {!fb.acknowledged && (
            <button
              onClick={() => handleAcknowledge(fb.id)}
              className="bg-green-500 text-white px-3 py-1 rounded mt-2"
            >
              Acknowledge
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default EmployeeDashboard;
