import { createContext, useContext, useReducer, useEffect } from "react";

const ExplorationContext = createContext();

const STORAGE_KEY = "exploration-progress";

const loadFromStorage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch { /* empty */ }
  return { visitedPlanets: [], quizScores: {} };
};

const TOTAL_PLANETS = 12;

// Reducer
const explorationReducer = (state, action) => {
  switch (action.type) {
    case "MARK_VISITED":
      // do nothi8ng if planet is already explored
      if (state.visitedPlanets.includes(action.payload)) return state;
      // otherwise, add to list
      return { 
        ...state, 
        visitedPlanets: [...state.visitedPlanets, action.payload] 
      };

    case "SAVE_QUIZ_SCORE": {
      const { planetId, score, total } = action.payload;
      const existing = state.quizScores[planetId];

      // update if poinits are the same or better
      if (existing && existing.score >= score) return state;
      return { 
        ...state, 
        quizScores: { ...state.quizScores, [planetId]: { score, total } } 
      };
    }

    case "RESET_PROGRESS":
      return { visitedPlanets: [], quizScores: {} };

    default:
      return state;
  }
};

export const ExplorationProvider = ({ children }) => {

  const [state, dispatch] = useReducer(explorationReducer, loadFromStorage());

  // still using localStorage
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ 
        visitedPlanets: state.visitedPlanets, 
        quizScores: state.quizScores 
      })
    );
  }, [state.visitedPlanets, state.quizScores]);

  // dispatch instead of setState
  const markVisited = (planetId) => {
    dispatch({ type: "MARK_VISITED", payload: planetId });
  };

  const saveQuizScore = (planetId, score, total) => {
    dispatch({ type: "SAVE_QUIZ_SCORE", payload: { planetId, score, total } });
  };

  const resetProgress = () => {
    dispatch({ type: "RESET_PROGRESS" });
  };

  const exploredCount = state.visitedPlanets.length;
  const quizzesCompleted = Object.keys(state.quizScores).length;
  const exploredPercentage = Math.round((exploredCount / TOTAL_PLANETS) * 100);
  const quizPercentage = Math.round((quizzesCompleted / TOTAL_PLANETS) * 100);

  return (
    <ExplorationContext.Provider
      value={{
        visitedPlanets: state.visitedPlanets,
        quizScores: state.quizScores,
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