/* const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mysql = require('mysql');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'mydatabase'
  });
  
  connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
  });
  app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
  
    const sql = `SELECT * FROM users WHERE email = '${email}'`;
    connection.query(sql, (err, result) => {
      if (err) throw err;
  
      if (result.length > 0) {
        const user = result[0];
        if (password === user.password) {
          req.session.user = user;
          res.cookie('user_id', user.id);
          res.redirect('/secure_page');
        } else {
          res.render('login', { error: 'Invalid email or password' });
        }
      } else {
        res.render('login', { error: 'Invalid email or password' });
      }
    });
  });
  
  function authenticate(req, res, next) {
    if (req.session.user) {
      next();
    } else {
      res.redirect('/login');
    }
  }
  
  app.get('/secure_page', authenticate, (req, res) => {
    res.render('secure_page', { user: req.session.user });
  });
  
  app.get('/logout', (req, res) => {
    req.session.destroy();
    res.clearCookie('user_id');
    res.redirect('/');
  });
  */