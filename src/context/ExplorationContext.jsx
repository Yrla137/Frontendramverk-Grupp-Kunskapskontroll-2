import { createContext, useContext, useState, useEffect } from "react";

const ExplorationContext = createContext();

const STORAGE_KEY = "exploration-progress";

const loadFromStorage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    
  }
  return { visitedPlanets: [], quizScores: {} };
};

const TOTAL_PLANETS = 12;

export const ExplorationProvider = ({ children }) => {
  const [visitedPlanets, setVisitedPlanets] = useState(
    () => loadFromStorage().visitedPlanets
  );
  const [quizScores, setQuizScores] = useState(
    () => loadFromStorage().quizScores
  );

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ visitedPlanets, quizScores })
    );
  }, [visitedPlanets, quizScores]);

  const markVisited = (planetId) => {
    setVisitedPlanets((prev) =>
      prev.includes(planetId) ? prev : [...prev, planetId]
    );
  };

  const saveQuizScore = (planetId, score, total) => {
    setQuizScores((prev) => {
      const existing = prev[planetId];
      if (existing && existing.score >= score) return prev;
      return { ...prev, [planetId]: { score, total } };
    });
  };

  const resetProgress = () => {
    setVisitedPlanets([]);
    setQuizScores({});
  };

  const exploredCount = visitedPlanets.length;
  const quizzesCompleted = Object.keys(quizScores).length;
  const exploredPercentage = Math.round((exploredCount / TOTAL_PLANETS) * 100);
  const quizPercentage = Math.round((quizzesCompleted / TOTAL_PLANETS) * 100);

  return (
    <ExplorationContext.Provider
      value={{
        visitedPlanets,
        quizScores,
        markVisited,
        saveQuizScore,
        resetProgress,
        exploredCount,
        quizzesCompleted,
        exploredPercentage,
        quizPercentage,
      }}
    >
      {children}
    </ExplorationContext.Provider>
  );
};

export const useExploration = () => {
  const context = useContext(ExplorationContext);
  if (!context) {
    throw new Error("useExploration requires ExplorationProvider");
  }
  return context;
};
