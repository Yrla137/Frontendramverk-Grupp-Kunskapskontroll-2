import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import HeroVideo from "./HeroVideo";
import "./HeroSection.css";

const HeroSection = ({ isLoggedIn, currentUser }) => {
  const [randomText, setRandomText] = useState("");
  const navigate = useNavigate();

  const username =
  currentUser?.username ||
  currentUser?.user?.username ||
  "space explorer";

  const textLoggedIn = () => {
    const userText = [
      `Welcome back, ${username}!`,
      `We missed you ${username}... Ready to continue?`,
      `Continue your journey through the cosmos.`,
      `The universe is waiting for you.`,
      `Keep reaching for the stars ${username}!`,
      `Ready for a quiz?`,
      `Reach for the start ${username} and climb the leaderboard!`
    ];
    return userText[Math.floor(Math.random() * userText.length)];
  };

  const textLoggedOut = () => {
    const guestText = [
      `Welcome to our space exploration website!`,
      `Join and explore the cosmos with us.`,
      `In space, no one can hear you scream...`,
      `Unlock the mysteries of the universe.`,
      `Join us for free and explore space!`,
      `Do you like quests and quizzes?`
    ];
    return guestText[Math.floor(Math.random() * guestText.length)];
  };

  useEffect(() => {
    const updateText = () => {
      const newText = isLoggedIn ? textLoggedIn() : textLoggedOut();
      setRandomText(newText);
    };

    updateText();
    const id = setInterval(updateText, 8000);

    return () => clearInterval(id);
  }, [isLoggedIn, currentUser]);

  useEffect(() => {
  console.log("CURRENT USER:", currentUser);
}, [currentUser]);

  return (
    <section className="hero-section">
      <div className="hero-video-wrapper">
        <HeroVideo />
      </div>

      {isLoggedIn ? (
        <div className="hero-member-content">
          <button
            className="browse-button"
            onClick={() => navigate("/explore")}
          >
            Browse our space
          </button>
          <p>{randomText}</p>
        </div>
      ) : (
        <div className="hero-guest-content">
          <button
            className="join-button"
            onClick={() => navigate("/login")}
          >
            Join us in outer space
          </button>
          <p>{randomText}</p>
        </div>
      )}
    </section>
  );
};

export default HeroSection;