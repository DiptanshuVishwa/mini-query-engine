const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000; // Fix typo in PORT variable

app.use(bodyParser.json());

const db = new sqlite3.Database(process.env.DB_NAME, (err) => {
    if (err) {
        console.error("Database connection error: ", err.message);
    } else {
        console.log(`connected to the SQLite database: ${process.env.DB_NAME}`);
        db.run("CREATE TABLE IF NOT EXISTS sales (id INTEGER PRIMARY KEY, amount INTEGER, quarter TEXT)", (err) => {
            if (err) {
                console.error("Error creating table: ", err.message);
            } else {
                console.log("Sales table ensured.");
                db.get("SELECT COUNT(*) AS count FROM sales", (err, row) => {
                    if (err) {
                        console.error("Error checking table contents: ", err.message);
                    } else if (row.count === 0) {
                        db.run("INSERT INTO sales (amount, quarter) VALUES (10000, 'Q1 2024')", (err) => {
                            if (err) {
                                console.error("Error inserting data: ", err.message);
                            } else {
                                console.log("Sample data inserted into sales table.");
                            }
                        });
                    }
                });
            }
        });
    }
});

const authenticate = (req, res, next) => {
    const apiKey = req.headers["x-api-key"];
    if (apiKey !== process.env.API_KEY) {
        return res.status(403).json({ error: "Unauthorized" });
    }
    next();
};

const convertToSQL = (query) => {
    if (query.toLowerCase().includes("total sales in q1 2024")) {
        return "SELECT SUM(amount) FROM sales WHERE quarter = 'Q1 2024'";
    }
    return "Unsupported query";
};

app.get('/', (req, res) => {
    res.send("Mini Query Engine API is running! Use /query, /explain, or /validate endpoints.");
});

app.post("/query", authenticate, (req, res) => {
    const { naturalQuery } = req.body; 
    const sqlQuery = convertToSQL(naturalQuery);
    if (sqlQuery === "Unsupported query") {
        return res.status(400).json({ error: "Query not supported" });
    }
    db.get(sqlQuery, [], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ query: sqlQuery, result: row }); 
    });
});

app.post("/explain", authenticate, (req, res) => {
    const { namturalQuery } = req.body;
    res.json({ namturalQuery, explaination: "This query retrieves total sales for Q1 2024." });
});

app.post("/validate", authenticate, (req, res) => {
    const { namturalQuery } = req.body;
    const isValid = convertToSQL(namturalQuery) !== "Unsupported query";
    res.json({ namturalQuery, valid: isValid });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});