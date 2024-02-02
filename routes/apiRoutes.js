const express = require('express');
const router  = express.Router();
const db = require('../db/connection');
const { getAllItems, getFaveItems } = require("../db/database");


router.get('/faveItems', (req, res) => {
  getAllItems()
  .then(items => {
    res.json({ items })
  })
  .catch(error => {
    console.log(error);
  });
});


module.exports = router;
