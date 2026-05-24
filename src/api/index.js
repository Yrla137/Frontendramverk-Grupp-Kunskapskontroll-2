import { searchSpaceMock } from "../MOCKDATA(Julia)/spaceAPI";

// Temporary mockdata switch.
// Change to false when real backend/API search is connected.
const USE_MOCK = true;

// REAL API (för framtiden)
const BASE_URL = "http://localhost:5000/api";

export const getData = async (query) => {
  if (USE_MOCK) {
    return searchSpaceMock(query);
  }

  const res = await fetch(`${BASE_URL}/search?query=${query}`);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};

// Temporary mock delete search history item
export const deleteSearchHistoryItemApi = async () => {
  return true;
};

// Temporary mock delete all search history
export const deleteAllSearchHistoryApi = async () => {
  return true;
};
