import { useNavigate } from "react-router-dom";
import ErrorMessage from "../ErrorMessage";
import LoadingSpinner from "../LoadingSpinner";

const SearchResults = ({
  filteredData,
  hasSearched,
  errorSearch,
  loadingSearch,
  onRetry,
  isLoggedIn,
}) => {
  const navigate = useNavigate();

  const handleResultClick = (result) => {
  const resultRoute = `/explore/${result.id}`;

  if (isLoggedIn) {
    navigate(resultRoute);
  } else {
    navigate("/login", {
      state: {
        message: "Please log in to view this content.",
        intendedRoute: resultRoute,
      },
    });
  }
};

  const getSafeValue = (value) => value ?? "N/A";

  if (loadingSearch) {
    return <LoadingSpinner message="Searching through space..." />;
  }

  if (errorSearch) {
    return <ErrorMessage error={errorSearch} onRetry={onRetry} />;
  }

  if (!hasSearched) {
    return null;
  }

  if (!filteredData || filteredData.length === 0) {
    return <div>No results found</div>;
  }

  return (
    <section className="search-results-container">
      {filteredData.map((result) => (
        <div
          key={result.id}
          className="search-result-item"
          role="button"
          tabIndex={0}
          onClick={() => handleResultClick(result)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              handleResultClick(result);
            }
          }}
        >
          <h2>{getSafeValue(result.name)}</h2>
          <p>{getSafeValue(result.type)}</p>
          <p>{getSafeValue(result.description)}</p>
        </div>
      ))}
    </section>
  );
};

export default SearchResults;