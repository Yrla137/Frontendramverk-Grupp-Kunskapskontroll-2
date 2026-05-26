const BASE_URL = "http://localhost:5000/api";

// SEARCH
export const getData = async (query) => {
  const res = await fetch(
    `${BASE_URL}/search?query=${encodeURIComponent(query)}`
  );

  if (!res.ok) {
    const error = await res.json().catch(() => null);
    throw new Error(error?.message || "Failed to fetch search results");
  }

  return res.json();
};

// POPULAR TOPICS
export const getPopularTopics = async () => {
  const res = await fetch(`${BASE_URL}/popular-topics`);

  if (!res.ok) {
    const error = await res.json().catch(() => null);
    throw new Error(error?.message || "Failed to fetch popular topics");
  }

  return res.json();
};


// SEARCH HISTORY (USER BASED)

// GET history for user
export const getSearchHistoryApi = async (userId) => {
  const res = await fetch(`${BASE_URL}/search-history/${userId}`);

  if (!res.ok) {
    const error = await res.json().catch(() => null);
    throw new Error(error?.message || "Failed to fetch search history");
  }

  return res.json();
};


// SAVE search term
export const saveSearchHistoryApi = async (userId, searchTerm) => {
  const res = await fetch(`${BASE_URL}/search-history`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, searchTerm }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => null);
    throw new Error(error?.message || "Failed to save search history");
  }

  return res.json();
};


// DELETE ONE ITEM (ID BASED)
export const deleteSearchHistoryItemApi = async (id) => {
  const res = await fetch(`${BASE_URL}/search-history/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const error = await res.json().catch(() => null);
    throw new Error(error?.message || "Failed to delete history item");
  }

  return res.json();
};


// DELETE ALL USER HISTORY
export const deleteAllSearchHistoryApi = async (userId) => {
  const res = await fetch(
    `${BASE_URL}/search-history/user/${userId}`,
    {
      method: "DELETE",
    }
  );

  if (!res.ok) {
    const error = await res.json().catch(() => null);
    throw new Error(error?.message || "Failed to delete all history");
  }

  return res.json();
};