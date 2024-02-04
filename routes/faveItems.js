const express = require('express');
const router  = express.Router();
const db = require('../db/connection');
const faveItemsQuery = require('../db/queries/getFaveItems');
const cookieSession = require('cookie-session');
router.use(cookieSession({
    name: 'session',
    keys: ["1"],
    
    // Cookie Options
    
    }));
    


router.get('/fave', (req, res) => {
    
  const user = req.session.user_id;
  
  faveItemsQuery.getFaveItems(user)
  .then(items => {
    res.json({ items })
  })
  .catch(error => {
    console.log(error);
  });
});


module.exports = router;
