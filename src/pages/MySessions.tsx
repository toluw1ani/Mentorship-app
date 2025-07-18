import React, { useEffect, useState } from 'react';

interface Session {
  id: string;
  menteeId: string;
  mentorId: string;
  requestId: string;
  dateTime: string;
}

const MySessions: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSessions = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await fetch('http://localhost:5000/sessions/my-sessions', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setSessions(data);
        } else {
          setError(data.message || 'Failed to fetch sessions');
        }
      } catch (err: any) {
  console.error('Fetch error:', err);
  setError(err.message || 'Something went wrong');
}

    };

    fetchSessions();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>My Scheduled Sessions</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {sessions.length > 0 ? (
        <ul>
          {sessions.map((session) => (
            <li key={session.id} style={{ marginBottom: '1rem', border: '1px solid #ccc', padding: '1rem' }}>
              <p><strong>Date & Time:</strong> {new Date(session.dateTime).toLocaleString()}</p>
              <p><strong>Mentor ID:</strong> {session.mentorId}</p>
              <p><strong>Mentee ID:</strong> {session.menteeId}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No sessions found.</p>
      )}
    </div>
  );
};

export default MySessions;
