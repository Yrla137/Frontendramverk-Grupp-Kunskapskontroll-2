import styles from "./App.module.css";
import { Routes, Route } from "react-router-dom";
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

import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Inner component to safely consume AuthContext
const AppContent = () => {
  const { isLoggedIn } = useAuth();
  
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

        <header className={styles.header}>
          <h1>Astro Wave</h1>
        </header>

        <div className={styles.navbar}>
          <NavBar isLoggedIn={isLoggedIn} />
        </div>

        <div className={styles.searchbar}>
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onSearch={onSearch}
            isLoggedIn={isLoggedIn}
            loadingSearch={loadingSearch}
            errorSearch={errorSearch}
            searchHistory={searchHistory}
            fillSearchBarInput={fillSearchBarInput}
            deleteSearchHistoryItem={deleteSearchHistoryItem}
            deleteAllSearchHistory={deleteAllSearchHistory}
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
              {/* Public Route */}
              <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} />} />
              
              {/* Protected Exploration Routes */}
              <Route path="/explore" element={
                <ProtectedRoute>
                  <Exploration />
                </ProtectedRoute>
              } />
              <Route path="/explore/leaderboard" element={
                <ProtectedRoute>
                  <Leaderboard />
                </ProtectedRoute>
              } />
              <Route path="/explore/:planetId" element={
                <ProtectedRoute>
                  <PlanetDetail />
                </ProtectedRoute>
              } />
              <Route path="/explore/:planetId/quiz" element={
                <ProtectedRoute>
                  <Quiz />
                </ProtectedRoute>
              } />
              
              {/* Protected Route for Quests */}
              <Route path="/quests" element={
                <ProtectedRoute>
                  <DailyQuests isLoggedIn={isLoggedIn} />
                </ProtectedRoute>
              } />
              
              {/* Shows Login if not logged in */}
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </ExplorationProvider>
        </main>

      </div>
    </PointsProvider>
  );
};

// Main App wrapper
const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;