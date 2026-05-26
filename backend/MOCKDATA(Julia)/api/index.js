import { searchSpaceMock } from "../spaceApi";

// Temporary mockdata switch.
// Change to false when real backend/API search is connected.
const USE_MOCK = true;

// Backend/API base URL (for real API calls, not mock)
const BASE_URL = "http://localhost:5000/api";

export const getData = async (query) => {
  if (USE_MOCK) {
    return searchSpaceMock(query);
  }

  const res = await fetch(`${BASE_URL}/search?query=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};


// Temporary mock get popular topics for homepage section //
export const getPopularTopics = async () => {
  if (USE_MOCK) {
    return searchSpaceMock("").filter((item) =>
      ["mars", "black-hole", "europa"].includes(item.slug)
    );
  }

  const res = await fetch(`${BASE_URL}/popular-topics`);
  if (!res.ok) throw new Error("Failed to fetch popular topics");

  return res.json();
};


// Temporary mock delete search history item //
export const deleteSearchHistoryItemApi = async () => {
  return true;
};

// Temporary mock delete all search history //
export const deleteAllSearchHistoryApi = async () => {
  return true;
};
