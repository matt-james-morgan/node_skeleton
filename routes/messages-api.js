/*
 * All routes for Widget Data are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /api/widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const db = require('../db/connection');
const { getAllMessages } = require("../db/database");


router.get('/messages', (req, res) => {
  getAllMessages()
    .then(messages => {
      res.json({ messages })
    })
    .catch(error => {
      console.log(error);
    });
});


module.exports = router;
