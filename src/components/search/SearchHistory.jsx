import ErrorMessage from "../ErrorMessage";
import LoadingSpinner from "../LoadingSpinner";

const SearchHistory = ({
  onRetry,
  searchHistory,
  deleteSearchHistoryItem,
  deleteAllSearchHistory,
  fillSearchBarInput,
  errorHistory,
  loadingHistory
}) => {

if (loadingHistory) {
  return <LoadingSpinner message="Loading search history..." />;
}

if (errorHistory) {
  return (
    <ErrorMessage
      error={errorHistory}
      onRetry={onRetry}
    />
  );
}

  return (
    <div>
      <h3>Search History</h3>
      <ul>
        {searchHistory.map((item) => (
          <li key={item.id}
          onClick={() => fillSearchBarInput(item.historyItem)}>
          {item.historyItem}
          <button onClick={(event) => {
          event.stopPropagation();
          deleteSearchHistoryItem(item);
          }}>Delete</button>
          </li>
        ))}
      </ul>
      {searchHistory.length > 0 && (
        <button onClick={deleteAllSearchHistory}>Delete search history</button>
      )}
    </div>
  )
}

export default SearchHistory

// Onretry will likely trigger refetching of history from backend (e.g. GET /search-history for currentUser).
// deleteSearchHistoryItem will likely send a DELETE-request to API based on item.id instead of whole item-object or text string.
// fillSearchBarInput may later need to use item.query instead of whole item.