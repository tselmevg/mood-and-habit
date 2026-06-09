import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('habits.db');

export function initDB() {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS habit (
      habit_id INTEGER PRIMARY KEY,
      habit_name TEXT NOT NULL,
      max_habit_num INTEGER
    );

    CREATE TABLE IF NOT EXISTS habit_log (
      habit_id INTEGER,
      date TEXT,
      habit_num INTEGER,
      FOREIGN KEY (habit_id) REFERENCES habit(habit_id),
      UNIQUE(habit_id, date)
    );

    CREATE TABLE IF NOT EXISTS mood_log (
      date TEXT,
      mood_num INTEGER
    );
  `);
}

export function addHabit(name, type, maxCount) {
  db.runSync(
    'INSERT INTO habit (habit_name, type, max_habit_num) VALUES (?, ?, ?)',
    [name, type, maxCount]
  );
}

export default db;