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


router.get('/', (req, res) => {
  getAllItems()
    .then(items => {
      console.log("ITEMS: ", items)
      res.json({ items })
    })
    .catch(error => {
      console.log(error);
    });
});


module.exports = router;
