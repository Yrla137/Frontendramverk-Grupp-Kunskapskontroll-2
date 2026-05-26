require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 5000;

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// secret key
const JWT_SECRET = process.env.JWT_SECRET || 'super_hemlig_rymd_nyckel';

// Middleware
app.use(cors()); // let localhost find us
app.use(express.json()); // give us the JSON data


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
    console.error("could not load mockdata for /api/search:", error.message);
    res.status(500).json({ error: "failed to fetch data" });
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


// --- ROUTES ---
app.get('/api/status', (req, res) => {
  res.json({ message: 'Rymd-servern är online! 🚀' });
});

app.get('/api/planets', async (req, res) => {
  try {

    const planetName = req.query.name || 'Mars'; 
    
    const response = await axios.get(`https://api.api-ninjas.com/v1/planets?name=${planetName}`, {
      headers: {
        'X-Api-Key': process.env.API_NINJAS_KEY
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Ett fel uppstod vid hämtning från API-Ninjas:', error.message);
    res.status(500).json({ error: 'Kunde inte hämta planetdata' });
  }
});

app.get('/api/users', (req, res) => {
  db.all('SELECT id, username, points, streak_count FROM users', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// --- PROGRESS & GAMIFICATION ROUTES ---

app.post('/api/progress/quiz', (req, res) => {
  const { userId, planetId, pointsToAward } = req.body;

  // Insert or ignore if it already exists, then update it to completed
  db.serialize(() => {

    db.run(
      `INSERT OR REPLACE INTO user_planet_progress (user_id, planet_id, quiz_completed) 
       VALUES (?, ?, 1)`,
      [userId, planetId]
    );

    db.run(
      `UPDATE users SET points = points + ? WHERE id = ?`,
      [pointsToAward, userId],
      function(err) {
        if (err) return res.status(500).json({ error: 'Could not update points' });
        res.json({ message: 'Quiz completed and points awarded!' });
      }
    );
  });
});

// completed daily
app.post('/api/progress/quest', (req, res) => {
  const { userId, questId, pointsToAward } = req.body;

  db.serialize(() => {
    db.run(
      `INSERT OR REPLACE INTO user_quest_progress (user_id, quest_id, is_completed) 
       VALUES (?, ?, 1)`,
      [userId, questId]
    );

    db.run(
      `UPDATE users SET points = points + ? WHERE id = ?`,
      [pointsToAward, userId],
      (err) => {
        if (err) return res.status(500).json({ error: 'Could not update points' });
        res.json({ message: 'Quest completed!' });
      }
    );
  });
});

// Get users full profile
app.get('/api/users/:id/profile', (req, res) => {
  const userId = req.params.id;

  db.get('SELECT id, username, points, streak_count FROM users WHERE id = ?', [userId], (err, user) => {
    if (err || !user) return res.status(404).json({ error: 'User not found' });

    // Fetch completed quiz
    db.all('SELECT planet_id FROM user_planet_progress WHERE user_id = ? AND quiz_completed = 1', [userId], (err, planets) => {
      
      const completedPlanets = planets ? planets.map(p => p.planet_id) : [];
      
      // badge Logic
      const badges = [
        { id: 1, name: "First Step", icon: "🚀", earned: true }, // For everyone!
        { id: 2, name: "Mars Expert", icon: "🔴", earned: completedPlanets.includes(4) },
        { id: 3, name: "Point Hoarder", icon: "💎", earned: user.points >= 500 },
        { id: 4, name: "Streak Master", icon: "🔥", earned: user.streak_count >= 3 }
      ];

      res.json({
        ...user,
        completedPlanets,
        badges
      });
    });
  });
});

// authentication

app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    db.run(
      'INSERT INTO users (username, password_hash) VALUES (?, ?)',
      [username, hashedPassword],
      function(err) {
        if (err) {
          return res.status(400).json({ error: 'Användarnamnet är upptaget!' });
        }
        res.status(201).json({ message: 'Rymdapa registrerad!', userId: this.lastID });
      }
    );

    } catch (error) {
      // console.error(error), because ESLint warning
      console.error('Registration error:', error); 
      res.status(500).json({ error: 'Server error during registration' });
    }
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
    if (err) return res.status(500).json({ error: 'Databasfel' });
    if (!user) return res.status(401).json({ error: 'Fel användarnamn eller lösenord' });

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ error: 'Fel användarnamn eller lösenord' });

    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '2h' });
    
    res.json({ 
      message: 'Success!', 
      token, 
      user: { id: user.id, username: user.username, points: user.points } 
    });
  });
});

// start server
app.listen(PORT, () => {
  console.log(`🚀 Servern körs på http://localhost:${PORT}`);
});