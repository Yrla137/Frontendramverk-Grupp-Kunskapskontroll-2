require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 5000;

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Imports data from planets.json to populate our planets table on server start if it's empty
const planets = require('./data/planets.json');

// secret key
const JWT_SECRET = process.env.JWT_SECRET || 'super_hemlig_rymd_nyckel';

// Middleware
app.use(cors()); // let localhost find us
app.use(express.json()); // give us the JSON data


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

// SEARCH ROUTE - This is a simple example and can be expanded with more complex search logic and database queries.
app.get('/api/search', (req, res) => {
  const query = req.query.query?.toLowerCase() || '';

  const results = planets.filter((planet) => {
    return (
      planet.name?.toLowerCase().includes(query) ||
      planet.title?.toLowerCase().includes(query) ||
      planet.description?.toLowerCase().includes(query)
    );
  });

  res.json(results);
});

// Get homepage popular topics -
// This is currently returning the first 3 planets from our mockdata, but can be expanded to use real popularity metrics and database queries.
app.get('/api/popular-topics', (req, res) => {
  res.json(planets.slice(0, 3));
});


// SEARCH HISTORY ROUTES //
// Get search history for a user
app.get('/api/search-history/:userId', (req, res) => {

  const userId = req.params.userId;

  db.all(
    `
    SELECT *
    FROM search_history
    WHERE user_id = ?
    ORDER BY created_at DESC
    `,
    [userId],
    (err, rows) => {

      if (err) {
        return res.status(500).json({
          error: err.message
        });
      }

      res.json(rows);
    }
  );
});

// Save a new search term to history
app.post('/api/search-history', (req, res) => {

  const {
    userId,
    searchTerm
  } = req.body;

  db.run(
    `
    INSERT OR IGNORE INTO search_history
    (
      user_id,
      search_term
    )
    VALUES (?, ?)
    `,
    [userId, searchTerm],

    function(err) {

      if (err) {
        return res.status(500).json({
          error: err.message
        });
      }

      res.json({
        id: this.lastID,
        success: true
      });
    }
  );
});

// Delete a specific search history item (based on item id)
app.delete('/api/search-history/:id', (req, res) => {

  db.run(
    `
    DELETE FROM search_history
    WHERE id = ?
    `,
    [req.params.id],

    function(err) {

      if (err) {
        return res.status(500).json({
          error: err.message
        });
      }

      res.json({
        success: true
      });
    }
  );
});

// Delete all search history for a user
app.delete(
  '/api/search-history/user/:userId',
  (req, res) => {

    db.run(
      `
      DELETE FROM search_history
      WHERE user_id = ?
      `,
      [req.params.userId],

      function(err) {

        if (err) {
          return res.status(500).json({
            error: err.message
          });
        }

        res.json({
          success: true
        });
      }
    );
  }
);

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