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
app.get('/', (req, res) => {
  // Get a random scripture from the database
  const query = 'SELECT * FROM s_scriptures ORDER BY RAND() LIMIT 1';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error retrieving scripture from MySQL:', err);
      res.sendStatus(500);
    } else {
      if (results && results.length > 0) {
        const selectedScripture = results[0];
        res.render('daily-scripture', { scripture: selectedScripture });
      } else {
        console.log('No scriptures found in the database');
        res.sendStatus(404);
      }
    }
  });

  const images = ['favicon.png', 'Heavens Gate.png', 'Heavens List.png', 'list.png', 'Pink Clouds.png', 'PinkClouds Header.png', 'PrayerPal.png', 'quote.png', 'Take your PrayerPal Quiz.png'];

  res.render('index', { images });

});

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
