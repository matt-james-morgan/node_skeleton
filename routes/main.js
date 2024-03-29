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
const cookieSession = require('cookie-session');
const { getAllItems,  getFaveItems,  getAllMessageCards, addToFavourites, getItemID } = require('../db/database');
const { timeAgo } = require('../utils/helpers.js');


router.use(cookieSession({
name: 'session',
keys: ["1"],

// Cookie Options

}));



//This route is to bypass authentication for demo day. Use id 1
router.get('/', (req, res)=>{

 const ID =  req.session.user_id;
 const user = {user_id: ID};

  getAllItems()
  .then((items)=>{
    items.forEach((item) => {
      item.timeago = timeAgo(item.created_at);
    })
    res.render("index", { items, user });
  })
})

// Find all messages associated with the logged in user
router.get('/messages', (req, res)=>{
  const ID = req.session.user_id;
  const user = {user_id: ID}
  getAllMessageCards(user)
  .then((messages) => {
    res.render("messages", {messages, user})
  });
});

router.get('/messages/:id', (req, res) => {
  const ID = req.session.user_id;
  const user = {user_id: ID}

  const messageID = parseInt(req.params.id);
  req.session.roomID = messageID;

  getAllItems()
  .then(items => {
    const item = items.find(item => item.id === messageID);
    console.log("this is item, ", item)
    res.render("message_window", { item , user});
  })
  .catch(err => {
    console.log("Threw the following error: ", err);
  })
});

router.get('/messages/new-message/:id', (req, res) => {
  const ID = req.session.user_id;
  const user = {user_id: ID}
  const itemID = parseInt(req.params.id);
  req.session.roomID = itemID;

    res.render("new-message", { ID , user, itemID});
})

router.post('/messages/new-message/:id', (req, res) => {
    return res.redirect('/messages');
})


router.get('/favourites', (req, res)=>{
  const ID = req.session.user_id;
  const user = {user_id: ID}
  getFaveItems(user.user_id)
  .then((items)=>{
    res.render("favourites", { items, user });
  })

})

router.get('/:id', (req, res) => {
  // get id of item that was clicked on. Change ID from string to integer.
  const ID = req.session.user_id;
  const user = {user_id: ID}
  const itemID = parseInt(req.params.id, 10);

  getAllItems()
    .then(items => {
      // check for item that matches id in req.params
      const item = items.find(item => item.id === itemID);

      if (item) {
        const timeSincePosted = timeAgo(item.created_at);

        res.render("view_item", { item, timeSincePosted, user });
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
req.session.user_id = req.body.user_id;
res.redirect('/');
})

// add item to favourites
router.post("/favourites/:id", (req, res) => {

  const itemID = parseInt(req.params.id);
  const buyerID = req.session.user_id;
  const ID = buyerID;
  const user = {user_id: ID};
  console.log("item, buyer", itemID, buyerID);

  addToFavourites(itemID, buyerID);
  res.render("added_to_favourites", { user });

});

module.exports = router;
