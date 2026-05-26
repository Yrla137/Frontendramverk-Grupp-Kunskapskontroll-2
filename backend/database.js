const sqlite3 = require('sqlite3').verbose();

// Creates a database file in the project (or opens it if it exists)
const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error('Kunde inte ansluta till databasen:', err.message);
  } else {
    console.log('🌍 Ansluten till SQLite-databasen.');
  }
});

// Creates our 3NF tables
db.serialize(() => {
  // 1. Users
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    points INTEGER DEFAULT 0,
    streak_count INTEGER DEFAULT 0
  )`);

  // 2. Planets
  db.run(`CREATE TABLE IF NOT EXISTS planets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    nasa_ref TEXT
  )`);

  // 3. User_Planet_Progress
  db.run(`CREATE TABLE IF NOT EXISTS user_planet_progress (
    user_id INTEGER,
    planet_id INTEGER,
    quiz_completed BOOLEAN DEFAULT 0,
    PRIMARY KEY (user_id, planet_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (planet_id) REFERENCES planets(id)
  )`);

  // 4. Quests
  db.run(`CREATE TABLE IF NOT EXISTS quests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    description TEXT NOT NULL,
    reward_points INTEGER DEFAULT 0
  )`);

  // 5. User_Quest_Progress (Kopplingstabell)
  db.run(`CREATE TABLE IF NOT EXISTS user_quest_progress (
    user_id INTEGER,
    quest_id INTEGER,
    is_completed BOOLEAN DEFAULT 0,
    PRIMARY KEY (user_id, quest_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (quest_id) REFERENCES quests(id)
  )`);

  // 6. Search_History
  db.run(`CREATE TABLE IF NOT EXISTS search_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    search_term TEXT NOT NULL COLLATE NOCASE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    UNIQUE(user_id, search_term),

    FOREIGN KEY (user_id)
    REFERENCES users(id)
  )`);
  
  console.log('✅ Tables created or already exist.');
});

module.exports = db;