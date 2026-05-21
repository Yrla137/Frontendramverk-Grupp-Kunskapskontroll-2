import ErrorMessage from "./ErrorMessage";
import LoadingSpinner from "./LoadingSpinner";

const SearchHistory = ({
  onRetry,
  searchHistory,
  deleteSearchHistoryItem,
  deleteAllSearchHistory,
  fillSearchBarInput,
  errorHistory,
  loadingHistory
}) => {


  return (
    <div>
      <h3>Search History</h3>
      <ul>
        {searchHistory.map((item, id) => (
          <li key={id}
          onClick= {() => fillSearchBarInput(item)}>
            {item}
            <button onClick={() => deleteSearchHistoryItem(item)}>Delete</button>
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
