import React, { useEffect, useState } from 'react';

interface MentorshipRequest {
  id: string;
  menteeId: string;
  mentorId: string;
  status: string;
}

const MentorRequests: React.FC = () => {
  const [requests, setRequests] = useState<MentorshipRequest[]>([]);
  const [error, setError] = useState('');

  const handleUpdate = async (requestId: string, status: string) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await fetch('http://localhost:5000/mentorship/update-status', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ requestId, status }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message);

        // Update the status in local state
        setRequests((prev) =>
          prev.map((r) =>
            r.id === requestId ? { ...r, status } : r
          )
        );
      } else {
        alert(data.message || 'Failed to update request');
      }
    } catch (err) {
      console.error('Update failed:', err);
      alert('Something went wrong.');
    }
  };

  useEffect(() => {
    const fetchRequests = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found');
        return;
      }

      try {
        const res = await fetch('http://localhost:5000/mentorship/my-requests', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          setError(`Error ${res.status}`);
          return;
        }

        const data = await res.json();
        setRequests(data);
      } catch (err) {
        console.error('Error fetching requests:', err);
        setError('Something went wrong');
      }
    };

    fetchRequests();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Mentorship Requests Sent To You</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {requests.length > 0 ? (
        <ul>
          {requests.map((req) => (
            <li
              key={req.id}
              style={{
                marginBottom: '1rem',
                border: '1px solid #ccc',
                padding: '1rem',
                borderRadius: '8px',
                backgroundColor: '#f9f9f9',
              }}
            >
              <p><strong>Request ID:</strong> {req.id}</p>
              <p><strong>Status:</strong> {req.status}</p>
              <p><strong>Mentee ID:</strong> {req.menteeId}</p>

              {req.status === 'pending' && (
                <div style={{ marginTop: '0.5rem' }}>
                  <button onClick={() => handleUpdate(req.id, 'approved')} style={{ marginRight: '0.5rem' }}>
                    ✅ Approve
                  </button>
                  <button onClick={() => handleUpdate(req.id, 'rejected')}>
                    ❌ Reject
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No mentorship requests found.</p>
      )}
    </div>
  );
};

export default MentorRequests;
