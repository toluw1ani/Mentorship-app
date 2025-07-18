import React, { useEffect, useState } from 'react';

interface ApprovedRequest {
  id: string;
  mentorId: string;
  status: string;
}

const ScheduleSession: React.FC = () => {
  const [requests, setRequests] = useState<ApprovedRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchApproved = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      const res = await fetch('http://localhost:5000/mentorship/sent-requests', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      const approved = data.filter((r: any) => r.status === 'approved');
      setRequests(approved);
    };

    fetchApproved();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return;

    const selected = requests.find((r) => r.id === selectedRequest);
    if (!selected) return;

    const res = await fetch('http://localhost:5000/sessions/schedule', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        requestId: selected.id,
        mentorId: selected.mentorId,
        dateTime,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage('✅ Session scheduled successfully!');
      setDateTime('');
      setSelectedRequest('');
    } else {
      setMessage(`❌ ${data.message || 'Failed to schedule session'}`);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Schedule a Session</h2>

      {requests.length === 0 ? (
        <p>You have no approved requests to schedule.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Select Approved Request:
            <select
              value={selectedRequest}
              onChange={(e) => setSelectedRequest(e.target.value)}
              required
            >
              <option value="">-- Select a request --</option>
              {requests.map((r) => (
                <option key={r.id} value={r.id}>
                  Request: {r.id.slice(0, 8)}... | Mentor: {r.mentorId.slice(0, 8)}...
                </option>
              ))}
            </select>
          </label>

          <br /><br />

          <label>
            Date & Time:
            <input
              type="datetime-local"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              required
            />
          </label>

          <br /><br />

          <button type="submit">Schedule Session</button>
        </form>
      )}

      {message && <p style={{ marginTop: '1rem', color: 'green' }}>{message}</p>}
    </div>
  );
};

export default ScheduleSession;
