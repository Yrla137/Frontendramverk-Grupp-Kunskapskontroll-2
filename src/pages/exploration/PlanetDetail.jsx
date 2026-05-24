import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getPlanetById } from "../../services/planetData";
import LoadingSpinner from "../../components/LoadingSpinner";
import styles from "./PlanetDetail.module.css";

const PlanetDetail = () => {
  const { planetId } = useParams();
  const [planet, setPlanet] = useState(null);

  useEffect(() => {
    getPlanetById(planetId).then(setPlanet);
  }, [planetId]);

  if (!planet) {
    return (
      <div className={styles.detailContainer}>
        <LoadingSpinner message="Loading planet..." />
      </div>
    );
  }

  return (
    <div className={styles.detailContainer}>
      <Link to="/explore" className={styles.backLink}>
        Back to Solar System
      </Link>

      <section className={`${styles.heroSection} card`}>
        <div
          className={styles.heroOrb}
          style={{
            backgroundColor: planet.color,
            boxShadow: `0 0 40px ${planet.color}60, 0 0 80px ${planet.color}30`,
          }}
        />
        <div className={styles.heroInfo}>
          <span className={styles.typeLabel}>{planet.type}</span>
          <h1>{planet.name}</h1>
          <p className={styles.tagline}>{planet.tagline}</p>
        </div>
      </section>

      <section className="card">
        <h3>About</h3>
        <p>{planet.description}</p>
      </section>

      <section className="card">
        <h3>Quick Facts</h3>
        <div className={styles.factsGrid}>
          {planet.facts.map((fact) => (
            <div key={fact.label} className={styles.factItem}>
              <span className={styles.factLabel}>{fact.label}</span>
              <span className={styles.factValue}>{fact.value}</span>
            </div>
          ))}
          {planet.diameter && (
            <div className={styles.factItem}>
              <span className={styles.factLabel}>Diameter</span>
              <span className={styles.factValue}>{planet.diameter}</span>
            </div>
          )}
          {planet.distanceFromSun && (
            <div className={styles.factItem}>
              <span className={styles.factLabel}>Distance from Sun</span>
              <span className={styles.factValue}>{planet.distanceFromSun}</span>
            </div>
          )}
        </div>
      </section>

      <section className={styles.quizSection}>
        <Link to={`/explore/${planet.id}/quiz`} className={styles.quizLink}>
          {planet.quizCompleted ? "Retake Quiz" : "Start Quiz"}
        </Link>
      </section>
    </div>
  );
};

export default PlanetDetail;
