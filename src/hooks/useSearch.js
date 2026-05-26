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

  // SEARCH STATE
  const [searchTerm, setSearchTerm] = useState("");
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  // HISTORY STATE
  const [searchHistory, setSearchHistory] = useState([]);

  // LOADING / ERROR
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [errorSearch, setErrorSearch] = useState(null);



  // LOAD HISTORY (BACKEND)
  useEffect(() => {
    const loadHistory = async () => {
      if (!isLoggedIn || !currentUser?.id) return;

      try {
        const data = await getSearchHistoryApi(currentUser.id);
        setSearchHistory(
          data.map((item) => ({
            id: item.id,
            historyItem: item.search_term,
          }))
        );

      } catch (err) {
        console.error("Failed to load history:", err);
      }
    };

    loadHistory();
  }, [isLoggedIn, currentUser?.id]);


  // SEARCH (BACKEND CONTROLLED)
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
      // backend: /api/search?query=
      const data = await getData(cleanedTerm);

      setFilteredData(data);
      setSubmittedSearchTerm(cleanedTerm);
      setHasSearched(true);

  
      // SAVE HISTORY (BACKEND)
      if (isLoggedIn && currentUser?.id) {
        const saved = await saveSearchHistoryApi(
          currentUser.id,
          cleanedTerm
        );

        // backend return: { id: this.lastID }
        setSearchHistory((prev) => [
          {
            id: saved.id,
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


  // DEBOUNCE INPUT
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchTerm.trim().length >= 3) {
        onSearch(searchTerm);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [searchTerm]);



  // FILL FROM HISTORY
  const fillSearchBarInput = (historyItem) => {
    setSearchTerm(historyItem);
    onSearch(historyItem);
  };


  // DELETE ONE ITEM (ID BASED)
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


  // DELETE ALL USER HISTORY
  const deleteAllSearchHistory = async () => {
    try {
      await deleteAllSearchHistoryApi(currentUser.id);
      setSearchHistory([]);
    } catch (error) {
      console.error("Error deleting all:", error);
    }
  };



  // RETRY LAST SEARCH
  const onRetry = () => {
    if (submittedSearchTerm) {
      onSearch(submittedSearchTerm);
    }
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