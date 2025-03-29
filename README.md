# Mini Data Query Simulation Engine
📌 Repository Description
🚀 Mini Data Query Simulation Engine | AI-powered backend for natural language data queries.

A lightweight Node.js + Express.js backend that simulates AI-powered data query processing using SQLite. This project converts natural language queries into pseudo-SQL statements and returns mock database responses.

🔹 Tech Stack: Node.js, Express.js, SQLite, dotenv
🔹 Features:
✅ Convert natural queries → SQL ✨
✅ Validate query feasibility ✅
✅ Secure API with authentication 🔑
✅ Deployable on Render 🚀

📜 Endpoints:

/query → Converts natural queries to SQL & returns results

/explain → Explains the query logic

/validate → Checks if the query is valid

🎯 How to Use: Clone, Install, Run!
💡 Deployed API: [[Render URL](https://mini-query-engine-e2lg.onrender.com)]
## Setup
1. Clone the repository:
   ```
   git clone <https://github.com/DiptanshuVishwa/mini-query-engine>
   ```
2. Install dependencies:
   ```
   npm install express sqlite3 dotenv body-parser
   ```
3. Run the server:
   ```
   node server.js
   ```
4. Use Postman or cURL to test.

## API Endpoints
- **POST /query**  
  - Request: `{ "naturalQuery": "Show total sales in Q1 2024." }`
  - Headers: `{ "x-api-key": "ae2cf5ee59ea362424c039aa4e0c472041b07d1e9f6212554136fe124944c71f" }`
  - Response: `{ "query": "SELECT SUM(amount) FROM sales WHERE quarter = 'Q1 2024'", "result": {...} }`

- **POST /explain**  
  - Request: `{ "naturalQuery": "Show total sales in Q1 2024." }`
  - Response: `{ "explanation": "Retrieves total sales for Q1 2024." }`

- **POST /validate**  
  - Request: `{ "naturalQuery": "Show total sales in Q1 2024." }`
  - Response: `{ "valid": true }`
