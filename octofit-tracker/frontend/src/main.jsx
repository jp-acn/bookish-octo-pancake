import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Users from './components/Users.jsx';
import Teams from './components/Teams.jsx';
import Activities from './components/Activities.jsx';
import Workouts from './components/Workouts.jsx';
import Leaderboard from './components/Leaderboard.jsx';

function Home() {
  return (
    <section>
      <h2>Welcome to Octofit Tracker</h2>
      <p>
        Browse users, teams, workouts, activities, and leaderboard data using the
        API-backed React UI.
      </p>
    </section>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="users" element={<Users />} />
          <Route path="teams" element={<Teams />} />
          <Route path="activities" element={<Activities />} />
          <Route path="workouts" element={<Workouts />} />
          <Route path="leaderboard" element={<Leaderboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
