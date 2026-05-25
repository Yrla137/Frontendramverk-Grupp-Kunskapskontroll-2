import styles from "./App.module.css";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import useSearch from "./hooks/useSearch";
import { PointsProvider } from "./context/PointsContext";
import { ExplorationProvider } from "./context/ExplorationContext";

import HomePage from "./pages/homepage/HomePage";
import Profile from "./pages/profile/Profile";
import DailyQuests from "./pages/quests/DailyQuests";
import Exploration from "./pages/exploration/Exploration";
import PlanetDetail from "./pages/exploration/PlanetDetail";
import Quiz from "./pages/exploration/Quiz";
import Leaderboard from "./pages/exploration/Leaderboard";

import NavBar from "./components/NavBar";
import SearchBar from "./components/search/SearchBar";
import SearchResults from "./components/search/SearchResults";

const App = () => {

  // Auth state //
  // Temporary local auth.
  const [isLoggedIn] = useState(false);


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


  return (
    <PointsProvider>
      <div className={styles.appContainer}>

        <header className={styles.navbar}>
          <h1>Space-Quiz</h1>
        </header>

        <div className={styles.navbar}>
          <NavBar
            isLoggedIn={isLoggedIn}
          />
        </div>

        <div className={styles.searchbar}>
          <SearchBar
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

        <div className={styles.searchResultsContainer}>
          <SearchResults
            filteredData={filteredData}
            hasSearched={hasSearched}
            loadingSearch={loadingSearch}
            errorSearch={errorSearch}
            onRetry={onRetry}
            isLoggedIn={isLoggedIn}
          />
        </div>


        <main className={styles.mainContent}>
          <ExplorationProvider>
            <Routes>
              <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} />} />
              <Route path="/explore" element={<Exploration />} />
              <Route path="/explore/leaderboard" element={<Leaderboard />} />
              <Route path="/explore/:planetId" element={<PlanetDetail />} />
              <Route path="/explore/:planetId/quiz" element={<Quiz />} />
              <Route path="/quests" element={<DailyQuests isLoggedIn={isLoggedIn} />} />
              <Route path="/profile/:id" element={<Profile />} />
            </Routes>
          </ExplorationProvider>
        </main>

      </div>
    </PointsProvider>
  );
}

export default App;