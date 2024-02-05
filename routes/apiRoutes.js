const express = require('express');
const router  = express.Router();
const db = require('../db/connection');
const { getAllItems, getFaveItems, getUserItems } = require('../db/database');
const { timeAgo, sortByMostRecent } = require('../utils/helpers');


router.get('images', (req, res) => {
  
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

const cookieSession = require('cookie-session');
router.use(cookieSession({
    name: 'session',
    keys: ["1"],
    
    // Cookie Options
    
    }));
    


router.get('/favourites', (req, res) => {
    
  const user = req.session.user_id;
  
  
  getFaveItems(user)
  .then(items => {
    res.json({ items })
  })
  .catch(error => {
    console.log(error);
  });
});

router.get('/userItems', (req, res) => {
    
  const user = req.session.user_id;
  

  getUserItems(user)
  .then(items => {
    console.log(items);
    res.json({ items })
  })
  .catch(error => {
    console.log(error);
  });
});






module.exports = router;
