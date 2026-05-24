const BASE_URL = "http://localhost:5000/api";

// Get all searchable space data from backend
export const getData = async (term) => {
  const response = await fetch(`${BASE_URL}/search?query=${encodeURIComponent(term)}`);

  if (!response.ok) {
    throw new Error("Failed to fetch search data");
  }

  return response.json();
};

// Temporary placeholder for deleting one history item
// This can be replaced later when the backend has a real delete route
export const deleteSearchHistoryItemApi = async (historyItem) => {
  return Promise.resolve(historyItem);
};

// Temporary placeholder for deleting all history items
// This can be replaced later when the backend has a real delete-all route
export const deleteAllSearchHistoryApi = async () => {
  return Promise.resolve();
};