import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import HeroVideo from "./HeroVideo";
import "./HeroSection.css";

const HeroSection = ({ isLoggedIn, currentUser }) => {
  const [randomText, setRandomText] = useState("");
  const navigate = useNavigate();

  const textLoggedIn = () => {
    const userText = [
      `Welcome back, ${currentUser?.name || "space explorer"}!`,
      `We missed you ${currentUser?.name || "space explorer"}... Ready to continue?`,
      `Continue your journey through the cosmos.`,
      `The universe is waiting for you.`,
      `Keep reaching for the stars ${currentUser?.name || "space explorer"}!`
    ];
    return userText[Math.floor(Math.random() * userText.length)];
  };

  const textLoggedOut = () => {
    const guestText = [
      `Welcome to our space exploration website!`,
      `Join us and explore the cosmos.`,
      `In space, no one can hear you scream...`,
      `Unlock the mysteries of the universe.`,
      `Join us for free and explore space!`
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

  return (
    <section className="hero-section">
      <div className="hero-video-wrapper">
        <HeroVideo />
      </div>

      {isLoggedIn ? (
        <div className="hero-member-content">
          <button
            className="browse-button"
            onClick={() => navigate("/exploration")}
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