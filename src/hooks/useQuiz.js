import { useReducer, useState, useEffect } from "react";
import { getQuizQuestions } from "../services/quizData";
import usePlanet from "./usePlanet";
import { useExploration } from "../context/ExplorationContext";
import { useAuth } from "../context/AuthContext";

const initialState = {
  currentQuestion: 0,
  selectedAnswer: null,
  answered: false,
  score: 0,
  showResults: false,
};

const quizReducer = (state, action) => {
  switch (action.type) {
    case "SELECT_ANSWER":
      if (state.answered) return state;
      return { ...state, selectedAnswer: action.payload };

    case "CHECK_ANSWER":
      return {
        ...state,
        answered: true,
        score: action.isCorrect ? state.score + 1 : state.score,
      };

    case "NEXT_QUESTION":
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
        selectedAnswer: null,
        answered: false,
      };

    case "SHOW_RESULTS":
      return { ...state, showResults: true };

    case "RESET_QUIZ":
      return { ...initialState };

    default:
      return state;
  }
};

const useQuiz = (planetId) => {
  const { planet, loading: planetLoading, error: planetError } = usePlanet(planetId);
  const { saveQuizScore, quizScores } = useExploration();
  const { currentUser } = useAuth();
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const [questions, setQuestions] = useState(null);
  const [quizLoading, setQuizLoading] = useState(true);
  const [quizError, setQuizError] = useState(null);

  useEffect(() => {
    setQuizLoading(true);
    setQuizError(null);

    getQuizQuestions(planetId)
      .then((data) => {
        setQuestions(data);
        setQuizLoading(false);
      })
      .catch((err) => {
        setQuizError(err.message || "Failed to load quiz questions");
        setQuizLoading(false);
      });
  }, [planetId]);

  const loading = planetLoading || quizLoading;
  const error = planetError || quizError;
  const question = questions ? questions[state.currentQuestion] : null;
  const isLastQuestion = questions
    ? state.currentQuestion === questions.length - 1
    : false;
  const isCorrect = question
    ? state.selectedAnswer === question.correct
    : false;

  const selectAnswer = (index) => {
    dispatch({ type: "SELECT_ANSWER", payload: index });
  };

  const checkAnswer = () => {
    dispatch({ type: "CHECK_ANSWER", isCorrect });
  };

  const nextQuestion = () => {
    if (isLastQuestion) {
      const previousBest = quizScores[planetId]?.score || 0;
      const improvement = Math.max(0, state.score - previousBest);

      saveQuizScore(planetId, state.score, questions.length);

      if (currentUser && improvement > 0) {
        fetch("http://localhost:5000/api/progress/quiz", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: currentUser.id,
            planetId,
            pointsToAward: improvement * 10,
          }),
        }).catch(() => {});
      }

      dispatch({ type: "SHOW_RESULTS" });
    } else {
      dispatch({ type: "NEXT_QUESTION" });
    }
  };

  const resetQuiz = () => {
    dispatch({ type: "RESET_QUIZ" });
  };

  return {
    ...state,
    planet,
    loading,
    error,
    questions,
    question,
    isLastQuestion,
    isCorrect,
    selectAnswer,
    checkAnswer,
    nextQuestion,
    resetQuiz,
  };
};

export default useQuiz;
