import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { getAllPlanets } from "../../services/planetData";
import { useExploration } from "../../context/ExplorationContext";
import PlanetCard from "../../components/exploration/PlanetCard";
import styles from "./Exploration.module.css";

const Exploration = () => {
  const [planets, setPlanets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [validationError, setValidationError] = useState("");
  const { exploredPercentage, quizPercentage } = useExploration();
  const searchRef = useRef(null);

  useEffect(() => {
    getAllPlanets().then(setPlanets);
    searchRef.current.focus();
  }, []);

  const filteredPlanets = planets.filter((planet) =>
    planet.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;

    if (value && !/^[a-zA-Z\s]*$/.test(value)) {
      setValidationError("Planet names only contain letters");
    } else {
      setValidationError("");
    }

    setSearchTerm(value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (validationError) 
      return;
  };

  return (
    <div className={styles.explorationContainer}>
      <section className={styles.header}>
        <h2>Explore the Solar System</h2>
        <p>Select a celestial body to learn more about it and test your knowledge.</p>
        <div className={styles.progressBar}>
          <div className={styles.progressInfo}>
            <span>{exploredPercentage}% Explored</span>
            <span>{quizPercentage}% Quizzes Completed</span>
          </div>
          <div className={styles.progressTrack}>
            <div
              className={styles.progressFill}
              style={{ width: `${exploredPercentage}%` }}
            />
          </div>
        </div>

        <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
          <input
            ref={searchRef}
            type="text"
            placeholder="Filter planets"
            value={searchTerm}
            onChange={handleSearchChange}
            className={`${styles.searchInput} ${validationError ? styles.searchInputError : ""}`}
          />
          {validationError && (
            <p className={styles.validationError}>{validationError}</p>
          )}
        </form>
      </section>

      <section className={styles.planetGrid}>
        {filteredPlanets.length > 0 ? (
          filteredPlanets.map((planet) => (
            <PlanetCard key={planet.id} planet={planet} />
          ))
        ) : (
          <p className={styles.noResults}>No planets match "{searchTerm}"</p>
        )}
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
