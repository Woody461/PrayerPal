const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const routes = require('./controllers');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: 'a secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/images', express.static('images'));


app.get('/get-daily-scripture', (req, res) => {
  const query = 'SELECT * FROM VerseModel ORDER BY RAND() LIMIT 1';

  sequelize.query(query, { type: sequelize.QueryTypes.SELECT })
    .then((results) => {
      if (results && results.length > 0) {
        const selectedScripture = results[0];

        res.json({
          verse: selectedScripture.verse,
          book: selectedScripture.book,
          chapter: selectedScripture.chapter,
          verse_number: selectedScripture.verse_number
        });

      } else {
        console.log('No scriptures found in the database');
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error('Error retrieving scripture from MySQL:', err);
      res.sendStatus(500);
    });
});

app.get('/', (req, res) => {
  const images = ['favicon.png', 'Heavens Gate.png', 'Heavens List.png', 'list.png', 'Pink Clouds.png', 'PinkClouds Header.png', 'PrayerPal.png', 'quote.png', 'Take your PrayerPal Quiz.png'];

  res.render('index', { images });
});

app.get('/homepage', (req, res) => {
  res.render('homepage');
});

app.get('/scripture', (req, res) => {
  res.render('daily-scripture');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/quiz', (req, res) => {
  res.render('quiz');
});

app.get('/signup', (req, res) => {
  res.render('signup');
});

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});
