import styles from "./DailyQuests.module.css";
import QuestList from "../../components/quests/QuestList";
import QuestProgress from "../../components/quests/QuestProgress";

const DailyQuests = ({ isLoggedIn }) => {
  // Mock data for now - will connect to NASA API later
  const mockQuests = [
    { id: 1, title: "Check today's Astronomy Picture of the Day", points: 10, completed: false },
    { id: 2, title: "Read about Mars", points: 10, completed: false },
    { id: 3, title: "Learn about the International Space Station", points: 10, completed: false },
    { id: 4, title: "Explore the surface of the Moon", points: 10, completed: false },
    { id: 5, title: "Discover a new galaxy", points: 10, completed: false },
  ];

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
      <QuestProgress quests={mockQuests} />
      <QuestList quests={mockQuests} />
    </div>
  );
};

export default DailyQuests;