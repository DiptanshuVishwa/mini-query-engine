const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(process.env.DB_NAME, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite database.');

        db.run(`CREATE TABLE IF NOT EXISTS sales (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            amount INTEGER,
            quarter TEXT
        )`);
    }
});

module.exports = db;