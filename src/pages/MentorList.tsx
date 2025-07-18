import React, { useEffect, useState } from 'react';

interface Mentor {
  id: string;
  name: string;
  email: string;
  role: string;
  bio?: string;
  skills?: string[];
}

const MentorList: React.FC = () => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [error, setError] = useState('');

  // ✅ Send mentorship request to backend
  const sendRequest = async (mentorId: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('No token found — please log in again.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/mentorship/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ mentorId }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message);
      } else {
        alert(data.message || 'Failed to send request');
      }
    } catch (err) {
      console.error('Request failed:', err);
      alert('Something went wrong.');
    }
  };

  // ✅ Fetch mentor list from backend
  useEffect(() => {
    const fetchMentors = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found');
        return;
      }

      try {
        const res = await fetch('http://localhost:5000/users/mentors', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          setError(`Error ${res.status}: ${res.statusText}`);
          return;
        }

        const data = await res.json();
        setMentors(data);
      } catch (err) {
        console.error('Error fetching mentors:', err);
        setError('Something went wrong');
      }
    };

    fetchMentors();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Available Mentors</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {mentors.length > 0 ? (
        mentors.map((mentor) => (
          <div
            key={mentor.id}
            style={{
              border: '1px solid #ccc',
              padding: '1rem',
              marginBottom: '1rem',
              borderRadius: '8px',
              backgroundColor: '#f9f9f9',
            }}
          >
            <h3>{mentor.name}</h3>
            <p><strong>Email:</strong> {mentor.email}</p>
            <p><strong>Bio:</strong> {mentor.bio || 'No bio provided'}</p>
            <p><strong>Skills:</strong> {mentor.skills?.join(', ') || 'None listed'}</p>

            <button onClick={() => sendRequest(mentor.id)} style={{ marginTop: '0.5rem' }}>
              Request Mentorship
            </button>
          </div>
        ))
      ) : (
        <p>Loading mentors...</p>
      )}
    </div>
  );
};

export default MentorList;
