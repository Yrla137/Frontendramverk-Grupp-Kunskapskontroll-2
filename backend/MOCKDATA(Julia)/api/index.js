const BASE_URL = "http://localhost:5000/api";


// SEARCH GENERAL

export const getData = async (query) => {
  const res = await fetch(
    `${BASE_URL}/search?query=${encodeURIComponent(query)}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch search results");
  }

  return res.json();
};


// POPULAR TOPICS

export const getPopularTopics = async () => {
  const res = await fetch(`${BASE_URL}/popular-topics`);

  if (!res.ok) {
    throw new Error("Failed to fetch popular topics");
  }

  return res.json();
};


// SEARCH HISTORY (USER BASED)

// GET search history for a user
export const getSearchHistoryApi = async (userId) => {
  const res = await fetch(`${BASE_URL}/search-history/${userId}`);

  if (!res.ok) {
    throw new Error("Failed to fetch search history");
  }

  return res.json();
};


// SAVE a new search term to history
export const saveSearchHistoryApi = async (userId, searchTerm) => {
  const res = await fetch(`${BASE_URL}/search-history`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      searchTerm,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to save search history");
  }

  return res.json();
};


// DELETE EN ITEM (IMPORTANT: ID BASED, NOT TERM BASED)
export const deleteSearchHistoryItemApi = async (historyId) => {
  const res = await fetch(`${BASE_URL}/search-history/${historyId}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete history item");
  }

  return res.json();
};


// DELETE ALL ITEMS FOR A USER (IMPORTANT: USER ID BASED)
export const deleteAllSearchHistoryApi = async (userId) => {
  const res = await fetch(
    `${BASE_URL}/search-history/user/${userId}`,
    {
      method: "DELETE",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to delete all history");
  }

  return res.json();
};