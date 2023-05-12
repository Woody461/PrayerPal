const mysql = require('mysql');

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
          res.redirect('/secure_page');
        } else {
          res.render('login', { error: 'Invalid email or password' });
        }
      } else {
        res.render('login', { error: 'Invalid email or password' });
      }
    });
  });

  app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
  });