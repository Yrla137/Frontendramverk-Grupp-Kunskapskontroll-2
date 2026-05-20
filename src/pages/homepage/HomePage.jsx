
import Searchbar from "../../components/Searchbar/Searchbar";
import SearchResults from "../../components/SearchResults/SearchResults";
import NavBar from "../../components/Navbar/Navbar";
import HeroSection from "../../components/HeroSection/HeroSection";

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

        <div>
        </div>

        <div>
        </div>

      </div>

    </div>
  );
};

export default HomePage;