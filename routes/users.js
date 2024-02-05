/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const cookieSession = require('cookie-session');
const { getUserItems } = require('../db/database.js');

router.use(cookieSession({
  name: 'session',
  keys: ["1"],
}));

router.get('/', (req, res) => {
  res.render('users');
});

router.get('/:id/items', (req, res) => {
  const ID = req.session.user_id;
  const user = {user_id: ID}
  getUserItems(user)
    .then((items) => {
      
      res.render('user_items', { items, user });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
