
import Searchbar from "../src/components/search/Searchbar";
import SearchResults from "../src/components/search/SearchResults";
import NavBar from "../src/components/homepage/NavBar";
import HeroSection from "../src/components/homepage/HeroSection";

import "./HomePage.css";


// import WhyJoinUs from "/"
// import PopularTopics from "/"

const HomePage = () => {


  return (

    <div>

      <div className="navbar-container">
        <NavBar/>
      </div>



      <div className="searchbar-container">
        <Searchbar/>
      </div>



      <div className="hero-section-container">
        <HeroSection/>
      </div>



      <div className="search-results-container">
        <SearchResults/>
      </div>



      <div>
        <h2>Extra section</h2>
      </div>

    </div>
  );
};

export default HomePage;