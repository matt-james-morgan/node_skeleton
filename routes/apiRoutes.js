const express = require('express');
const router  = express.Router();
const db = require('../db/connection');
const faveItemsQuery = require('../db/queries/getFaveItems')


router.get('images', (req, res) => {
  console.log('HELLLOOOOO');
});

// api route that gets all items_for_sale in database
router.get('/items', (req, res) => {
  getAllItems()
    .then(originalItems => {
      originalItems.forEach((item) => {
        item.timeago = timeAgo(item.created_at);
        console.log(item);
      })
      const items = sortByMostRecent(originalItems);
      res.json({ items })
    })
    .catch(error => {
      console.log(error);
    });
});


module.exports = router;
