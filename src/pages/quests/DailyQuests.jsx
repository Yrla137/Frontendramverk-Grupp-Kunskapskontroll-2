import { useState } from "react";
import styles from "./DailyQuests.module.css";
import QuestList from "../../components/quests/QuestList";
import QuestProgress from "../../components/quests/QuestProgress";
import useNasaApod from "../../hooks/useNasaApod";

const DailyQuests = ({ isLoggedIn }) => {
  const { apod, loading, error } = useNasaApod();

  const [quests, setQuests] = useState([
    { id: 1, title: "Check today's Astronomy Picture of the Day", points: 10, completed: false },
    { id: 2, title: "Read about Mars", points: 10, completed: false },
    { id: 3, title: "Learn about the International Space Station", points: 10, completed: false },
    { id: 4, title: "Explore the surface of the Moon", points: 10, completed: false },
    { id: 5, title: "Discover a new galaxy", points: 10, completed: false },
  ]);

  const handleComplete = (id) => {
    setQuests(quests.map((quest) =>
      quest.id === id ? { ...quest, completed: !quest.completed } : quest
    ));
  };

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