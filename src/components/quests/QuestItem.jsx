import { Link } from "react-router-dom";
import styles from "./QuestItem.module.css";

const QuestItem = ({ quest, onComplete, onDelete }) => {
  return (
    <li className={`${styles.questItem} ${quest.completed ? styles.questItemCompleted : ""}`}>
      <span>{quest.completed ? "✅" : "⬜"}</span>
      <div className={styles.questInfo}>
        <span className={quest.completed ? styles.questTitleCompleted : styles.questTitle}>
          {quest.title}
        </span>
        {quest.link && (
          <Link to={quest.link} className={styles.questLink}>
            Go to {quest.type === "quiz" ? "quiz" : "page"} →
          </Link>
        )}
      </div>
      <span className={styles.questPoints}>{quest.points} pts</span>
      <button
        className={`${styles.completeButton} ${quest.completed ? styles.undoButton : ""}`}
        onClick={() => onComplete(quest.id)}
      >
        {quest.completed ? "Undo" : "Complete"}
      </button>
      <button
        className={styles.deleteButton}
        onClick={() => onDelete(quest.id)}
      >
        ✕
      </button>
    </li>
  );
};

export default QuestItem;