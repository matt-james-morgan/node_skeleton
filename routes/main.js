/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/getItems.js');
const messageQueries = require('../db/queries/getMessages.js');
const faveItemsQuery = require('../db/queries/getFaveItems.js')
const cookieSession = require('cookie-session');
const { getAllItems, getFaveItems } = require('../db/database');


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

router.get('/messages', (req, res)=>{
  const ID = req.session.user_id;
  const user = {user_id: ID}
  messageQueries.getMessages()
  .then((messages) => {
    res.render("messages", {messages, user});
  });
})

router.get('/favourites', (req, res)=>{
  const ID = req.session.user_id;
  const user = {user_id: ID}
  faveItemsQuery.getFaveItems(user.user_id)
  .then((items)=>{
    res.render("favourites", { items, user });
  })
  
})

router.get('/:id', (req, res) => {
  // get id of item that was clicked on. Change ID from string to integer.
  const itemID = parseInt(req.params.id, 10);

  getAllItems()
    .then(items => {
      // check for item that matches id in req.params
      const item = items.find(item => item.id === itemID);

      if (item) {
        console.log(item);
        res.render("view_item", { item });
      } else {
        res.status(404).send('Item not found')
      }
    })
    .catch(err => {
      console.log(err);
    })

});




//Lets user login and redirects to homepage
router.post('/', (req, res)=>{
req.session.user_id = req.body.user_id
res.redirect('/');
})

module.exports = router;
