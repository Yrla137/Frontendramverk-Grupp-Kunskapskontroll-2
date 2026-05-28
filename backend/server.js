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

// Secret key
const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_space_key';

const { OAuth2Client } = require('google-auth-library');
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Middleware
app.use(cors()); // Allow requests from frontend
app.use(express.json()); // Parse JSON payloads


// PUBLIC ROUTES
app.get('/api/status', (req, res) => {
  res.json({ message: 'AstroWave Server is ONLINE! 🚀' });
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
    console.error('API-Ninjas Fetch Error:', error.message);
    res.status(500).json({ error: 'Could not fetch planet data' });
  }
});

// AUTHENTICATION ROUTES

app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    db.run(
      'INSERT INTO users (username, password_hash) VALUES (?, ?)',
      [username, hashedPassword],
      function(err) {
        if (err) {
          return res.status(400).json({ error: 'Username is already taken!' });
        }
        res.status(201).json({ message: 'Astronaut registered!', userId: this.lastID });
      }
    );
  } catch (error) {
    console.error('Registration error:', error); 
    res.status(500).json({ error: 'Server error during registration' });
  }
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!user) return res.status(401).json({ error: 'Invalid username or password' });

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ error: 'Invalid username or password' });

    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '2h' });
    
    res.json({ 
      message: 'Success!', 
      token, 
      user: { id: user.id, username: user.username, points: user.points, streak_count: user.streak_count, bio: user.bio, avatar_url: user.avatar_url } 
    });
  });
});

app.post('/api/auth/google', async (req, res) => {
  const { credential } = req.body;

  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    
    // Use google-email as username
    const email = payload.email; 
    const googleName = payload.name;
    console.log(`🚀 ${googleName} wants to join the community!`);

    // Check if user is already stored in DB
    db.get('SELECT * FROM users WHERE username = ?', [email], (err, user) => {
      if (err) return res.status(500).json({ error: 'Database error' });

      if (user) {
        // Create normal JWT if user exists
        const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '2h' });
        res.json({ 
          token, 
          user: { id: user.id, username: user.username, points: user.points, streak_count: user.streak_count, bio: user.bio, avatar_url: user.avatar_url } 
        });
      } else {
        // Save new google users to DB with a dummy password
        const dummyPassword = '[GOOGLE_ACCOUNT]'; 
        
        db.run(
          'INSERT INTO users (username, password_hash) VALUES (?, ?)',
          [email, dummyPassword],
          function(err) {
            if (err) return res.status(500).json({ error: 'Could not create Google user' });
            
            const newUserId = this.lastID;
            const token = jwt.sign({ id: newUserId, username: email }, JWT_SECRET, { expiresIn: '2h' });
            
            res.status(201).json({ 
              token, 
              user: { id: newUserId, username: email, points: 0, streak_count: 0, bio: null, avatar_url: null } 
            });
          }
        );
      }
    });
  } catch (error) {
    console.error('Google Auth Error:', error);
    res.status(401).json({ error: 'Invalid Google Token' });
  }
});


// USER PROFILE & GAMIFICATION ROUTES

app.get('/api/users', (req, res) => {
  db.all('SELECT id, username, points, streak_count FROM users', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.get('/api/users/:id/profile', (req, res) => {
  const userId = req.params.id;

  // Add bio and avatar_url to the profile fetch
  db.get('SELECT id, username, points, streak_count, bio, avatar_url FROM users WHERE id = ?', [userId], (err, user) => {
    if (err || !user) return res.status(404).json({ error: 'User not found' });

    // Fetch completed quizzes
    db.all('SELECT planet_id FROM user_planet_progress WHERE user_id = ? AND quiz_completed = 1', [userId], (err, planets) => {
      const completedPlanets = planets ? planets.map(p => p.planet_id) : [];
      
      // Badge Logic
      const badges = [
        { id: 1, name: "First Step", icon: "🚀", earned: true },
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

// Edit Profile (Username, Bio, Avatar)
app.put('/api/users/:id', (req, res) => {
  const { username, bio, avatar_url } = req.body;
  const userId = req.params.id;

  db.run(
    `UPDATE users SET username = ?, bio = ?, avatar_url = ? WHERE id = ?`,
    [username, bio, avatar_url, userId],
    function(err) {
      if (err) {
        return res.status(400).json({ error: 'Username is already taken or invalid.' });
      }
      res.json({ message: 'Profile updated successfully!' });
    }
  );
});

// Delete Account permanently
app.delete('/api/users/:id', (req, res) => {
  const userId = req.params.id;

  db.serialize(() => {
    // Delete relational data first
    db.run(`DELETE FROM user_planet_progress WHERE user_id = ?`, [userId]);
    db.run(`DELETE FROM user_quest_progress WHERE user_id = ?`, [userId]);
    db.run(`DELETE FROM search_history WHERE user_id = ?`, [userId]);
    
    // Finally, delete the actual user
    db.run(`DELETE FROM users WHERE id = ?`, [userId], function(err) {
      if (err) return res.status(500).json({ error: 'Could not delete account' });
      res.json({ message: 'Account deleted forever. Lost in space!' });
    });
  });
});

app.post('/api/progress/quiz', (req, res) => {
  const { userId, planetId, pointsToAward } = req.body;

  db.serialize(() => {
    db.run(
      `INSERT OR REPLACE INTO user_planet_progress (user_id, planet_id, quiz_completed) VALUES (?, ?, 1)`,
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

app.post('/api/progress/quest', (req, res) => {
  const { userId, questId, pointsToAward } = req.body;

  db.serialize(() => {
    db.run(
      `INSERT OR REPLACE INTO user_quest_progress (user_id, quest_id, is_completed) VALUES (?, ?, 1)`,
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


// SEARCH & HISTORY ROUTES

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

app.get('/api/popular-topics', (req, res) => {
  res.json(planets.slice(0, 3));
});

app.get('/api/search-history/:userId', (req, res) => {
  const userId = req.params.userId;
  db.all(`SELECT * FROM search_history WHERE user_id = ? ORDER BY created_at DESC`, [userId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/search-history', (req, res) => {
  const { userId, searchTerm } = req.body;
  db.run(`INSERT INTO search_history (user_id, search_term) VALUES (?, ?)`, [userId, searchTerm], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID });
  });
});

app.delete('/api/search-history/:id', (req, res) => {
  db.run(`DELETE FROM search_history WHERE id = ?`, [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

app.delete('/api/search-history/user/:userId', (req, res) => {
  db.run(`DELETE FROM search_history WHERE user_id = ?`, [req.params.userId], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

// START SERVER
app.listen(PORT, () => {
  console.log(`🚀 AstroWave Server is running on http://localhost:${PORT}`);
});