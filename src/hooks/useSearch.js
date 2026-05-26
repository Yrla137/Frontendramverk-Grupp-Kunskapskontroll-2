import { useState, useEffect } from "react";
import {
  getData,
  deleteSearchHistoryItemApi,
  deleteAllSearchHistoryApi
} from "../../backend/MOCKDATA(Julia)/api";
// These API function names may need to be updated later depending on
// how the final backend/API structure is organized by the group.


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
  const onSearch = async (term) => {

    const cleanedTerm = term.trim();

    if (!cleanedTerm) {
      setFilteredData([]);
      setHasSearched(false);
      return;
    }

    if (cleanedTerm.length < 3) {
      setFilteredData([]);
      setHasSearched(false);
      setErrorSearch(null);
      return;
    }

    setLoadingSearch(true);
    setErrorSearch(null);

    try {

      // Temporary API call.
      // May later become something like:
      // searchSpaceData(cleanedTerm)
      // getSearchResults(cleanedTerm)
      // api.search(cleanedTerm)
      const fetchSearchData = await getData(cleanedTerm);

      // Assumes backend/API returns already filtered search results.
      // If the final backend instead returns all data,
      // filtering may need to happen here again.
      setFilteredData(fetchSearchData);

      setSubmittedSearchTerm(cleanedTerm);

      setHasSearched(true);

      setSearchHistory((prevHistory) => {

        const duplicateTerm = prevHistory.some(
          (historyItem) =>
            historyItem.historyItem.toLowerCase().trim() ===
            cleanedTerm.toLowerCase().trim()
        );

        if (duplicateTerm) {
          return prevHistory;
        }

        return [
          ...prevHistory,
          {
            id: crypto.randomUUID(),
            historyItem: cleanedTerm
          }
        ];
      });

    } catch (error) {

      // Depending on backend structure,
      // error handling may later use:
      // error.response.data.message
      // custom backend messages
      // auth/token validation errors
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
  // If the final backend becomes sensitive to many requests,
  // debounce timing may need adjustment.



  // Fill searchbar input from search history //
  const fillSearchBarInput = (historyItem) => {

    onSearch(historyItem);

    setSearchTerm("");

  };


  // Delete a single search history item //
  const deleteSearchHistoryItem = async (historyItem) => {

    try {

      // Temporary delete API function.
      // Final backend may instead require:
      // deleteSearchHistory(id)
      // deleteHistoryItem(userId, itemId)
      // api.history.delete(id)
      await deleteSearchHistoryItemApi(historyItem);

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


  // Delete all search history items //
  const deleteAllSearchHistory = async () => {

    try {

      // Temporary delete-all API function.
      // Final backend may later require user authentication,
      // user id, token validation or a different endpoint.
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