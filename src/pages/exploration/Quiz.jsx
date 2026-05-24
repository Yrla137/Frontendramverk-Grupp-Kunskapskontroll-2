import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getPlanetById } from "../../services/planetData";
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
};

const Quiz = () => {
  const { planetId } = useParams();
  const [planet, setPlanet] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    getPlanetById(planetId).then(setPlanet);
  }, [planetId]);

  const questions = mockQuestions[planetId];

  if (!planet) {
    return null;
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

  const question = questions[currentQuestion];

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
              className={`${styles.optionButton} ${selectedAnswer === index ? styles.selected : ""}`}
              onClick={() => setSelectedAnswer(index)}
            >
              {option}
            </button>
          ))}
        </div>
      </section>

      <div className={styles.quizActions}>
        {currentQuestion < questions.length - 1 ? (
          <button
            className="btn-primary"
            disabled={selectedAnswer === null}
            onClick={() => {
              setCurrentQuestion((prev) => prev + 1);
              setSelectedAnswer(null);
            }}
          >
            Next
          </button>
        ) : (
          <button className="btn-primary" disabled={selectedAnswer === null}>
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
