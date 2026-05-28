import { useState } from "react";
import { getDailyQuests } from "../services/questData";
import { usePoints } from "../context/PointsContext";

const useQuests = () => {
  const { addPoints, removePoints } = usePoints();

  const [quests, setQuests] = useState(() => getDailyQuests());

  const handleComplete = (id) => {
    setQuests((prev) => {
      const updated = prev.map((quest) => {
        if (quest.id === id) {
          if (!quest.completed) {
            addPoints(quest.points);
          } else {
            removePoints(quest.points);
          }
          return { ...quest, completed: !quest.completed };
        }
        return quest;
      });

      localStorage.setItem("dailyQuests", JSON.stringify(updated));
      return updated;
    });
  };

  const completed = quests.filter((q) => q.completed).length;
  const total = quests.length;

  return { quests, handleComplete, completed, total };
};

export default useQuests;