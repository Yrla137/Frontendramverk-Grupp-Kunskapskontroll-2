import { useState, useRef, useEffect } from "react";
import styles from "./AddQuest.module.css";

const AddQuest = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Quest title cannot be empty.");
      return;
    }

    if (title.trim().length < 3) {
      setError("Quest title must be at least 3 characters.");
      return;
    }

    if (title.trim().length > 60) {
      setError("Quest title must be less than 60 characters.");
      return;
    }

    onAdd(title.trim());
    setTitle("");
    setError("");
  };

  return (
    <div className={styles.addQuestContainer}>
      <h3>Create Your Own Quest</h3>
      <form onSubmit={handleSubmit} className={styles.addQuestForm}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter quest title..."
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setError("");
          }}
          className={`${styles.addQuestInput} ${error ? styles.inputError : ""}`}
        />
        <button type="submit" className={styles.addQuestButton}>
          Add Quest
        </button>
      </form>
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};

export default AddQuest;