import HeroSection from "../../components/homepage/HeroSection";
// import ExtraSection from "../../components/homepage/ExtraSection";

import "./HomePage.css";
import "../../index.css";

const HomePage = ({ isLoggedIn }) => {

  return (

    <div>

      <div className="hero-section-container">
        <HeroSection
        isLoggedIn={isLoggedIn}/>
      </div>

      <div>
        {/* <ExtraSection /> */}
      </div>

    </div>
  );
};

export default HomePage;