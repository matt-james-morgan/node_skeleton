const express = require('express');
const router  = express.Router();
const db = require('../db/connection');
const faveItemsQuery = require('../db/queries/getFaveItems')


router.get('faveItems', (req, res) => {
  console.log('HELLLOOOOO');
  const user = req.session.user_id
  console.log(user );
  faveItemsQuery.getFaveItems(user)
  .then(items => {
    res.json({ items })
  })
  .catch(error => {
    console.log(error);
  });
});


module.exports = router;
