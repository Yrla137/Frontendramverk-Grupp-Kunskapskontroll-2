import { useState, useEffect } from "react";

const NASA_API_KEY = "DEMO_KEY";
const APOD_URL = "https://api.nasa.gov/planetary/apod";

const useNasaApod = () => {
  const [apod, setApod] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchApod = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${APOD_URL}?api_key=${NASA_API_KEY}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to fetch NASA data");
        }

        const data = await response.json();
        setApod(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchApod();

    return () => controller.abort();
  }, []);

  return { apod, loading, error };
};

export default useNasaApod;