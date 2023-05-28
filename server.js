const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('mysql');
const routes = require('./controllers');
const session = require('express-session');


/////
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
////
const PORT = process.env.PORT || 3001;
const sess = {
  secret: 'a secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));


// Handlebars Middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create MySQL Connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB_NAME,
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
app.get('/daily-scripture', (req, res) => {
  // Get a random scripture from the database
  const query = 'SELECT * FROM s_scriptures ORDER BY RAND() LIMIT 1';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error retrieving scripture from MySQL:', err);
      res.sendStatus(500);
    } else {
      if (results && results.length > 0) {
        const selectedScripture = results[0];
        res.render('/', { scripture: selectedScripture });
      } else {
        console.log('No scriptures found in the database');
        res.sendStatus(404);
      }
    }
  });

  const images = ['favicon.png', 'Heavens Gate.png', 'Heavens List.png', 'list.png', 'Pink Clouds.png', 'PinkClouds Header.png', 'PrayerPal.png', 'quote.png', 'Take your PrayerPal Quiz.png'];

  res.render('index', { images });

});

// API endpoint to insert a scripture
app.get('/insert-scripture', (req, res) => {
  // Define the scripture data
  const verses = [
    {
      verse: 'The LORD is my shepherd; I shall not want.',
      book: 'Psalms',
      chapter: 23,
      verseNumber: 1,
    },
    {
      verse: 'For God so loved the world that he gave his one and only Son.',
      book: 'John',
      chapter: 3,
      verseNumber: 16,
    },
    {
      verse: 'Trust in the LORD with all your heart, and do not lean on your own understanding.',
      book: 'Proverbs',
      chapter: 3,
      verseNumber: 5,
    },
    {
      verse: 'I can do all things through Christ who strengthens me.',
      book: 'Philippians',
      chapter: 4,
      verseNumber: 13,
    },
    {
      verse: 'The fear of the LORD is the beginning of wisdom.',
      book: 'Proverbs',
      chapter: 9,
      verseNumber: 10,
    },
  ];
  // Select a random verse
  const randomVerse = verses[Math.floor(Math.random() * verses.length)];
  // Prepare the INSERT query
  const query = 'INSERT INTO s_scriptures (verse, book, chapter, verse_number) VALUES (?, ?, ?, ?)';
  const values = [randomVerse.verse, randomVerse.book, randomVerse.chapter, randomVerse.verseNumber];
  // Execute the INSERT query
  connection.query(query, values, (err, result) => {
    if (err) {
      console.error('Error inserting scripture:', err);
      res.sendStatus(500);
    } else {
      console.log('Scripture inserted successfully');
      res.sendStatus(200);
    }
  });
});
// Set static folder
app.use(express.static('public'));

// Set static folder
app.use(express.static('public'));
app.use('/images', express.static('images'));

// Render homepage
app.get('/homepage', (req, res) => {
  res.render('homepage');
});
// Render index
app.get('/index', (req, res) => {
  res.render('index');
});
// Render the scripture page
app.get('/scripture', (req, res) => {
  res.render('scripture');
});
// Render the login page
app.get('/login', (req, res) => {
  res.render('login');
});

// Render the quiz page
app.get('/quiz', (req, res) => {
  res.render('quiz');
});

// Render the signup page
app.get('/signup', (req, res) => {
  res.render('signup');
});

// Define a route to render the template

app.get('/', (req, res) => {
  const images = ['favicon.png', 'Heavens Gate.png', 'Heavens List.png', 'list.png', 'Pink Clouds.png', 'PinkClouds Header.png', 'PrayerPal.png', 'quote.png', 'Take your PrayerPal Quiz.png'];

  res.render('index', { images });
});


app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});
