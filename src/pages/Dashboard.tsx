import React from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  name: string;
  email: string;
  role: string;
}

interface DashboardProps {
  user: User | null;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Welcome to your Dashboard</h2>

      {user ? (
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>

          {user.role === 'mentee' && (
            <>
              <button onClick={() => navigate('/mentors')} style={{ marginTop: '0.5rem' }}>
                View Mentors
              </button>
              <br />
              <button onClick={() => navigate('/sent-requests')} style={{ marginTop: '0.5rem' }}>
                View My Requests
              </button>
              <br />
              <button onClick={() => navigate('/schedule-session')} style={{ marginTop: '0.5rem' }}>
                Schedule a Session
              </button>
              <br />
              <button onClick={() => navigate('/my-sessions')} style={{ marginTop: '0.5rem' }}>
                View My Sessions
              </button>
            </>
          )}

          {user.role === 'mentor' && (
            <>
              <button onClick={() => navigate('/my-requests')} style={{ marginTop: '0.5rem' }}>
                View Incoming Requests
              </button>
              <br />
              <button onClick={() => navigate('/my-sessions')} style={{ marginTop: '0.5rem' }}>
                View My Sessions
              </button>
            </>
          )}
        </div>
      ) : (
        <p>Loading user info...</p>
      )}

      <button onClick={handleLogout} style={{ marginTop: '2rem', color: 'white', backgroundColor: '#cc0000', padding: '0.5rem 1rem', border: 'none', borderRadius: '4px' }}>
        Log Out
      </button>
    </div>
  );
};
<h1 className="text-3xl font-bold text-blue-600">Tailwind is working!</h1>

export default Dashboard;
