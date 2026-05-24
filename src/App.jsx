import styles from "./App.module.css";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import useSearch from "./hooks/useSearch";

import HomePage from "./pages/homepage/HomePage";
import Profile from "./pages/profile/Profile";
// import Explore from "./pages/explore/Explore";
// import Quests from "./pages/quests/Quests";

import NavBar from "./components/homepage/NavBar";
import SearchBar from "./components/search/SearchBar";
import SearchResults from "./components/search/SearchResults";

const App = () => {

  // Auth state //
  // Temporarily lokal auth.
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
        <Routes>
          <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} />} />
          {/* <Route path="/explore" element={<Explore />} />
          <Route path="/quests" element={<Quests />} /> */}
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </main>

    </div>
  );
}

export default App;


// import styles from './App.module.css';
// import Profile from './pages/profile/Profile';


// function App() {
//   return (
//     <div className={styles.appContainer}>
      
//       <header className={styles.navbar}>
//         <h1>Space-Quiz</h1>
//         {}
//       </header>

//       <main className={styles.mainContent}>
        
//         {/* React Router */}
//         <div className="card">
//         <Profile />
//           <h2>Välkommen till rymden</h2>
//           <p>Här kan du utforska NASA:s data och samla badges.</p>
//         </div>
//       </main>

//       <footer className={styles.footer}>
//         <p>Byggd med React och NASA API</p>
//       </footer>

//     </div>
//   );
// }

// export default App;