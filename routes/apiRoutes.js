const express = require('express');
const router  = express.Router();
const db = require('../db/connection');
const { timeAgo, sortByMostRecent } = require('../utils/helpers');
const { getAllItems,
        getFaveItems,
        getUserItems,
        getUsername,
        getAllMessageCards,
        getBuyerMessageCards,
        getSellerMessageCards,
        getSentMessages,
        getSellerID,
        addToFavourites } = require('../db/database');




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
  const userID = parseInt(req.session.user_id);
  const roomID = req.session.roomID;
  getAllMessageCards()
    .then(messages => {
      getUsername(req.session.user_id)
      .then((user) => {
        getSentMessages(userID, roomID)
        .then(sentMessages => {
          getSellerID(roomID)
          .then(sellerID => {
            res.json({ messages, user, roomID: req.session.roomID, userID, sentMessages, sellerID})
          }).catch(error => {
            console.log(error);
          })
        }).catch(error => {
          console.log(error)
        })
      }).catch(error => {
        console.log(error);
      });
    }).catch(error => {
      console.log(error);
    });
});

router.get('/messageHistory', (req, res) => {
  const user = req.session.user_id;
  const roomID = req.session.roomID

  getSentMessages(user, roomID)
  .then(sentMessages => {
    getUsername(user)
    .then(username => {
      res.json({ sentMessages, roomID, user, username });
    }).catch(err => console.log("/messageHistory error: ", err));
  }).catch(err => console.log("/messageHistory error: ", err));
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
            .catch(error => {
              console.log(error);
            });
      })
      .catch(error => {
        console.log(error);
      });

  } else {
    res.status(403).send("Must Log In to see messages!📨");
  };

});

router.post('/addFavourite', (req, res) => {

  const userID = Number(req.session.user_id);
  console.log("req: ", req.body)
  const itemID = req.body.itemId;
  console.log("user, item", userID, itemID);

  addToFavourites(itemID, userID);

});




module.exports = router;
