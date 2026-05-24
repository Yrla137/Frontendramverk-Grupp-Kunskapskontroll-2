require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Tillåter React (ofta localhost:5173 eller 3000) att anropa oss
app.use(express.json()); // Gör att vi kan ta emot JSON-data (t.ex. vid login)


// Julias MOCKDATA //
//---------------------------------------------------------------------//

// Temporary mock API imports
let spaceApiModulePromise;

function loadSpaceApi() {
  if (!spaceApiModulePromise) {
    spaceApiModulePromise = import("../src/MOCKDATA(Julia)/spaceApi.js");
  }

  return spaceApiModulePromise;
}


// Temporary mockdata routes.
// These endpoints are structured like real backend routes
// so frontend components/hooks will not need major changes
// when connected to the final database/API solution.

// Get all searchable data
app.get("/api/search", async (req, res) => {
  try {
    const { getAllSpaceData } = await loadSpaceApi();
    const data = getAllSpaceData();

    res.json(data);
  } catch (error) {
    console.error("Kunde inte ladda mockdata för /api/search:", error.message);
    res.status(500).json({ error: "Kunde inte hämta sökdata" });
  }
});

// Get homepage popular topics
app.get("/api/popular-topics", async (req, res) => {
  try {
    const { getPopularTopics } = await loadSpaceApi();
    const topics = getPopularTopics();

    res.json(topics);
  } catch (error) {
    console.error("Kunde inte ladda mockdata för /api/popular-topics:", error.message);
    res.status(500).json({ error: "Kunde inte hämta populära ämnen" });
  }
});
//---------------------------------------------------------------------//


// --- ROUTES ---
// Test-route för att se att servern lever
app.get('/api/status', (req, res) => {
  res.json({ message: 'Rymd-servern är online! 🚀' });
});

// Hämta planetdata via API-Ninjas (Backend-For-Frontend)
app.get('/api/planets', async (req, res) => {
  try {
    // Fråga API-Ninjas efter data
    // api-ninjas planet endpoint tar emot 'name' som query parameter
    const planetName = req.query.name || 'Mars'; 
    
    const response = await axios.get(`https://api.api-ninjas.com/v1/planets?name=${planetName}`, {
      headers: {
        'X-Api-Key': process.env.API_NINJAS_KEY
      }
    });

    // Skicka tillbaka datan till React
    res.json(response.data);
  } catch (error) {
    console.error('Ett fel uppstod vid hämtning från API-Ninjas:', error.message);
    res.status(500).json({ error: 'Kunde inte hämta planetdata' });
  }
});

// Exempel route - Hämta alla användare (Read)
app.get('/api/users', (req, res) => {
  db.all('SELECT id, username, points, streak_count FROM users', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// starta servern
app.listen(PORT, () => {
  console.log(`🚀 Servern körs på http://localhost:${PORT}`);
});