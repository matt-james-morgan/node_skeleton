/*
 * All routes for Widget Data are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /api/widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const db = require('../db/connection');
const { getAllItems, addItem } = require("../db/database");

// api route that gets all items_for_sale in database
router.get('/api', (req, res) => {
  getAllItems()
    .then(items => {
      res.json({ items })
    })
    .catch(error => {
      console.log(error);
    });
});

// page for user to add item_for_sale
router.get("/new", (req, res) => {
  res.render("new_item");
});

// receive form submission for new item_for_sale -> send user to staging page
router.post("/", (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;
  const imageURL = req.body.image;

  const templateVars = {
    title,
    description,
    price,
    imageURL
  };

  addItem(title, description, price, imageURL);

  res.render("index", templateVars);
})


module.exports = router;
