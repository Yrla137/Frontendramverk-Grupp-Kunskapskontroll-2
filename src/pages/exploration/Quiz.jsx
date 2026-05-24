import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getPlanetById } from "../../services/planetData";
import LoadingSpinner from "../../components/LoadingSpinner";
import styles from "./Quiz.module.css";

const mockQuestions = {
  mercury: [
    {
      id: 1,
      question: "How long does one day on Mercury last?",
      options: ["24 hours", "59 Earth days", "88 Earth days", "12 hours"],
      correct: 1,
    },
    {
      id: 2,
      question: "How many moons does Mercury have?",
      options: ["1", "2", "0", "3"],
      correct: 2,
    },
  ],
  venus: [
    {
      id: 1,
      question: "What is the surface temperature of Venus?",
      options: ["250°C", "465°C", "180°C", "320°C"],
      correct: 1,
    },
    {
      id: 2,
      question: "How long is a day on Venus compared to its year?",
      options: [
        "Shorter than its year",
        "The same length",
        "Longer than its year",
        "Exactly half its year",
      ],
      correct: 2,
    },
  ],
  earth: [
    {
      id: 1,
      question: "What percentage of Earth's surface is covered in water?",
      options: ["50%", "65%", "71%", "80%"],
      correct: 2,
    },
    {
      id: 2,
      question: "How old is Earth?",
      options: [
        "3.2 billion years",
        "4.54 billion years",
        "5.1 billion years",
        "2.8 billion years",
      ],
      correct: 1,
    },
  ],
  mars: [
    {
      id: 1,
      question: "What is the tallest mountain on Mars called?",
      options: ["Mount Everest", "Olympus Mons", "Valles Marineris", "Elysium Mons"],
      correct: 1,
    },
    {
      id: 2,
      question: "How many moons does Mars have?",
      options: ["0", "1", "2", "4"],
      correct: 2,
    },
  ],
  jupiter: [
    {
      id: 1,
      question: "How many known moons does Jupiter have?",
      options: ["63", "79", "95", "112"],
      correct: 2,
    },
    {
      id: 2,
      question: "What is Jupiter's Great Red Spot?",
      options: [
        "A volcanic crater",
        "A storm larger than Earth",
        "An ocean of liquid hydrogen",
        "A mountain range",
      ],
      correct: 1,
    },
  ],
  saturn: [
    {
      id: 1,
      question: "How many main rings does Saturn have?",
      options: ["3", "5", "7", "9"],
      correct: 2,
    },
    {
      id: 2,
      question: "What is unique about Saturn's density?",
      options: [
        "It is the densest planet",
        "It is less dense than water",
        "It has the same density as Earth",
        "Its density changes with seasons",
      ],
      correct: 1,
    },
  ],
};

const Quiz = () => {
  const { planetId } = useParams();
  const [planet, setPlanet] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    getPlanetById(planetId).then(setPlanet);
  }, [planetId]);

  const questions = mockQuestions[planetId];

  if (!planet) {
    return (
      <div className={styles.quizContainer}>
        <LoadingSpinner message="Loading quiz..." />
      </div>
    );
  }

  if (!questions) {
    return (
      <div className={styles.quizContainer}>
        <Link to={`/explore/${planetId}`} className={styles.backLink}>
          Back to {planet.name}
        </Link>
        <div className="card" style={{ textAlign: "center", padding: "3rem" }}>
          <h2>Quiz Coming Soon</h2>
          <p>The quiz for {planet.name} is not available yet.</p>
        </div>
      </div>
    );
  }

  if (showResults) {
    const percentage = Math.round((score / questions.length) * 100);
    let message = "Keep exploring and try again!";
    if (percentage === 100) message = "Perfect score! You are a true space expert!";
    else if (percentage >= 50) message = "Great job! You know your planets!";

    return (
      <div className={styles.quizContainer}>
        <div className={`${styles.resultsCard} card`}>
          <h2>Quiz Complete!</h2>
          <div
            className={styles.scoreOrb}
            style={{
              backgroundColor: planet.color,
              boxShadow: `0 0 40px ${planet.color}60, 0 0 80px ${planet.color}30`,
            }}
          >
            <span className={styles.scoreText}>
              {score}/{questions.length}
            </span>
          </div>
          <p className={styles.scoreMessage}>{message}</p>
          <div className={styles.resultsActions}>
            <button
              className="btn-primary"
              onClick={() => {
                setCurrentQuestion(0);
                setSelectedAnswer(null);
                setAnswered(false);
                setScore(0);
                setShowResults(false);
              }}
            >
              Retake Quiz
            </button>
            <Link to={`/explore/${planetId}`} className={styles.resultsBackLink}>
              Back to {planet.name}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const isCorrect = selectedAnswer === question.correct;
  const isLastQuestion = currentQuestion === questions.length - 1;

  const handleCheckAnswer = () => {
    setAnswered(true);
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setShowResults(true);
    } else {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    }
  };

  const getOptionClass = (index) => {
    if (!answered) {
      return `${styles.optionButton} ${selectedAnswer === index ? styles.selected : ""}`;
    }
    if (index === question.correct) {
      return `${styles.optionButton} ${styles.correct}`;
    }
    if (selectedAnswer === index) {
      return `${styles.optionButton} ${styles.incorrect}`;
    }
    return `${styles.optionButton} ${styles.dimmed}`;
  };

  return (
    <div className={styles.quizContainer}>
      <Link to={`/explore/${planetId}`} className={styles.backLink}>
        Back to {planet.name}
      </Link>

      <div className={styles.quizHeader}>
        <h2>{planet.name} Quiz</h2>
        <span className={styles.questionCount}>
          Question {currentQuestion + 1} of {questions.length}
        </span>
      </div>

      <section className="card">
        <h3 className={styles.questionText}>{question.question}</h3>
        <div className={styles.optionsGrid}>
          {question.options.map((option, index) => (
            <button
              key={index}
              className={getOptionClass(index)}
              onClick={() => !answered && setSelectedAnswer(index)}
            >
              {option}
            </button>
          ))}
        </div>
        {answered && (
          <div className={styles.feedback}>
            <p className={isCorrect ? styles.feedbackCorrect : styles.feedbackIncorrect}>
              {isCorrect
                ? "Correct!"
                : `Incorrect! The answer is: ${question.options[question.correct]}`}
            </p>
          </div>
        )}
      </section>

      <div className={styles.quizActions}>
        {!answered ? (
          <button
            className="btn-primary"
            disabled={selectedAnswer === null}
            onClick={handleCheckAnswer}
          >
            Check Answer
          </button>
        ) : (
          <button className="btn-primary" onClick={handleNext}>
            {isLastQuestion ? "See Results" : "Next Question"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
