const express = require('express');
const router  = express.Router();
const db = require('../db/connection');
const { timeAgo, sortByMostRecent } = require('../utils/helpers');
const { getAllItems,
        getFaveItems,
        getUserItems,
        getUsername,
        getBuyerMessageCards,
        getSellerMessageCards,
        getSentMessages,
        getReceivedMessages } = require('../db/database');


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
  if (req.session.user_id) {
    const user = req.session.user_id;
    const ID = {user_id: user};

    getBuyerMessageCards(ID)
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

  } else {
    res.redirect('/');
  }
});

router.get('/messageCards', (req, res) => {

  if (req.session.user_id) {
    const user = req.session.user_id;
    const ID = {user_id: user};

    getBuyerMessageCards(ID)
      .then(buyerMessages => {
        getSellerMessageCards(ID)
        .then(sellerMessages => {
          res.json({ buyerMessages, sellerMessages })
            })
      })
      .catch(error => {
        console.log(error);
      });

  } else {
    res.status(403).send("Must Log In to see messages!📨");
  };

});

router.get('/chatHistory', (req, res) => {

  if (req.session.user_id) {
    const user = req.session.user_id;
    const ID = {user_id: user};

    getSentMessages(ID)
      .then(buyerMessages => {
        getReceivedMessages(ID)
        .then(sellerMessages => {
          res.json({ buyerMessages, sellerMessages })
            })
      })
      .catch(error => {
        console.log(error);
      });

  } else {
    res.status(403).send("Must Log In to see messages!📨");
  };

});



module.exports = router;
