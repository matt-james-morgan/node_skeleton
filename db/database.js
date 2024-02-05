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

// view all items_for_sale that belong to a specific user
const getUserItems = function(username) {
  return pool.query(`
  SELECT items_for_sale.*
  FROM items_for_sale
  JOIN users ON seller_id = users.id
  WHERE username = $1
  `, [username])
  .then((res) => {
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

// User Messages

const getAllMessages = function (options, limit = 10) {
  const queryParams = [];

  let queryString = `
  SELECT * FROM user_messages
  JOIN items_for_sale ON items_for_sale.id = item_id
  JOIN users ON users.id = seller_id
  `;

  queryParams.push(limit);
  queryString += `
  LIMIT $${queryParams.length};
  `;

  return pool.query(queryString, queryParams)
    .then((res) => res.rows)
    .catch((err) => console.log("Error message: ", err));

};

const getFaveItems = (user) => {
  return pool.query('SELECT * FROM items_for_sale JOIN favourited_items ON items_for_sale.id = favourited_items.item_id WHERE favourited_items.buyer_id = $1 ;', [user])
    .then(data => {
      return data.rows;
    });
};



module.exports = {
  getAllItems,
  getAllMessages,
  addItem,
  getUserItems,
  changeSoldStatus,
  getUserID,
  deleteItem,
  getFaveItems
};
