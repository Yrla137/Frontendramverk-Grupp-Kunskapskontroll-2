import { Link } from "react-router-dom";
import styles from "./PlanetCard.module.css";

const PlanetCard = ({ planet }) => {
  return (
    <Link
      to={`/explore/${planet.id}`}
      className={`${styles.planetCard} ${planet.explored ? styles.explored : ""} card`}
    >
      <div
        className={styles.planetOrb}
        style={{
          backgroundColor: planet.color,
          boxShadow: `0 0 20px ${planet.color}40`,
        }}
      />
      <h3 className={styles.planetName}>{planet.name}</h3>
      <span className={styles.planetType}>{planet.type}</span>
      <p className={styles.planetTagline}>{planet.tagline}</p>
      {planet.explored && (
        <span className={styles.exploredBadge}>Explored</span>
      )}
    </Link>
  );
};

export default PlanetCard;
