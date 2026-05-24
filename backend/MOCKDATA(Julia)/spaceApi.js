// Temporary API layer for frontend development.
// This file simulates future backend/API calls.

const spaceData = require("./spaceData");


// Get all searchable space data
const getAllSpaceData = () => {
  return spaceData;
};


// Get popular topics for homepage section
const getPopularTopics = () => {

  return spaceData.filter((item) =>

    item.slug === "mars" ||
    item.slug === "black-hole" ||
    item.slug === "europa"

  );
};


module.exports = {
  getAllSpaceData,
  getPopularTopics
};