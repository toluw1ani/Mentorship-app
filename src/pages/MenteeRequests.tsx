import React, { useEffect, useState } from 'react';

interface MentorshipRequest {
  id: string;
  menteeId: string;
  mentorId: string;
  status: string;
}

const MenteeRequests: React.FC = () => {
  const [requests, setRequests] = useState<MentorshipRequest[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRequests = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found');
        return;
      }

      try {
        const res = await fetch('http://localhost:5000/mentorship/sent-requests', {
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
        console.error('Error fetching sent requests:', err);
        setError('Something went wrong');
      }
    };

    fetchRequests();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Your Sent Mentorship Requests</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {requests.length > 0 ? (
        <ul>
          {requests.map((req) => (
            <li key={req.id} style={{ marginBottom: '1rem', border: '1px solid #ccc', padding: '1rem' }}>
              <p><strong>Request ID:</strong> {req.id}</p>
              <p><strong>Status:</strong> {req.status}</p>
              <p><strong>Mentor ID:</strong> {req.mentorId}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>You haven't sent any mentorship requests yet.</p>
      )}
    </div>
  );
};

export default MenteeRequests;
