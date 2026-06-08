import { useEffect, useState } from 'react';
import { fetchApiResource } from '../api.js';

const CODESPACE_TEAMS_URL = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams`
  : null;

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApiResource('teams')
      .then(setTeams)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h2>Teams</h2>
      {loading && <p>Loading teams...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && teams.length === 0 && <p>No teams found.</p>}
      {teams.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Members</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => (
              <tr key={team._id || team.id || team.name}>
                <td>{team.name || 'Unknown'}</td>
                <td>{Array.isArray(team.members) ? team.members.length : 'N/A'}</td>
                <td>{team.role || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default Teams;
