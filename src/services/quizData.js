export const getQuizQuestions = async (planetId) => {
  const response = await fetch(new URL("../../backend/data/quizzes.json", import.meta.url));

  if (!response.ok) 
    throw new Error("Failed to load quiz data");

  const quizQuestions = await response.json();
  return quizQuestions[planetId] || null;
};