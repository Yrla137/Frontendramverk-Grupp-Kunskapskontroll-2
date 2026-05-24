import SearchHistory from "./SearchHistory";
import { useState, useEffect, useRef } from "react";

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
  errorHistory,
  loadingHistory
}) => {

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const inputRef = useRef(null);

  const outsideClickRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus()
  }, []);

  useEffect (() => {
    const handleClick = (e) => {
      if(outsideClickRef.current && !outsideClickRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
    document.removeEventListener('click', handleClick);
    };
  }, []);

 


  return (
    <div>

      <div className="searchbar-dropdown-container" ref={outsideClickRef}>

        <form
        onSubmit={(e) =>{
        e.preventDefault();
        onSearch(searchTerm);
        setDropdownOpen(false);
        }}>
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setDropdownOpen(true)}
            placeholder="Type your search here..."
              />
        </form>

        {isLoggedIn && dropdownOpen && (
          <div>
            <SearchHistory
            onRetry={onRetry}
            searchHistory={searchHistory}
            deleteSearchHistoryItem={deleteSearchHistoryItem}
            deleteAllSearchHistory={deleteAllSearchHistory}
            fillSearchBarInput={fillSearchBarInput}
            errorHistory={errorHistory}
            loadingHistory={loadingHistory}
            />
            <button
            type="button"
            onClick={() => setDropdownOpen(false)}>
              Close search history
            </button>
          </div>
        )}

      </div>

    </div>
  )
}

export default SearchBar



