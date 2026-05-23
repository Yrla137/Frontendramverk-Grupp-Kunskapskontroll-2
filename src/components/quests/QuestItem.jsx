import styles from "./QuestItem.module.css";

const QuestItem = ({ quest, onComplete }) => {
  return (
    <li className={`${styles.questItem} ${quest.completed ? styles.questItemCompleted : ""}`}>
      <span>{quest.completed ? "✅" : "⬜"}</span>
      <span className={quest.completed ? styles.questTitleCompleted : styles.questTitle}>
        {quest.title}
      </span>
      <span className={styles.questPoints}>{quest.points} pts</span>
      <button
        className={`${styles.completeButton} ${quest.completed ? styles.undoButton : ""}`}
        onClick={() => onComplete(quest.id)}
      >
        {quest.completed ? "Undo" : "Complete"}
      </button>
    </li>
  );
};

export default QuestItem;