/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/getItems.js');
const cookieSession = require('cookie-session');

router.use(cookieSession({
name: 'session',
keys: ["1"],

// Cookie Options

}));

router.get('/', (req, res) => {
    getAllItems()
      .then(items => {
        res.render("index", { items })
      })
      .catch(error => {
        console.log(error);
      });
  });

//This route is to bypass authentication for demo day. Use id 1
router.get('/:id', (req, res)=>{
  req.session.user_id = req.params.id;
  userQueries.getItems()
  .then((items)=>{
    res.render("index", { items });
  })
})

module.exports = router;
