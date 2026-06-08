import { useEffect, useState } from 'react';
import { fetchApiResource } from '../api.js';

const CODESPACE_ACTIVITIES_URL = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities`
  : null;

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApiResource('activities')
      .then(setActivities)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h2>Activities</h2>
      {loading && <p>Loading activities...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && activities.length === 0 && <p>No activities found.</p>}
      {activities.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Team</th>
              <th>Type</th>
              <th>Duration</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity._id || activity.id || `${activity.user}-${activity.date}`}>
                <td>{activity.user?.name || activity.user || 'Unknown'}</td>
                <td>{activity.team?.name || activity.team || 'N/A'}</td>
                <td>{activity.type || activity.activityType || 'N/A'}</td>
                <td>{activity.duration || activity.minutes || 'N/A'}</td>
                <td>{activity.date || activity.createdAt || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default Activities;
