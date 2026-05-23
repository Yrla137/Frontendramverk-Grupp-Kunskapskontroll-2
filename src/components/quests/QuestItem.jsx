const QuestItem = ({ quest, onComplete }) => {
  return (
    <li>
      <span>{quest.completed ? "✅" : "⬜"}</span>
      <span>{quest.title}</span>
      <span>{quest.points} pts</span>
      <button onClick={() => onComplete(quest.id)}>
        {quest.completed ? "Undo" : "Complete"}
      </button>
    </li>
  );
};

export default QuestItem;