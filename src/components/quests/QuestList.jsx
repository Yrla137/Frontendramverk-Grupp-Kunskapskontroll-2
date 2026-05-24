import QuestItem from "./QuestItem";

const QuestList = ({ quests, onComplete }) => {
  return (
    <ul>
      {quests.map((quest) => (
        <QuestItem key={quest.id} quest={quest} onComplete={onComplete} />
      ))}
    </ul>
  );
};

export default QuestList;