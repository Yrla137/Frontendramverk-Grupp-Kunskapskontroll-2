import styles from "./App.module.css";
import { Routes, Route, useLocation} from "react-router-dom";
import { useState, useEffect } from "react";

import LoadingSpinner from "./components/LoadingSpinner";
import { GoogleOAuthProvider } from '@react-oauth/google';

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

  const [showLoader, setShowLoader] = useState(false);

  // SEARCH HISTORY (backend)
  const history = useSearchHistory(isLoggedIn, currentUser);

  // Get current location for route change detection
  const location = useLocation();

  // SEARCH - backend + history integration
  const search = useSearchResults(
    history.addSearchToHistory,
    isLoggedIn,
    currentUser
  );

  // Clear search results when navigating to a new page
    useEffect(() => {
    search.clearSearch();
  }, [location.pathname]); // added search and search.clearSearch to remove EsLint warning

  // Show loader on route change
    useEffect(() => {
      let hideTimer;

      const showTimer = setTimeout(() => {
        setShowLoader(true);

        hideTimer = setTimeout(() => {
          setShowLoader(false);
        }, 1600);
      }, 0);

      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
      };
    }, [location.pathname]);
    

  return (
    <PointsProvider>
      {showLoader && (
        <div className={styles.routeLoader}>
          <LoadingSpinner message="Traveling through space..." />
        </div>
      )}

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
            searchHistory={history.searchHistory}
            deleteSearchHistoryItem={history.deleteSearchHistoryItem}
            deleteAllSearchHistory={history.deleteAllSearchHistory}
            // FILL INPUT
            fillSearchBarInput={(term) => {
              search.setSearchTerm(term);
              search.onSearch(term);
            }}
            errorSearch={search.errorSearch}
            loadingSearch={search.loadingSearch}
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
          clearSearch={search.clearSearch}
        />
        </div>

        <main className={styles.mainContent}>
          <ExplorationProvider>
            <Routes key={location.pathname}>

              {/* Public Route */}
              <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} currentUser={currentUser} />} />

              {/* Protected Routes */}
              <Route path="/explore" element={<ProtectedRoute><Exploration /></ProtectedRoute>} />
              <Route path="/explore/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
              <Route path="/explore/:planetId" element={<ProtectedRoute><PlanetDetail /></ProtectedRoute>} />
              <Route path="/explore/:planetId/quiz" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
              <Route path="/quests" element={<ProtectedRoute><DailyQuests isLoggedIn={isLoggedIn} /></ProtectedRoute>} />

              {/* Profile - Handles authentication state internally */}
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
  const clientId = "1042864420511-suksp31nf4q5vn7feif2nm3fpu8venon.apps.googleusercontent.com";

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </GoogleOAuthProvider>
  );
};

export default App;