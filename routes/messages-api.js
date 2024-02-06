/*
 * All routes for Widget Data are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /api/widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const db = require('../db/connection');
const { getAllMessages, getUsername } = require("../db/database");
const cookieSession = require('cookie-session');



router.use(cookieSession({
  name: 'session',
  keys: ["1"],
}));

router.get('/', (req, res) => {
  getAllMessages()
    .then(messages => {
      getUsername(req.session.user_id)
      .then((user)=>{
        res.json({ messages, user})
      }).catch(error => {
        console.log(error);
      });  
    }).catch(error => {
      console.log(error);
    });  
});


module.exports = router;
