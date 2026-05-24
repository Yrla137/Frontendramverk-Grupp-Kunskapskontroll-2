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
    const resultRoute = `/${result.id}`;
    // Dubblecheck the correct route structure for result details when we have real backend/API integration, and update the route here accordingly.
    // It may need to be based on result.type or other properties instead of just result.id.

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
    <section>
      {filteredData.map((result) => (
        <div
          key={result.id}
          role="button"
          tabIndex={0}
          onClick={() => handleResultClick(result)}
        >
          <h2>{getSafeValue(result.title)}</h2>
          <p>{getSafeValue(result.category)}</p>
          <p>{getSafeValue(result.description)}</p>
        </div>
      ))}
    </section>
  );
};

export default SearchResults;