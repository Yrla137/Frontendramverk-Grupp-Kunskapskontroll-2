import QuestItem from "./QuestItem";

const QuestList = ({ quests }) => {
  return (
    <ul>
      {quests.map((quest) => (
        <QuestItem key={quest.id} quest={quest} />
      ))}
    </ul>
  );
};

export default QuestList;