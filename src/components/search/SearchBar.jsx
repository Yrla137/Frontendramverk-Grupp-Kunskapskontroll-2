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
  const outsideClickRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (
        outsideClickRef.current &&
        !outsideClickRef.current.contains(e.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div ref={outsideClickRef} className="searchbar-dropdown-container">

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
          onFocus={() => setDropdownOpen(true)}
          placeholder="Type your search here..."
        />
      </form>

      {isLoggedIn && dropdownOpen && (
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


