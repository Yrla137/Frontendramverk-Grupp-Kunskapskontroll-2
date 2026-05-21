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
  };

  if (!hasSearched) {
    return null;
  };

  if(!filteredData || filteredData.length === 0){
    return (<div>No results found</div>);
  };

    const handleResultClick = (result) => {
      const resultRoute = `/${result.id}`;

      isLoggedIn
      ? navigate(resultRoute)
      : navigate("/login", {
        state: {
          message: "Please log in to view this content.",
          intendedRoute: resultRoute
        }
      });
      // Future auth flow:
      // Save intended route so user can return here after login/signup.
    };

  return (
    <section>
    </section>
  )
}

export default SearchResults