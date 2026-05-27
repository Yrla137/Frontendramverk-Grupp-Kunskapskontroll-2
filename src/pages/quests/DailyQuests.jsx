import styles from "./DailyQuests.module.css";
import QuestList from "../../components/quests/QuestList";
import QuestProgress from "../../components/quests/QuestProgress";
import useNasaApod from "../../hooks/useNasaApod";
import useQuests from "../../hooks/useQuests";
import { usePoints } from "../../context/PointsContext";

const DailyQuests = ({ isLoggedIn }) => {
  const { apod, loading, error } = useNasaApod();
  const { quests, handleComplete } = useQuests();
  const { points } = usePoints();

  if (!isLoggedIn) {
    return (
      <div className={styles.lockedContainer}>
        <h2>Daily Quests 🚀</h2>
        <p>You need to log in to access Daily Quests.</p>
      </div>
    );
  }

  return (
    <div className={styles.questsContainer}>
      <h1>Daily Quests 🚀</h1>
      <div className={styles.pointsDisplay}>
        <p>Total Points: {points}</p>
      </div>
      <QuestProgress quests={quests} />
      <QuestList quests={quests} onComplete={handleComplete} />

      {loading && (
        <div className={styles.loadingContainer}>
          <p>Loading today&apos;s space content...</p>
        </div>
      )}

      {error && (
        <div className={styles.errorContainer}>
          <p>Something went wrong: {error}</p>
        </div>
      )}

      {apod && (
        <div className={styles.apodSection}>
          <h2>Today&apos;s Astronomy Picture</h2>
          <h3>{apod.title}</h3>
          <img
            className={styles.apodImage}
            src={apod.url}
            alt={apod.title}
          />
          <p className={styles.apodDescription}>{apod.explanation}</p>
          <p className={styles.apodDate}>{apod.date}</p>
        </div>
      )}
    </div>
  );
};

export default DailyQuests;