import { useState, useEffect } from "react";
import { getData } from "../../api/index";

export const useSearchResults = (addSearchToHistory, isLoggedIn, currentUser) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const [loadingSearch, setLoadingSearch] = useState(false);
  const [errorSearch, setErrorSearch] = useState(null);

  // SEARCH FUNCTION
  const onSearch = async (term) => {
    const cleanedTerm = term.trim();

    if (!cleanedTerm || cleanedTerm.length < 3) {
      setFilteredData([]);
      setHasSearched(false);
      setErrorSearch(null);
      setLoadingSearch(false);
      return;
    }

    setLoadingSearch(true);
    setErrorSearch(null);

    try {
      const data = await getData(cleanedTerm);

      setFilteredData(data);
      setSubmittedSearchTerm(cleanedTerm);
      setHasSearched(true);

      // SAVE HISTORY (backend controlled)
      if (isLoggedIn && currentUser?.id) {
        addSearchToHistory(currentUser.id, cleanedTerm);
      }

    } catch (err) {
      setErrorSearch(err.message);
    } finally {
      setLoadingSearch(false);
    }
  };

  // DEBOUNCE SEARCH TERM
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchTerm.trim()) onSearch(searchTerm);
    }, 400);

    return () => clearTimeout(timeout);
  }, [searchTerm]);

  const onRetry = () => {
    if (submittedSearchTerm) onSearch(submittedSearchTerm);
  };

  const clearSearch = () => {
  setSearchTerm("");
  setSubmittedSearchTerm("");
  setFilteredData([]);
  setHasSearched(false);
  setErrorSearch(null);
  };

  return {
    searchTerm,
    setSearchTerm,
    filteredData,
    hasSearched,
    loadingSearch,
    errorSearch,
    onSearch,
    onRetry,
    clearSearch
  };
};