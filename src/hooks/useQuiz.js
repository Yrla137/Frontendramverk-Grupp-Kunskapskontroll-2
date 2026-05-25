import { useReducer, useEffect } from "react";
import { getPlanetById } from "../services/planetData";
import { getQuizQuestions } from "../services/quizData";

const initialState = {
  planet: null,
  currentQuestion: 0,
  selectedAnswer: null,
  answered: false,
  score: 0,
  showResults: false,
};

const quizReducer = (state, action) => {
  switch (action.type) {
    case "SET_PLANET":
      return { ...state, planet: action.payload };

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
      return { ...initialState, planet: state.planet };

    default:
      return state;
  }
};

const useQuiz = (planetId) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const questions = getQuizQuestions(planetId);
  const question = questions ? questions[state.currentQuestion] : null;
  const isLastQuestion = questions
    ? state.currentQuestion === questions.length - 1
    : false;
  const isCorrect = question
    ? state.selectedAnswer === question.correct
    : false;

  useEffect(() => {
    getPlanetById(planetId).then((p) =>
      dispatch({ type: "SET_PLANET", payload: p })
    );
  }, [planetId]);

  const selectAnswer = (index) => {
    dispatch({ type: "SELECT_ANSWER", payload: index });
  };

  const checkAnswer = () => {
    dispatch({ type: "CHECK_ANSWER", isCorrect });
  };

  const nextQuestion = () => {
    if (isLastQuestion) {
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
