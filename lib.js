// Import required packages
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3500;

app.use(cors());
app.use(bodyParser.json());

// Set up MySQL connection
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'gnani@2005',
  database: 'library'
});

// Define API endpoints

// Signup
app.post('/signup', (req, res) => {
  const { email, password } = req.body;

  const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
  db.query(sql, [email, password], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Database error');
    } else {
      console.log('User signup successful');
      res.send('Sign up successful');
    }
  });
});

// Signin
app.post('/signin', (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Database error');
    } else if (results.length > 0) {
      res.send('Login successful');
    } else {
      res.status(404).send('Login failed');
    }
  });
});

// Add Book
app.post('/addbook', (req, res) => {
  const { name, price } = req.body;

  const sql = 'INSERT INTO books (name, price, status) VALUES (?, ?, "available")';
  db.query(sql, [name, price], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Database error');
    } else {
      console.log('Book added successfully');
      res.send('Book added successfully');
    }
  });
});

// Take Book
app.post('/takebook', (req, res) => {
  const { name } = req.body;

  const sqlCheck = 'SELECT * FROM books WHERE name = ? AND status = "available"';
  const sqlUpdate = 'UPDATE books SET status = "not available" WHERE name = ?';

  db.query(sqlCheck, [name], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Database error');
    } else if (results.length > 0) {
      db.query(sqlUpdate, [name], (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Database error');
        } else {
          res.send('Now the book is yours');
        }
      });
    } else {
      res.send('Book has been taken by someone else');
    }
  });
});

// Return Book
app.post('/returnbook', (req, res) => {
  const { name } = req.body;

  const sqlCheck = 'SELECT * FROM books WHERE name = ? AND status = "not available"';
  const sqlUpdate = 'UPDATE books SET status = "available" WHERE name = ?';

  db.query(sqlCheck, [name], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Database error');
    } else if (results.length > 0) {
      db.query(sqlUpdate, [name], (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Database error');
        } else {
          res.send('Book returned successfully');
        }
      });
    } else {
      res.send('Book is not available for return');
    }
  });
});

// Delete Book
app.post('/deletebook', (req, res) => {
  const { name } = req.body;

  const sqlCheck = 'SELECT * FROM books WHERE name = ? AND status = "available"';
  const sqlDelete = 'DELETE FROM books WHERE name = ?';

  db.query(sqlCheck, [name], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Database error');
    } else if (results.length > 0) {
      db.query(sqlDelete, [name], (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Database error');
        } else {
          res.send('Book deleted successfully');
        }
      });
    } else {
      res.send('Book is not available for deletion');
    }
  });
});

// Show All Books
// Show All Books
app.get('/showallbooks', (req, res) => {
    const sql = 'SELECT name,price FROM books'; // Only selecting name and price
  
    db.query(sql, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send('Database error');
      } else {
        res.json(results); // Sending only name and price in the response
      }
    });
  });
  

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});