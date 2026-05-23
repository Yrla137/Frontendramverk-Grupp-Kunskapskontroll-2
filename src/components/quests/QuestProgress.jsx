const QuestProgress = ({ quests }) => {
  // Count how many quests are completed
  const completed = quests.filter((quest) => quest.completed).length;
  const total = quests.length;

  return (
    <div>
      <p>{completed} out of {total} quests completed today</p>
      <progress value={completed} max={total} />
    </div>
  );
};

export default QuestProgress;