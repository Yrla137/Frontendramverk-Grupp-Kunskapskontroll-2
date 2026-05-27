const allQuests = [
  { id: 1, title: "Check today's Astronomy Picture of the Day", points: 10, type: "apod" },
  { id: 2, title: "Read about Mars", points: 10, type: "explore", link: "/explore/mars" },
  { id: 3, title: "Take the Venus quiz", points: 10, type: "quiz", link: "/explore/venus/quiz" },
  { id: 4, title: "Explore the Moon", points: 10, type: "explore", link: "/explore/moon" },
  { id: 5, title: "Learn about Jupiter", points: 10, type: "explore", link: "/explore/jupiter" },
  { id: 6, title: "Take the Earth quiz", points: 10, type: "quiz", link: "/explore/earth/quiz" },
  { id: 7, title: "Read about Saturn's rings", points: 10, type: "explore", link: "/explore/saturn" },
  { id: 8, title: "Explore the asteroid belt", points: 10, type: "explore", link: "/explore/asteroid-belt" },
  { id: 9, title: "Take the Mars quiz", points: 10, type: "quiz", link: "/explore/mars/quiz" },
  { id: 10, title: "Learn about the Sun", points: 10, type: "explore", link: "/explore/sun" },
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