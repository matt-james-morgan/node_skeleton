const express = require('express');
const router  = express.Router();
const db = require('../db/connection');
const { getAllItems, getFaveItems, getUserItems, getUsername, getBuyerMessages, getSellerMessages } = require('../db/database');
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

    res.json({ items })
  })
  .catch(error => {
    console.log(error);
  });
});

router.get('/userName', (req, res) => {

  const id = req.session.user_id;


  getUsername(id)
  .then(username => {

    res.json( username )
  })
  .catch(error => {
    console.log(error);
  });
});

router.get('/messages', (req, res) => {

  const user = req.session.user_id;
  const ID = {user_id: user};

  getBuyerMessages(ID)
    .then(messages => {
      getUsername(user)
      .then((user)=>{
        res.json({ messages, user})
      }).catch(error => {
        console.log(error);
      });
    }).catch(error => {
      console.log(error);
    });
});

// router.get('/messageCards', (req, res) => {

//   const user = req.session.user_id;
//   const ID = {user_id: user};

//   getBuyerMessages(ID)
//     .then(messages => {
//       res.json({ messages })
//     })
//     .catch(error => {
//       console.log(error);
//     });
// });

router.get('/messageCards', (req, res) => {

  const user = req.session.user_id;
  const ID = {user_id: user};

  getBuyerMessages(ID)
    .then(buyerMessages => {
      getSellerMessages(ID)
      .then(sellerMessages => {
        res.json({ buyerMessages, sellerMessages })

          })
    })
    .catch(error => {
      console.log(error);
    });
});



module.exports = router;
