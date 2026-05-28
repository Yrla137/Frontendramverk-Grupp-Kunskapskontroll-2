import { useState, useEffect } from "react";
import { getPlanetById } from "../services/planetData";

const usePlanet = (planetId) => {
  const [planet, setPlanet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [prevPlanetId, setPrevPlanetId] = useState(planetId);

  if (planetId !== prevPlanetId) {
    setPrevPlanetId(planetId);
    setLoading(true);
    setError(null);
  }

  useEffect(() => {
    getPlanetById(planetId)
      .then((data) => {
        setPlanet(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to load planet data");
        setLoading(false);
      });
  }, [planetId]);

  return { planet, loading, error };
};

export default usePlanet;
