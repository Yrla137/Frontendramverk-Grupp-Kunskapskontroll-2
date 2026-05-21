import { useState, useEffect } from "react";

const useSearch = () => {

  // Search states //
  const [searchTerm, setSearchTerm] = useState("");
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Search history //
  const [searchHistory, setSearchHistory] = useState([]);

  // Loading & error //
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [errorSearch, setErrorSearch] = useState(null);

  // Search function //
  const onSearch = async (term) => {

    term = term.trim();

    if (term.length < 3) {
      return setFilteredData([]);
    }

    if (!term.trim()) return;

    setLoadingSearch(true);
    setErrorSearch(null);

    try {
    
    // Here we later call the backend/API with the search term, but for now I use mock data and filter it based on the search term.
      const filteredResults = mockSpaceData.filter((item) => {

        return Object.values(item).some((value) =>
          String(value).toLowerCase().includes(term.toLowerCase())
        );
      });

      setFilteredData(filteredResults);

      setSubmittedSearchTerm(term);

      setHasSearched(true);

      setSearchHistory((prevHistory) => {

        // Check for duplicate search term in history (case-insensitive and trimmed)
        const duplicateTerm = prevHistory.some(
          (historyItem) =>
            historyItem.historyItem.toLowerCase().trim() === term.toLowerCase().trim()
        );

        if (duplicateTerm)
        return prevHistory;

        return [
          ...prevHistory,
          {
            id: crypto.randomUUID(),
            historyItem: term
          }
        ];
      });

    } catch (error) {

      setErrorSearch(error.message);

    } finally {

      setLoadingSearch(false);

    }
  };


  // All states and functions to be used in the component //
  return {

  };
};

export default useSearch;