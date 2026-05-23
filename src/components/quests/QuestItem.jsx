const QuestItem = ({ quest }) => {
  return (
    <li>
      <span>{quest.title}</span>
      <span>{quest.points} pts</span>
      <span>{quest.completed ? "✅" : "⬜"}</span>
    </li>
  );
};

export default QuestItem;