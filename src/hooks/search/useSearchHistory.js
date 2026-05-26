import { useState, useEffect } from "react";
import {
  getSearchHistoryApi,
  saveSearchHistoryApi,
  deleteSearchHistoryItemApi,
  deleteAllSearchHistoryApi,
} from "../../api/index.js";

export const useSearchHistory = (isLoggedIn, currentUser) => {
  const [searchHistory, setSearchHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [errorHistory, setErrorHistory] = useState(null);

  // LOAD HISTORY
  useEffect(() => {
    const loadHistory = async () => {
      if (!isLoggedIn || !currentUser?.id) return;

      setLoadingHistory(true);
      setErrorHistory(null);

      try {
        const data = await getSearchHistoryApi(currentUser.id);

        setSearchHistory(
          data.map((item) => ({
            id: item.id,
            historyItem: item.search_term, // ✔ matches backend (SQLite column)
          }))
        );
      } catch (err) {
        setErrorHistory(err.message);
      } finally {
        setLoadingHistory(false);
      }
    };

    loadHistory();
  }, [isLoggedIn, currentUser?.id]);

  // SAVE NEW SEARCH
  const addSearchToHistory = async (userId, searchTerm) => {
    try {
      const saved = await saveSearchHistoryApi(userId, searchTerm);

      setSearchHistory((prev) => [
        {
          id: saved.id || crypto.randomUUID(),
          historyItem: searchTerm,
        },
        ...prev,
      ]);
    } catch (err) {
      console.error("Failed to save history:", err);
    }
  };

  // DELETE ONE
  const deleteSearchHistoryItem = async (id) => {
    try {
      await deleteSearchHistoryItemApi(id);

      setSearchHistory((prev) =>
        prev.filter((item) => item.id !== id)
      );
    } catch (err) {
      console.error("Failed to delete item:", err);
    }
  };

  // DELETE ALL
  const deleteAllSearchHistory = async (userId) => {
    try {
      await deleteAllSearchHistoryApi(userId);
      setSearchHistory([]);
    } catch (err) {
      console.error("Failed to delete all:", err);
    }
  };

  // FILL INPUT
  const fillSearchBarInput = (term, setSearchTerm, onSearch) => {
    setSearchTerm(term);
    onSearch(term);
  };

  return {
    searchHistory,
    loadingHistory,
    errorHistory,
    addSearchToHistory,
    deleteSearchHistoryItem,
    deleteAllSearchHistory,
    fillSearchBarInput,
  };
};