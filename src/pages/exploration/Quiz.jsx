import { useParams, Link } from "react-router-dom";
import useQuiz from "../../hooks/useQuiz";
import LoadingSpinner from "../../components/LoadingSpinner";
import styles from "./Quiz.module.css";

const Quiz = () => {
  const { planetId } = useParams();
  const {
    planet,
    currentQuestion,
    selectedAnswer,
    answered,
    score,
    showResults,
    questions,
    question,
    isLastQuestion,
    isCorrect,
    selectAnswer,
    checkAnswer,
    nextQuestion,
    resetQuiz,
  } = useQuiz(planetId);

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
            <button className="btn-primary" onClick={resetQuiz}>
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
              onClick={() => selectAnswer(index)}
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
            onClick={checkAnswer}
          >
            Check Answer
          </button>
        ) : (
          <button className="btn-primary" onClick={nextQuestion}>
            {isLastQuestion ? "See Results" : "Next Question"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
