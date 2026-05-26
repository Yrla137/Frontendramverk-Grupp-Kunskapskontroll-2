export const getAllPlanets = async () => {
  const response = await fetch(new URL("../../backend/data/planets.json", import.meta.url));
  
  if (!response.ok) 
    throw new Error("Failed to load planet data");

  return response.json();
};

export const getPlanetById = async (id) => {
  const planets = await getAllPlanets();
  return planets.find((p) => p.id === id) || null;
};

export const getExplorationProgress = async () => {
  const planets = await getAllPlanets();
  const total = planets.length;
  return {
    totalPlanets: total,
    explored: 0,
    quizzesCompleted: 0,
    exploredPercentage: 0,
    quizPercentage: 0,
  };
};
