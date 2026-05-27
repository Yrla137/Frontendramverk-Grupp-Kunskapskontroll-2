const allQuests = [
  { id: 1, title: "Check today's Astronomy Picture of the Day", points: 10 },
  { id: 2, title: "Read about Mars", points: 10 },
  { id: 3, title: "Learn about the International Space Station", points: 10 },
  { id: 4, title: "Explore the surface of the Moon", points: 10 },
  { id: 5, title: "Discover a new galaxy", points: 10 },
  { id: 6, title: "Learn about Saturn's rings", points: 10 },
  { id: 7, title: "Read about black holes", points: 10 },
  { id: 8, title: "Explore the asteroid belt", points: 10 },
  { id: 9, title: "Study the phases of the Moon", points: 10 },
  { id: 10, title: "Learn about the Sun's core temperature", points: 10 },
];

export const getDailyQuests = () => {
  const today = new Date().toDateString();
  const saved = localStorage.getItem("dailyQuestDate");

  if (saved === today) {
    const savedQuests = localStorage.getItem("dailyQuests");
    if (savedQuests) return JSON.parse(savedQuests);
  }

  const shuffled = [...allQuests].sort(() => Math.random() - 0.5);
  const daily = shuffled.slice(0, 5).map((quest) => ({
    ...quest,
    completed: false,
  }));

  localStorage.setItem("dailyQuestDate", today);
  localStorage.setItem("dailyQuests", JSON.stringify(daily));

  return daily;
};