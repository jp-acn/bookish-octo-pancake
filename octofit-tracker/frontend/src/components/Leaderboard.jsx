import { useEffect, useState } from 'react';
import { fetchApiResource } from '../api.js';

const CODESPACE_LEADERBOARD_URL = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard`
  : null;

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApiResource('leaderboard')
      .then(setEntries)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h2>Leaderboard</h2>
      {loading && <p>Loading leaderboard...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && entries.length === 0 && <p>No leaderboard entries available.</p>}
      {entries.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry._id || entry.id || entry.rank}>
                <td>{entry.rank || '—'}</td>
                <td>{entry.name || entry.player || 'Unknown'}</td>
                <td>{entry.score || entry.points || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default Leaderboard;
