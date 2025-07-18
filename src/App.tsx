import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MentorList from './pages/MentorList';
import MentorRequests from './pages/MentorRequests';
import MenteeRequests from './pages/MenteeRequests';
import ScheduleSession from './pages/ScheduleSession';
import MySessions from './pages/MySessions';


const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;

      try {
        const res = await fetch('http://localhost:5000/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setUser(data);
        } else {
          localStorage.removeItem('token');
          setToken(null);
        }
      } catch (err) {
        console.error('Error fetching user:', err);
        setToken(null);
      }
    };

    fetchUser();
  }, [token]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={token ? '/dashboard' : '/login'} />}
        />
        <Route
          path="/login"
          element={<Login setToken={setToken} />}
        />
        <Route
          path="/dashboard"
          element={token ? <Dashboard user={user} /> : <Navigate to="/login" />}
        />
        <Route
          path="/mentors"
          element={token ? <MentorList /> : <Navigate to="/login" />}
        />
        <Route
          path="/my-requests"
          element={token ? <MentorRequests /> : <Navigate to="/login" />}
        />
        <Route
          path="/sent-requests"
          element={token ? <MenteeRequests /> : <Navigate to="/login" />}
        />
        <Route
          path="/schedule-session"
          element={
            token && user?.role === 'mentee' ? (
              <ScheduleSession />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />
        <Route
          path="*"
          element={<Navigate to={token ? '/dashboard' : '/login'} />}
        /><Route
  path="/my-sessions"
  element={token ? <MySessions /> : <Navigate to="/login" />}
/>


      </Routes>
    </Router>
  );
};

export default App;
