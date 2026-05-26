import { useState, useEffect } from "react";
import {
  getData,
  getSearchHistoryApi,
  saveSearchHistoryApi,
  deleteSearchHistoryItemApi,
  deleteAllSearchHistoryApi,
} from "../api/index";

import { useAuth } from "../context/AuthContext";

const useSearch = () => {

  // AUTH
  const { currentUser, isLoggedIn } = useAuth();

  // SEARCH STATES
  const [searchTerm, setSearchTerm] = useState("");
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  // SEARCH HISTORY
  const [searchHistory, setSearchHistory] = useState([]);

  // LOADING / ERROR
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [errorSearch, setErrorSearch] = useState(null);


  // LOAD SEARCH HISTORY
  useEffect(() => {
    const loadHistory = async () => {
      if (!isLoggedIn || !currentUser?.id) return;

      try {
        const data = await getSearchHistoryApi(currentUser.id);
        setSearchHistory(
          data.map((item) => ({
            id: item.id,
            historyItem: item.searchTerm,
          }))
        );
      } catch (err) {
        console.error("Failed to load history:", err);
      }
    };

    loadHistory();
  }, [isLoggedIn, currentUser]);


  // SEARCH FUNCTION
  const onSearch = async (term) => {
    const cleanedTerm = term.trim();

    if (!cleanedTerm || cleanedTerm.length < 3) {
      setFilteredData([]);
      setHasSearched(false);
      return;
    }

    setLoadingSearch(true);
    setErrorSearch(null);

    try {
      // SEARCH RESULTS
      const fetchSearchData = await getData(cleanedTerm);
      setFilteredData(fetchSearchData);

      setSubmittedSearchTerm(cleanedTerm);
      setHasSearched(true);

      // SAVE SEARCH HISTORY
      if (isLoggedIn && currentUser?.id) {
        const saved = await saveSearchHistoryApi(
          currentUser.id,
          cleanedTerm
        );

        // ADDS NEW SEARCH TO TOP OF HISTORY IN FRONTEND (OPTIMISTIC UPDATE)
        setSearchHistory((prev) => [
          {
            id: saved.id || crypto.randomUUID(),
            historyItem: cleanedTerm,
          },
          ...prev,
        ]);
      }
    } catch (error) {
      setErrorSearch(error.message);
    } finally {
      setLoadingSearch(false);
    }
  };

  // DEBOUNCE SEARCH
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchTerm) onSearch(searchTerm);
    }, 400);

    return () => clearTimeout(timeout);
  }, [searchTerm]);


  // FILL INPUT FROM HISTORY
  const fillSearchBarInput = (historyItem) => {
    setSearchTerm(historyItem);
    onSearch(historyItem);
  };


  // DELETE SINGLE HISTORY ITEM (FIX: ID BASED, NOT TERM BASED)
  const deleteSearchHistoryItem = async (id) => {
    try {
      await deleteSearchHistoryItemApi(id);

      setSearchHistory((prev) =>
        prev.filter((item) => item.id !== id)
      );
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // DELETE ALL HISTORY FOR USER
  const deleteAllSearchHistory = async () => {
    try {
      await deleteAllSearchHistoryApi(currentUser.id);
      setSearchHistory([]);
    } catch (error) {
      console.error("Error deleting all:", error);
    }
  };


  // RETRY
  const onRetry = () => {
    onSearch(submittedSearchTerm);
  };

  return {
    searchTerm,
    setSearchTerm,
    filteredData,
    hasSearched,
    searchHistory,
    loadingSearch,
    errorSearch,
    onSearch,
    onRetry,
    fillSearchBarInput,
    deleteSearchHistoryItem,
    deleteAllSearchHistory,
  };
};

export default useSearch;