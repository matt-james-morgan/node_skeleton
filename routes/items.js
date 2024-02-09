/*
 * All routes for Widget Data are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /api/widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const db = require('../db/connection');
const { getAllItems, addItem, changeSoldStatus, getUserID, deleteItem, addToFavourites } = require("../db/database");
const { timeAgo, sortByMostRecent } = require("../utils/helpers");
const cookieSession = require('cookie-session');

router.use(cookieSession({
  name: 'session',
  keys: ["1"],
}));

// api route that gets all items_for_sale in database
// router.get('/api', (req, res) => {
//   getAllItems()
//     .then(originalItems => {
//       originalItems.forEach((item) => {
//         item.timeago = timeAgo(item.created_at);
//         console.log(item);
//       })
//       const items = sortByMostRecent(originalItems);
//       res.json({ items })
//     })
//     .catch(error => {
//       console.log(error);
//     });
// });

// page for user to add item_for_sale
router.get("/new", (req, res) => {
  const ID = req.session.user_id;
  const user = {user_id: ID}
  res.render("new_item", {user} );
});

// receive form submission for new item_for_sale -> send user back to home page
router.post("/", (req, res) => {

  const user = req.session.user_id;
  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;
  const imageURL = req.body.image;

  const templateVars = {
    title,
    description,
    price,
    imageURL,
    user
  };

  addItem(title, description, price, imageURL);

  res.render("index", templateVars);
});

// route to mark an item as sold in db
router.get("/:id/sold", (req, res) => {

  const itemID = req.params.id;
  const userID = req.session.user_id;
    changeSoldStatus(itemID);
    console.log("userID:", userID);
    res.redirect(`/users/${userID}/items`);
    return;

});

// delete item_for_sale from database
router.get("/:id/delete", (req, res) => {

  const itemID = req.params.id;
  const userID = req.session.user_id;

  deleteItem(itemID);
  res.redirect(`/users/${userID}/items`);
  return;

});

module.exports = router;
