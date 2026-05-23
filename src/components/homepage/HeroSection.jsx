import { useState, useEffect } from 'react';

const HeroSection = ({ isLoggedIn, currentUser }) => {
  // Only temporarly using isLoggedIn and currentUser as props for example purposes, will likely be moved to Context or backend-auth later on.

  const [randomText, setRandomText] = useState("");

  const textLoggedIn = () => {
    const userText = [
      `Welcome back, ${currentUser?.name || "space explorer"}!`,
      `We missed you ${currentUser?.name || "space explorer"}...Ready to continue your cosmic adventure?`,
      `Continue your journey through the cosmos and discover new wonders.`,
      `The universe is vast and full of mysteries waiting to be uncovered by you ${currentUser?.name || "space explorer"}.`,
      `As a member, you have access to exclusive content and features to enhance your space exploration experience.`,
      `Keep reaching for the stars ${currentUser?.name || "space explorer"} and expand your knowledge of the universe!`
    ];
    return userText[Math.floor(Math.random() * userText.length)];
  }

  const textLoggedOut = () => {
    const guestText = [
      `Welcome to our space exploration website!`,
      `Become a part of our community of space enthusiasts and explore the cosmos together.`,
      `In space, no one can hear you scream...`,
      `Unlock the mysteries of the universe and expand your horizons by becoming a member.`,
      `Join us for free and become an expert in all things space-related!`
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
  // Will probably be replaced by the real connected user in Context or backend-auth later on,
  // but for now it serves the purpose of showing different text for logged in vs logged out users.



  return (
    <div>
      <h2>Hero Section</h2>
      {isLoggedIn ? (
        <div>
          <button>Browse our space</button>
          <p>{randomText}</p>
        </div>
      ) : (
        <div>
          <button>Join us in outer space</button>
          <p>{randomText}</p>
        </div>
      )}
    </div>
  )
}

export default HeroSection