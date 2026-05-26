import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./Leaderboard.module.css";

const Leaderboard = () => {
  const { currentUser } = useAuth();
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users");
        if (!response.ok) 
          throw new Error("Failed to fetch leaderboard");

        const users = await response.json();

        const sorted = users.sort((a, b) => b.points - a.points).map((user, index) => ({ ...user, rank: index + 1 }));

        setLeaderboard(sorted);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className={styles.leaderboardContainer}>
      <Link to="/explore" className={styles.backLink}>
        Back to Solar System
      </Link>

      <h2>Leaderboard</h2>
      <p>Top explorers ranked by points.</p>

      {loading && <p>Loading leaderboard...</p>}
      {error && <p className={styles.error}>Could not load leaderboard: {error}</p>}

      {!loading && !error && (
        <section className="card">
          <table className={styles.leaderboardTable}>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Explorer</th>
                <th>Points</th>
                <th>Streak</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry) => (
                <tr
                  key={entry.id}
                  className={
                    currentUser && currentUser.id === entry.id ? styles.currentUser : undefined
                  }
                >
                  <td className={styles.rank}>{entry.rank}</td>
                  <td>{entry.username}</td>
                  <td className={styles.points}>{entry.points}</td>
                  <td>{entry.streak_count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </div>
  );
};

export default Leaderboard;