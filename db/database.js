require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT
});


const getUserID = function(username) {
  return pool.query(`
  SELECT id FROM users
  WHERE username = $1
  `, [username])
  .then((res) => {
    return res.rows;
  })
  .catch((err) => {
    console.log(err);
  })
}

const getUsername = function(id) {
  return pool.query(`
  SELECT username FROM users
  WHERE id = $1
  `, [id])
  .then((res) => {
    return res.rows;
  })
  .catch((err) => {
    console.log(err);
  })
}

// function that returns a promise that contains all items for sale listed in the database
const getAllItems = function(options = {} | null, limit = 10) {

  const queryParams = [];

  let queryString = `
  SELECT * FROM items_for_sale
  `;

  if (options && options.minimum_price) {
    queryParams.push(options.minimum_price);
    queryString += `WHERE price_cents > $${queryParams.length}`;
  }

  if (options && options.maximum_price) {
    queryParams.push(options.maximum_price);

    if (queryParams.length > 1) {
      queryString += `AND price_cents < $${queryParams.length}`;
    } else {
      queryString += `WHERE price_cents < $${queryParams.length}`;
    }
  }

  queryParams.push(limit);
  queryString += `
  LIMIT $${queryParams.length}
  `;

  return pool.query(queryString, queryParams)
    .then((res) => res.rows)
    .catch((err) => console.log(err));

};

// add new item_for_sale to database
const addItem = function(title, descr, price, imgURL) {
  const priceCents = price * 100;
  return pool.query(`
    INSERT INTO items_for_sale (title, description, price_cents, image_url, seller_id)
    VALUES ($1, $2, $3, $4, 1)
    `, [title, descr, priceCents, imgURL])
  .then((res) => {
    console.log("Item was inserted successfully.");
  })
  .catch((err) => {
    console.log(err);
  })
};

// add item_for_sale to favourites
const addToFavourites = function (itemID, buyerID) {
  return pool.query(`
  INSERT INTO favourited_items (item_id, buyer_id)
  VALUES ($1, $2)
  `, [itemID, buyerID])
  .then((res) => {
    console.log("Item was added to favourites")
  })
  .catch((err) => {
    console.log("There was an error:", err);
  })
};

// view all items_for_sale that belong to a specific user
const getUserItems = function(user) {
  return pool.query(`
  SELECT *
  FROM items_for_sale
  WHERE seller_id = 1
  `)
  .then((res) => {
    console.log(res.rows);
    return res.rows;
  })
  .catch((err) => console.log(err));
}

// toggle whether or not item is marked as sold
const changeSoldStatus = function(itemID) {
  return pool.query(`
  UPDATE items_for_sale
  SET sold = NOT sold
  WHERE items_for_sale.id = $1;
  `, [itemID])
  .then((res) => {
    console.log("Sold status updated");
  })
  .catch((err) => {
    console.log(err);
  })
};

// delete an item_for_sale from database
const deleteItem = function(itemID) {
  return pool.query(`
  DELETE FROM items_for_sale
  WHERE id = $1;
  `, [itemID])
  .then((res) => {
    console.log("Item successfully deleted");
  })
  .catch((err) => {
    console.log(err);
  })
};

// User Message Cards

const getBuyerMessageCards = function (options, limit = 10) {
  const queryParams = [];

  let queryString = `
  SELECT * FROM user_messages
  JOIN items_for_sale ON items_for_sale.id = item_id
  JOIN users ON users.id = seller_id
  `;

  if (options.user_id) {
    queryParams.push(options.user_id)
    queryString += `
    WHERE user_messages.buyer_id = $${queryParams.length}
    `
  }

  queryParams.push(limit);
  queryString += `
  LIMIT $${queryParams.length};
  `;

  return pool.query(queryString, queryParams)
    .then((res) => res.rows)
    .catch((err) => console.log("Error message: ", err));

};

const getSellerMessageCards = function (options, limit = 10) {
  const queryParams = [];

  let queryString = `
  SELECT * FROM user_messages
  JOIN items_for_sale ON items_for_sale.id = item_id
  JOIN users ON users.id = seller_id
  `;

  if (options.user_id) {
    queryParams.push(options.user_id)
    queryString += `
    WHERE items_for_sale.seller_id = $${queryParams.length}
    `
  }

  queryParams.push(limit);
  queryString += `
  LIMIT $${queryParams.length};
  `;


  return pool.query(queryString, queryParams)
    .then((res) => res.rows)
    .catch((err) => console.log("Error message: ", err));

};

// User message history

const getSentMessages = function (options) {
  const queryParams = [];

  let queryString = `
  SELECT * FROM chat_history
  `;
  if (options.user_id) {
    queryParams.push(options.user_id)
    queryString += `
    WHERE sender_id = $${queryParams.length};
    `
  }

  return pool.query(queryString, queryParams)
    .then((res) => res.rows)
    .catch((err) => console.log("Error message: ", err));

  };
//
const getReceivedMessages = function (options) {
  const queryParams = [];

  let queryString = `
  SELECT * FROM chat_history
  `;
  if (options.user_id) {
    queryParams.push(options.user_id)
    queryString += `
    WHERE receiver_id = $${queryParams.length};
    `
  }

  return pool.query(queryString, queryParams)
    .then((res) => res.rows)
    .catch((err) => console.log("Error message: ", err));

  };
//


const getFaveItems = (user) => {
  return pool.query('SELECT * FROM items_for_sale JOIN favourited_items ON items_for_sale.id = favourited_items.item_id WHERE favourited_items.buyer_id = $1 ;', [user])
    .then(data => {
      return data.rows;
    });
};



module.exports = {
  getAllItems,
  getBuyerMessageCards,
  getSellerMessageCards,
  getSentMessages,
  getReceivedMessages,
  addItem,
  getUserItems,
  changeSoldStatus,
  getUserID,
  deleteItem,
  getFaveItems,
  getUsername,
  addToFavourites
};
