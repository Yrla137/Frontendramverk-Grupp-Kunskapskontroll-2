import { Link } from "react-router-dom";
import styles from "./Leaderboard.module.css";

const mockLeaderboard = [
  { rank: 1, username: "test", points: 2850, quizzesCompleted: 10 },
  { rank: 2, username: "test2", points: 2340, quizzesCompleted: 8 },
  { rank: 3, username: "test3", points: 1890, quizzesCompleted: 7 },
  { rank: 4, username: "test4", points: 1250, quizzesCompleted: 4 },
  { rank: 5, username: "test5", points: 980, quizzesCompleted: 3 },
];

const Leaderboard = () => {
  return (
    <div className={styles.leaderboardContainer}>
      <Link to="/explore" className={styles.backLink}>
        Back to Solar System
      </Link>

      <h2>Leaderboard</h2>
      <p>Top explorers ranked by quiz points.</p>

      <section className="card">
        <table className={styles.leaderboardTable}>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Explorer</th>
              <th>Points</th>
              <th>Quizzes</th>
            </tr>
          </thead>
          <tbody>
            {mockLeaderboard.map((entry) => (
              <tr key={entry.rank}>
                <td className={styles.rank}>{entry.rank}</td>
                <td>{entry.username}</td>
                <td className={styles.points}>{entry.points}</td>
                <td>{entry.quizzesCompleted}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Leaderboard;
