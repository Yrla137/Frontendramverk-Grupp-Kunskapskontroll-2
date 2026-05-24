const planets = [
  {
    id: "sun",
    name: "Sun",
    type: "Star",
    tagline: "The heart of our solar system",
    color: "#FFD700",
    diameter: "1,391,000 km",
    distanceFromSun: null,
    description:
      "The Sun is the star at the center of our solar system. It is a nearly perfect ball of hot plasma, heated to incandescence by nuclear fusion reactions in its core, radiating energy as light and heat.",
    facts: [
      { label: "Age", value: "4.6 billion years" },
      { label: "Surface Temperature", value: "5,500°C" },
      { label: "Core Temperature", value: "15 million °C" },
      { label: "Mass", value: "333,000 x Earth" },
      { label: "Composition", value: "73% Hydrogen, 25% Helium" },
    ],
    explored: true,
    quizCompleted: false,
  },
  {
    id: "mercury",
    name: "Mercury",
    type: "Planet",
    tagline: "The smallest and fastest planet",
    color: "#B5B5B5",
    diameter: "4,879 km",
    distanceFromSun: "57.9 million km",
    description:
      "Mercury is the smallest planet in our solar system and the closest to the Sun. Despite being closest to the Sun, it is not the hottest planet — that title belongs to Venus.",
    facts: [
      { label: "Day Length", value: "59 Earth days" },
      { label: "Year Length", value: "88 Earth days" },
      { label: "Moons", value: "0" },
      { label: "Surface Temperature", value: "-180°C to 430°C" },
    ],
    explored: true,
    quizCompleted: true,
  },
  {
    id: "venus",
    name: "Venus",
    type: "Planet",
    tagline: "Earth's scorching twin",
    color: "#E8CDA0",
    diameter: "12,104 km",
    distanceFromSun: "108.2 million km",
    description:
      "Venus is the second planet from the Sun and the hottest planet in our solar system. Its thick atmosphere traps heat in a runaway greenhouse effect, making it even hotter than Mercury.",
    facts: [
      { label: "Day Length", value: "243 Earth days" },
      { label: "Year Length", value: "225 Earth days" },
      { label: "Moons", value: "0" },
      { label: "Surface Temperature", value: "465°C" },
      { label: "Atmosphere", value: "96.5% Carbon Dioxide" },
    ],
    explored: false,
    quizCompleted: false,
  },
  {
    id: "earth",
    name: "Earth",
    type: "Planet",
    tagline: "Our home world",
    color: "#4A90D9",
    diameter: "12,742 km",
    distanceFromSun: "149.6 million km",
    description:
      "Earth is the third planet from the Sun and the only known planet to harbor life. About 71% of its surface is covered in water, earning it the nickname 'The Blue Planet'.",
    facts: [
      { label: "Day Length", value: "24 hours" },
      { label: "Year Length", value: "365.25 days" },
      { label: "Moons", value: "1" },
      { label: "Surface Temperature", value: "-89°C to 57°C" },
      { label: "Age", value: "4.54 billion years" },
    ],
    explored: true,
    quizCompleted: false,
  },
  {
    id: "mars",
    name: "Mars",
    type: "Planet",
    tagline: "The Red Planet",
    color: "#E55934",
    diameter: "6,779 km",
    distanceFromSun: "227.9 million km",
    description:
      "Mars is the fourth planet from the Sun and the second-smallest planet in our solar system. Known as the Red Planet due to iron oxide on its surface, Mars has been a primary target for space exploration.",
    facts: [
      { label: "Day Length", value: "24 hours 37 minutes" },
      { label: "Year Length", value: "687 Earth days" },
      { label: "Moons", value: "2 (Phobos, Deimos)" },
      { label: "Surface Temperature", value: "-140°C to 20°C" },
      { label: "Tallest Mountain", value: "Olympus Mons (21.9 km)" },
    ],
    explored: true,
    quizCompleted: true,
  },
  {
    id: "jupiter",
    name: "Jupiter",
    type: "Planet",
    tagline: "The king of planets",
    color: "#D4A574",
    diameter: "139,820 km",
    distanceFromSun: "778.5 million km",
    description:
      "Jupiter is the largest planet in our solar system. This gas giant is more than twice as massive as all the other planets combined and is famous for its Great Red Spot, a storm larger than Earth.",
    facts: [
      { label: "Day Length", value: "9 hours 55 minutes" },
      { label: "Year Length", value: "11.86 Earth years" },
      { label: "Known Moons", value: "95" },
      { label: "Great Red Spot", value: "Wider than Earth" },
    ],
    explored: false,
    quizCompleted: false,
  },
  {
    id: "saturn",
    name: "Saturn",
    type: "Planet",
    tagline: "The ringed wonder",
    color: "#F4D587",
    diameter: "116,460 km",
    distanceFromSun: "1.43 billion km",
    description:
      "Saturn is the sixth planet from the Sun and is best known for its stunning ring system. These rings are made mostly of ice and rock particles ranging from tiny grains to house-sized chunks.",
    facts: [
      { label: "Day Length", value: "10 hours 42 minutes" },
      { label: "Year Length", value: "29.46 Earth years" },
      { label: "Known Moons", value: "146" },
      { label: "Ring System", value: "7 main rings" },
      { label: "Density", value: "Less than water" },
    ],
    explored: false,
    quizCompleted: false,
  },
  {
    id: "uranus",
    name: "Uranus",
    type: "Planet",
    tagline: "The tilted ice giant",
    color: "#7EC8E3",
    diameter: "50,724 km",
    distanceFromSun: "2.87 billion km",
    description:
      "Uranus is the seventh planet from the Sun and has the most extreme axial tilt of any planet, essentially orbiting on its side. This ice giant has a blue-green color due to methane in its atmosphere.",
    facts: [
      { label: "Day Length", value: "17 hours 14 minutes" },
      { label: "Year Length", value: "84 Earth years" },
      { label: "Known Moons", value: "28" },
      { label: "Axial Tilt", value: "97.77°" },
    ],
    explored: false,
    quizCompleted: false,
  },
  {
    id: "neptune",
    name: "Neptune",
    type: "Planet",
    tagline: "The windiest world",
    color: "#4169E1",
    diameter: "49,244 km",
    distanceFromSun: "4.5 billion km",
    description:
      "Neptune is the eighth and farthest planet from the Sun. This ice giant has the strongest winds in the solar system, reaching speeds of over 2,000 km/h.",
    facts: [
      { label: "Day Length", value: "16 hours 6 minutes" },
      { label: "Year Length", value: "164.8 Earth years" },
      { label: "Known Moons", value: "16" },
      { label: "Wind Speed", value: "Up to 2,100 km/h" },
    ],
    explored: false,
    quizCompleted: false,
  },
  {
    id: "pluto",
    name: "Pluto",
    type: "Dwarf Planet",
    tagline: "The beloved outcast",
    color: "#C9B8A4",
    diameter: "2,377 km",
    distanceFromSun: "5.9 billion km",
    description:
      "Pluto was reclassified from a planet to a dwarf planet in 2006. Despite its small size, Pluto has a complex surface with mountains, valleys, plains, and craters.",
    facts: [
      { label: "Day Length", value: "6.4 Earth days" },
      { label: "Year Length", value: "248 Earth years" },
      { label: "Known Moons", value: "5" },
      { label: "Largest Moon", value: "Charon" },
    ],
    explored: false,
    quizCompleted: false,
  },
  {
    id: "moon",
    name: "The Moon",
    type: "Moon",
    tagline: "Earth's faithful companion",
    color: "#C4C4C4",
    diameter: "3,474 km",
    distanceFromSun: "149.6 million km (with Earth)",
    description:
      "The Moon is Earth's only natural satellite and the fifth largest moon in our solar system. It is the only celestial body beyond Earth that humans have visited.",
    facts: [
      { label: "Distance from Earth", value: "384,400 km" },
      { label: "Orbital Period", value: "27.3 days" },
      { label: "Surface Gravity", value: "1/6 of Earth" },
      { label: "First Human Visit", value: "July 20, 1969" },
    ],
    explored: false,
    quizCompleted: false,
  },
  {
    id: "asteroid-belt",
    name: "Asteroid Belt",
    type: "Region",
    tagline: "A cosmic debris field",
    color: "#8B7D6B",
    diameter: "N/A",
    distanceFromSun: "329-478 million km",
    description:
      "The asteroid belt is a region of space between the orbits of Mars and Jupiter where most of the solar system's asteroids are found. Despite what movies show, asteroids are widely spaced apart.",
    facts: [
      { label: "Location", value: "Between Mars and Jupiter" },
      { label: "Known Asteroids", value: "Over 1 million" },
      { label: "Largest Object", value: "Ceres (940 km)" },
      { label: "Total Mass", value: "~4% of the Moon" },
    ],
    explored: false,
    quizCompleted: false,
  },
];

export const getAllPlanets = () => {
  return Promise.resolve(planets);
};

export const getPlanetById = (id) => {
  const planet = planets.find((p) => p.id === id);
  return Promise.resolve(planet || null);
};

export const getExplorationProgress = () => {
  const total = planets.length;
  const explored = planets.filter((p) => p.explored).length;
  const quizzesCompleted = planets.filter((p) => p.quizCompleted).length;
  return Promise.resolve({
    totalPlanets: total,
    explored,
    quizzesCompleted,
    exploredPercentage: Math.round((explored / total) * 100),
    quizPercentage: Math.round((quizzesCompleted / total) * 100),
  });
};
