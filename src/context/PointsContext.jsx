import { createContext, useContext, useState } from "react";

const PointsContext = createContext();

export const PointsProvider = ({ children }) => {
  const [points, setPoints] = useState(0);

  const addPoints = (amount) => {
    setPoints((prev) => prev + amount);
  };

  const removePoints = (amount) => {
    setPoints((prev) => Math.max(0, prev - amount));
  };

  return (
    <PointsContext.Provider value={{ points, addPoints, removePoints }}>
      {children}
    </PointsContext.Provider>
  );
};

export const usePoints = () => {
  const context = useContext(PointsContext);
  if (!context) {
    throw new Error("usePoints must be used within a PointsProvider");
  }
  return context;
};