const router = require('express').Router();
const {  User } = require('../models');
const authorized = require('../utils/auth');

router.get('/login', (req, res) => {
  try {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
} catch (err) {
  console.log(err);
  res.status(500).json(err);
}
});
router.get('/', authorized, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    
    });

    const user = userData.get({ plain: true });

    res.render('/', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
