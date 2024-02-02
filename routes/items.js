/*
 * All routes for Widget Data are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /api/widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const db = require('../db/connection');
const { getAllItems } = require("../db/database");

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

// receive form submission for new item_for_sale
router.post("/", (req, res) => {
  console.log(req.body);
})


module.exports = router;
