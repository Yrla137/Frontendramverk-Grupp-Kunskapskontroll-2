import ErrorMessage from "../ErrorMessage";
import LoadingSpinner from "../LoadingSpinner";

const SearchHistory = ({
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
    return <ErrorMessage error={errorSearch}/>;
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