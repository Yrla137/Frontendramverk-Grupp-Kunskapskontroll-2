// Temporary API layer for frontend development.
// This file simulates future backend/API calls.

import spaceData from "./spaceData.js";

// Temporary frontend mock search
export const searchSpaceMock = (query) => {
  return spaceData.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );
};


// Get all searchable space data
export const getAllSpaceData = () => {

  return spaceData;

};


// Get popular topics for homepage section
export const getPopularTopics = () => {

  return spaceData.filter((item) =>

    item.slug === "mars" ||
    item.slug === "black-hole" ||
    item.slug === "europa"

  );

};
