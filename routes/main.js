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



//This route is to bypass authentication for demo day. Use id 1
router.get('/', (req, res)=>{
 
 const ID =  req.session.user_id;
 const user = {user_id: ID}
console.log(user);
  userQueries.getItems()
  .then((items)=>{
    res.render("index", { items, user });
  })
})

router.get('/favourites', (req, res)=>{
  res.render('/favourites');
})

router.get('/messages', (req, res)=>{
  res.render('messages');
})

router.post('/', (req, res)=>{
req.session.user_id = req.body.user_id
res.redirect('/');
})

module.exports = router;
