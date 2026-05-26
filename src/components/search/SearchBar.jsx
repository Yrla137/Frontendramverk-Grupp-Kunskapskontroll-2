import { useState, useEffect, useRef } from "react";
import SearchHistory from "./SearchHistory";
import "./Search.css";

const SearchBar = ({
  searchTerm,
  setSearchTerm,
  isLoggedIn,
  onSearch,
  onRetry,
  searchHistory,
  deleteSearchHistoryItem,
  deleteAllSearchHistory,
  fillSearchBarInput,
  errorSearch,
  loadingSearch
}) => {

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  // focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // close dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const canShowDropdown = isLoggedIn && searchHistory.length > 0;

  return (
    <div ref={containerRef} className="searchbar-dropdown-container">

      <form
        className="searchbar-form"
        onSubmit={(e) => {
          e.preventDefault();
          onSearch(searchTerm);
          setDropdownOpen(false);
        }}
      >
        <input
          className="searchbar-input"
          ref={inputRef}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => {
            if (canShowDropdown) {
              setDropdownOpen(true);
            }
          }}
          placeholder="Type your search here..."
        />
      </form>

      {dropdownOpen && canShowDropdown && (
        <div className="searchbar-dropdown">

          <SearchHistory
            onRetry={onRetry}
            searchHistory={searchHistory}
            deleteSearchHistoryItem={deleteSearchHistoryItem}
            deleteAllSearchHistory={deleteAllSearchHistory}
            fillSearchBarInput={fillSearchBarInput}
            errorSearch={errorSearch}
            loadingSearch={loadingSearch}
          />

          <button
            className="searchbar-dropdown-close-btn"
            onClick={() => setDropdownOpen(false)}
          >
            Close search history
          </button>

        </div>
      )}

    </div>
  );
};

export default SearchBar;


