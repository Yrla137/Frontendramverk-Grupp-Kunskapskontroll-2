import { useState, useEffect } from "react";
import { getData, deleteSearchHistoryItemApi, deleteAllSearchHistoryApi } from "../api";
// Dubblecheck the correct names for the api functions when they are created, and update the imports here accordingly.

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

    
  // Retry search //
  const onRetry = () => {
    onSearch(submittedSearchTerm);
  };


  // Search function //
  // useCallback?
  const onSearch = async (term) => {
    
    const cleanedTerm = term.trim();

    if(!cleanedTerm) {
      setFilteredData([]);
      setHasSearched(false);
      return;
    }

    if (cleanedTerm.length < 3) {
      setFilteredData([])
      setHasSearched(false)
      setErrorSearch(null);
      return;
    }

    setLoadingSearch(true);
    setErrorSearch(null);

    try {
    // Here we later call the backend/API with the search term, but for now I use mock data and filter it based on the search term.
    const fetchSearchData = await getData(cleanedTerm);

      setFilteredData(fetchSearchData);
      // Can be removed when we have real backend/API integration, but for now it prevents the "No results found" message from flashing before the mock data is set.

      setSubmittedSearchTerm(cleanedTerm);

      setHasSearched(true);

      setSearchHistory((prevHistory) => {

        // Checks for duplicate search term in history (case-insensitive and trimmed)
        const duplicateTerm = prevHistory.some(
          (historyItem) =>
            historyItem.historyItem.toLowerCase().trim() === cleanedTerm.toLowerCase().trim()
        );

        if (duplicateTerm)
        return prevHistory;

        return [
          ...prevHistory,
          {
            id: crypto.randomUUID(),
            historyItem: cleanedTerm
          }
        ];
      });

    } catch (error) {
      setErrorSearch(error.message);

    } finally {
      setLoadingSearch(false);

    }
  };

  // Debounce search input //
  useEffect(() => {
  const timeout = setTimeout(() => {
    onSearch(searchTerm);
  }, 400);

    return () => clearTimeout(timeout);
    }, [searchTerm]);


  // For search history, when user clicks on a history item, it fills the search bar with that term and performs the search again //
  const fillSearchBarInput = (historyItem) => {
    onSearch(historyItem);
    setSearchTerm("");

  };


// Delete a single search history item / Delete all search history items //
  const deleteSearchHistoryItem = async (historyItem) => {

    try {

      await deleteSearchHistoryItemApi(historyItem.id);

      setSearchHistory((prevHistory) =>
        prevHistory.filter(
          (item) => item.historyItem !== historyItem
        )
      );

    } catch (error) {

      console.error(
        "Error deleting search history item:",
        error
      );

    }
  };

  const deleteAllSearchHistory = async () => {

    try {
      await deleteAllSearchHistoryApi();

      setSearchHistory([]);
    } catch (error) {
      console.error(
        "Error deleting all search history:",
        error
      );
    }
  };


  // All states and functions to be used in the component //
  return {
    
    // States //
    searchTerm,
    setSearchTerm,
    submittedSearchTerm,
    filteredData,
    hasSearched,
    searchHistory,

    // Loading & error //
    loadingSearch,
    errorSearch,

    // Functions //
    onSearch,
    onRetry,
    fillSearchBarInput,
    deleteSearchHistoryItem,
    deleteAllSearchHistory

  };
};

export default useSearch;



      // const filteredResults = fetchSearchData.filter((item) => {

      //   return Object.values(item).some((value) =>
      //     String(value).toLowerCase().includes(cleanedTerm.toLowerCase())
      //   );
      // });