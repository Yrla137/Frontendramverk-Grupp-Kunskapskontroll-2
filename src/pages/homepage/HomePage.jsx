import Searchbar from "../src/components/search/Searchbar";
import SearchResults from "../src/components/search/SearchResults";
import NavBar from "../src/components/homepage/NavBar";
import HeroSection from "../src/components/homepage/HeroSection";

import "./HomePage.css";
import "../../index.css";

import { useState } from "react";
import useSearch from "../../hooks/useSearch";


// import WhyJoinUs from "/"
// import PopularTopics from "/"

const HomePage = () => {

  // Auth state //
  // Tillfällig lokal auth.
  // Flyttas troligen senare till App.jsx, Context eller backend-auth.
  const [isLoggedIn] = useState(false);

  // const [currentUser, setCurrentUser] = useState(null);
  // const isLoggedIn = !!currentUser;


  // Search system //
  const {
    searchTerm,
    setSearchTerm,
    filteredData,
    hasSearched,
    searchHistory,
    loadingSearch,
    errorSearch,
    onSearch,
    onRetry,
    fillSearchBarInput,
    deleteSearchHistoryItem,
    deleteAllSearchHistory
  } = useSearch();

  
// useEffect(() => {
// check token / user for auth
// }, []);


  return (

    <div>

      <div className="navbar-container">
        <NavBar
        isLoggedIn={isLoggedIn}/>
      </div>



      <div className="searchbar-container">
        <Searchbar
          // Search state //
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}

          // Search functions //
          onSearch={onSearch}

          // Auth state //
          isLoggedIn={isLoggedIn}

          // Search loading & error state //
          loadingSearch={loadingSearch}
          errorSearch={errorSearch}

          // Search history state & functions //
          searchHistory={searchHistory}
          fillSearchBarInput={fillSearchBarInput}
          deleteSearchHistoryItem={deleteSearchHistoryItem}
          deleteAllSearchHistory={deleteAllSearchHistory}
          // Retry function for search history items //
          onRetry={onRetry}
        />
      </div>



      <div className="hero-section-container">
        <HeroSection
        isLoggedIn={isLoggedIn}/>
      </div>



      <div className="search-results-container">
        <SearchResults
          filteredData={filteredData}
          hasSearched={hasSearched}

          loadingSearch={loadingSearch}
          errorSearch={errorSearch}

          onRetry={onRetry}

          isLoggedIn={isLoggedIn}
        />
      </div>



      <div>
        <h2>Extra section</h2>
      </div>

    </div>
  );
};

export default HomePage;