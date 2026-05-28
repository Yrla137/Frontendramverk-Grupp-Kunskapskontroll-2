import QuestItem from "./QuestItem";

const QuestList = ({ quests, onComplete, onDelete }) => {
  return (
    <ul>
      {quests.map((quest) => (
        <QuestItem key={quest.id} quest={quest} onComplete={onComplete} onDelete={onDelete} />
      ))}
    </ul>
  );
};

export default QuestList;