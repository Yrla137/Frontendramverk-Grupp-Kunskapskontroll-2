import { useNavigate } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";
import LoadingSpinner from "./LoadingSpinner";

const SearchResults = ({
  filteredData,
  hasSearched,
  errorSearch,
  loadingSearch,
  onRetry,
  isLoggedIn
}) => {

  const navigate = useNavigate();

  if (loadingSearch) {
  return <LoadingSpinner message="Searching though space..." />;
  }

  if (errorSearch) {
    return (
        <ErrorMessage
        error={errorSearch}
        onRetry={onRetry} />
    );
  }
  return (
    <section>
    </section>
  )
}

export default SearchResults