const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('mysql');

const app = express();

// Handlebars Middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(express.urlencoded({ extended: false }));

// Create MySQL Connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Steve461',
  database: 'scriptures',
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// API endpoint to get the daily scripture
app.get('/get-daily-scripture', (req, res) => {
  // Get a random scripture from the database
  const query = 'SELECT * FROM s_scriptures ORDER BY RAND() LIMIT 1';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error retrieving scripture from MySQL:', err);
      res.sendStatus(500);
    } else {
      if (results && results.length > 0) {
        const selectedScripture = results[0].verse;
        res.render('daily-scripture', { scripture: selectedScripture });
      } else {
        console.log('No scriptures found in the database');
        res.sendStatus(404);
      }
    }
  });
});

// Set static folder
app.use(express.static('public'));

// Render homepage
app.get('/', (req, res) => {
  res.render('index');
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
