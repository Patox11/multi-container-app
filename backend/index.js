const express = require('express');
const mysql = require('mysql2');

const app = express();

const dbConfig = {
  host: process.env.DB_HOST || 'mysql',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'testdb',
};

let db;

function connectWithRetry(retries = 20, delayMs = 3000) {
  db = mysql.createConnection(dbConfig);
  db.connect((err) => {
    if (err) {
      console.log(`MySQL not ready (${err.code}). Retries left: ${retries}`);
      if (retries <= 0) throw err;
      return setTimeout(() => connectWithRetry(retries - 1, delayMs), delayMs);
    }
    console.log('Connected to MySQL!');
  });
  db.on('error', (err) => console.error('MySQL error:', err.code));
}
connectWithRetry();

app.get('/', (req, res) => {
  res.send('Node.js app running via Nginx reverse proxy!');
});

app.get('/db', (req, res) => {
  db.query('SELECT NOW() AS server_time, DATABASE() AS db_name', (err, rows) => {
    if (err) return res.status(500).json({ status: 'error', message: err.code });
    res.json({ status: 'connected', database: rows[0].db_name, server_time: rows[0].server_time });
  });
});

app.listen(3000, () => console.log('App listening on port 3000'));
