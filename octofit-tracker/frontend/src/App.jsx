import { NavLink, Outlet } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <h1>Octofit Tracker</h1>
          <p>Multi-tier React UI with Codespaces-friendly API routing.</p>
        </div>
        <nav>
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/users">Users</NavLink>
          <NavLink to="/teams">Teams</NavLink>
          <NavLink to="/activities">Activities</NavLink>
          <NavLink to="/workouts">Workouts</NavLink>
          <NavLink to="/leaderboard">Leaderboard</NavLink>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <p>
          API base: <code>{import.meta.env.VITE_CODESPACE_NAME ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api` : 'http://localhost:8000/api'}</code>
        </p>
        <p>
          Define <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> when running inside GitHub Codespaces.
        </p>
      </footer>
    </div>
  );
}

export default App;
