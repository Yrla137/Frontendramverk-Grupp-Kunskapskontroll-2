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

  // Create - add a custom quest
  const addQuest = (title) => {
    const newQuest = {
      id: Date.now(),
      title,
      points: 10,
      type: "custom",
      completed: false,
    };

    setQuests((prev) => {
      const updated = [...prev, newQuest];
      localStorage.setItem("dailyQuests", JSON.stringify(updated));
      return updated;
    });
  };

  // Delete - remove a quest
  const deleteQuest = (id) => {
    setQuests((prev) => {
      const quest = prev.find((q) => q.id === id);
      if (quest && quest.completed) {
        removePoints(quest.points);
      }

      const updated = prev.filter((q) => q.id !== id);
      localStorage.setItem("dailyQuests", JSON.stringify(updated));
      return updated;
    });
  };

  const completed = quests.filter((q) => q.completed).length;
  const total = quests.length;

  return { quests, handleComplete, addQuest, deleteQuest, completed, total };
};

export default useQuests;