import { useEffect, useState } from 'react';
import { fetchApiResource } from '../api.js';

const CODESPACE_USERS_URL = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users`
  : null;

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApiResource('users')
      .then(setUsers)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h2>Users</h2>
      {loading && <p>Loading users...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && users.length === 0 && <p>No users found.</p>}
      {users.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Team</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id || user.id || user.email}>
                <td>{user.name || 'Unknown'}</td>
                <td>{user.email || 'N/A'}</td>
                <td>{user.team?.name || user.team || 'N/A'}</td>
                <td>{user.role || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default Users;
