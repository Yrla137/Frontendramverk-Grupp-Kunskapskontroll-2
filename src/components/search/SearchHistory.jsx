import ErrorMessage from "../ErrorMessage";
import LoadingSpinner from "../LoadingSpinner";

const SearchHistory = ({
  onRetry,
  searchHistory,
  deleteSearchHistoryItem,
  deleteAllSearchHistory,
  fillSearchBarInput,
  errorSearch,
  loadingSearch
}) => {

  if (loadingSearch) {
    return <LoadingSpinner message="Loading search history..." />;
  }

  if (errorSearch) {
    return <ErrorMessage error={errorSearch} onRetry={onRetry} />;
  }

  return (
    <div className="search-history-container">

      <h3>Search History</h3>

      <ul className="search-history-list">

        {searchHistory.map((item) => (
          <li
            key={item.id}
            className="search-history-item"
            onClick={() => fillSearchBarInput(item.historyItem)}
          >
            {item.historyItem}

            <button
              className="search-history-delete-btn"
              onClick={(e) => {
                e.stopPropagation();
                deleteSearchHistoryItem(item.id);
              }}
            >
              Delete
            </button>
          </li>
        ))}

      </ul>

      {searchHistory.length > 0 && (
        <button
          className="search-history-delete-all-btn"
          onClick={deleteAllSearchHistory}
        >
          Delete search history
        </button>
      )}

    </div>
  );
};

export default SearchHistory;

// Onretry will likely trigger refetching of history from backend (e.g. GET /search-history for currentUser).
// deleteSearchHistoryItem will likely send a DELETE-request to API based on item.id instead of whole item-object or text string.
// fillSearchBarInput may later need to use item.query instead of whole item.