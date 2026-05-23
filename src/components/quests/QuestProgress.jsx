import styles from "./QuestProgress.module.css";

const QuestProgress = ({ quests }) => {
  // Count how many quests are completed
  const completed = quests.filter((quest) => quest.completed).length;
  const total = quests.length;

  return (
    <div className={styles.progressContainer}>
      <p className={styles.progressText}>
        {completed} out of {total} quests completed today
      </p>
      <progress className={styles.progressBar} value={completed} max={total} />
    </div>
  );
};

export default QuestProgress;