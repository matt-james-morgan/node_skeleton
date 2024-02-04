const express = require('express');
const router  = express.Router();
const db = require('../db/connection');
const faveItemsQuery = require('../db/queries/getFaveItems')


router.get('images', (req, res) => {
  console.log('HELLLOOOOO');
});


module.exports = router;
