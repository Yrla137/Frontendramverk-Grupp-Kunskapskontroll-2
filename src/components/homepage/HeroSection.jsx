import { useState } from 'react';

const HeroSection = () => {

  const [randomText, setRandomText] = useState("");

  const textLoggedIn = () => {
    const userText = [
    // Example of how to use currentUser or whatever the backend provides in the text
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


  return (
    <div>
      <h2>Hero Section</h2>
    </div>
  )
}

export default HeroSection