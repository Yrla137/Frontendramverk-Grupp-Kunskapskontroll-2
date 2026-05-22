import { useNavigate } from "react-router-dom";
import ErrorMessage from "../ErrorMessage";
import LoadingSpinner from "../LoadingSpinner";

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
  return <LoadingSpinner message="Searching through space..." />;
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
      // Dubblecheck the correct route structure for result details when we have real backend/API integration, and update the route here accordingly.
      // It may need to be based on result.type or other properties instead of just result.id.

      isLoggedIn
      // Dubblecheck the correct route structure for result details when we have real backend/API integration, and update the route here accordingly.
      // It may need to be based on result.type or other properties instead of just result.id.
      // Example of future auth flow:

      // if (user) {
      // navigate(resultRoute);
      // } else {
      // navigate("/login");
      //}

      // JWT token:
      // if (user?.token) {
      // navigate(resultRoute);
      // } else {
      // navigate("/login");
      // }

      // auth state object:
      // if (auth.isAuthenticated) {
      // navigate(resultRoute);
      // } else {
      // navigate("/login");
      // }
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

    const getSafeValue = (value) => {
      return value ?? "N/A";
    };

  return (
    <section>
        {filteredData.map(result =>
        <div  key={result.id}
        role="button"
        tabIndex={0}
        onClick={() => {
          handleResultClick(result);
        }}>
          <h2>{getSafeValue(result.name)}</h2>
          <p>{getSafeValue(result.type)}</p>
          <p>{getSafeValue(result.description)}</p>
        </div>
        )}
    </section>
  )
}

export default SearchResults