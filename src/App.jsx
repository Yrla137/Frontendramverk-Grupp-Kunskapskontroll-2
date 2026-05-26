import styles from "./App.module.css";
import { Routes, Route } from "react-router-dom";

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

// SEARCH HOOKS
import { useSearchResults } from "./hooks/search/useSearchResults";
import { useSearchHistory } from "./hooks/search/useSearchHistory";

// Inner component to safely consume AuthContext
const AppContent = () => {
  const { isLoggedIn, currentUser } = useAuth();

  // HISTORY (backend)
  const history = useSearchHistory(isLoggedIn, currentUser);

  // SEARCH (backend + history integration)
  const search = useSearchResults(
    history.addSearchToHistory,
    isLoggedIn,
    currentUser
  );

  return (
    <PointsProvider>
      <div className={styles.appContainer}>

        <header className={styles.header}>
          <h1>Astro Wave</h1>
        </header>

        <div className={styles.navbar}>
          <NavBar isLoggedIn={isLoggedIn} />
        </div>

        {/* SEARCH BAR (GLOBAL) */}
        <div className={styles.searchbar}>
          <SearchBar
            searchTerm={search.searchTerm}
            setSearchTerm={search.setSearchTerm}
            isLoggedIn={isLoggedIn}
            onSearch={search.onSearch}
            onRetry={search.onRetry}
            searchHistory={history.searchHistory}
            deleteSearchHistoryItem={history.deleteSearchHistoryItem}
            deleteAllSearchHistory={history.deleteAllSearchHistory}
            fillSearchBarInput={history.fillSearchBarInput}
            errorSearch={search.errorSearch || history.errorHistory}
            loadingSearch={search.loadingSearch || history.loadingHistory}
          />
        </div>

        {/* SEARCH RESULTS (GLOBAL) */}
        <div className={styles.searchResultsContainer}>
          <SearchResults
            filteredData={search.filteredData}
            hasSearched={search.hasSearched}
            loadingSearch={search.loadingSearch}
            errorSearch={search.errorSearch}
            onRetry={search.onRetry}
            isLoggedIn={isLoggedIn}
          />
        </div>

        <main className={styles.mainContent}>
          <ExplorationProvider>
            <Routes>

              {/* Public Route */}
              <Route
                path="/"
                element={<HomePage isLoggedIn={isLoggedIn} />}
              />

              {/* Protected Exploration Routes */}
              <Route
                path="/explore"
                element={
                  <ProtectedRoute>
                    <Exploration />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/explore/leaderboard"
                element={
                  <ProtectedRoute>
                    <Leaderboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/explore/:planetId"
                element={
                  <ProtectedRoute>
                    <PlanetDetail />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/explore/:planetId/quiz"
                element={
                  <ProtectedRoute>
                    <Quiz />
                  </ProtectedRoute>
                }
              />

              {/* Protected Route for Quests */}
              <Route
                path="/quests"
                element={
                  <ProtectedRoute>
                    <DailyQuests isLoggedIn={isLoggedIn} />
                  </ProtectedRoute>
                }
              />

              {/* Profile */}
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