import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import HeroVideo from "./HeroVideo";
import "./HeroSection.css";

const HeroSection = ({ isLoggedIn, currentUser }) => {
// Auth/user data will likely later come from Context,
// global auth state or backend authentication instead of props.

  const [randomText, setRandomText] = useState("");

  const navigate = useNavigate();

  const textLoggedIn = () => {
    const userText = [
      `Welcome back, ${currentUser?.name || "space explorer"}!`,
      `We missed you ${currentUser?.name || "space explorer"}...Ready to continue your cosmic adventure?`,
      `Continue your journey through the cosmos and discover new wonders.`,
      `The universe is vast and full of mysteries waiting to be uncovered by you ${currentUser?.name || "space explorer"}.`,
      `As a member, you have access to exclusive content and features to enhance your space exploration experience.`,
      `Keep reaching for the stars ${currentUser?.name || "space explorer"} and expand your knowledge of the universe.`
    ];
    return userText[Math.floor(Math.random() * userText.length)];
  }

  const textLoggedOut = () => {
    const guestText = [
      `Welcome to our space exploration website!`,
      `Become a part of our community of space enthusiasts and explore the cosmos together.`,
      `In space, no one can hear you scream...`,
      `Unlock the mysteries of the universe and expand your horizons by becoming a member.`,
      `Join us for free and become an expert in all things space-related.`
    ];
    return guestText[Math.floor(Math.random() * guestText.length)];
  }

  useEffect(() => {

    const updateText = () => {
      const newText = isLoggedIn ? textLoggedIn() : textLoggedOut();
      setRandomText(newText);
    }
    updateText();
    const id = setInterval(() => {
    updateText();
    }, 8000);

    return () => clearInterval(id);

  }, [isLoggedIn, currentUser]);



  return (
    <section className="hero-section">

      <div className="hero-video-wrapper">
        <HeroVideo />
      </div>

    <div className="hero-content">
      {isLoggedIn ? (
        <div className="hero-member-content">
          <button
          className="browse-button"
          onClick={() => navigate('/explore')}>Browse our space</button>
        <p className="hero-text">{randomText}</p>
        </div>
      ) : (
        <div className="hero-guest-content">
          <button
          className="join-button"
          onClick={() => navigate('/login')}>Join us in outer space</button>
        <p className="hero-text">{randomText}</p>
        </div>
      )}
    </div>

    </section>
  )
}

export default HeroSection
