import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllPlanets, getExplorationProgress } from "../../services/planetData";
import PlanetCard from "../../components/exploration/PlanetCard";
import styles from "./Exploration.module.css";

const Exploration = () => {
  const [planets, setPlanets] = useState([]);
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    getAllPlanets().then(setPlanets);
    getExplorationProgress().then(setProgress);
  }, []);

  return (
    <div className={styles.explorationContainer}>
      <section className={styles.header}>
        <h2>Explore the Solar System</h2>
        <p>Select a celestial body to learn more about it and test your knowledge.</p>
        {progress && (
          <div className={styles.progressBar}>
            <div className={styles.progressInfo}>
              <span>{progress.exploredPercentage}% Explored</span>
              <span>{progress.quizPercentage}% Quizzes Completed</span>
            </div>
            <div className={styles.progressTrack}>
              <div
                className={styles.progressFill}
                style={{ width: `${progress.exploredPercentage}%` }}
              />
            </div>
          </div>
        )}
      </section>

      <section className={styles.planetGrid}>
        {planets.map((planet) => (
          <PlanetCard key={planet.id} planet={planet} />
        ))}
      </section>

      <section className={styles.actions}>
        <Link to="/explore/leaderboard" className={styles.leaderboardLink}>
          View Leaderboard
        </Link>
      </section>
    </div>
  );
};

export default Exploration;
