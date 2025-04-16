import express, { Request, Response } from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';

const app = express();
const port = 3000;

app.use(cors({
  origin: 'http://localhost:5173'
}));

const path = require('path');
const db = new sqlite3.Database(path.resolve(__dirname, './database/HouseSalesSeattle.db'), (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  }
  else {
    console.log('Connected to the SQlite database');
  }
});

// Route to get SalesID:s with pagination
app.get('/SalesData', (req, res) => {
  // Set default page and limit
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;  // Get 10 records at a time
  const offset = (page - 1) * limit;

  const query = 'SELECT * FROM HouseSalesSeattle LIMIT ? OFFSET ?';

  db.all(query, [limit, offset], (err, rows) => {
    if (err) {
      res.status(500).send('Error reading data from database');
      console.error(err);
      return;
    }

    if (!rows || rows.length === 0)
      {
        console.warn('No data found for this query');
      }

    res.json({SalesData: rows});
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});