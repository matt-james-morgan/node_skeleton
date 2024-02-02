require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT
});

// Items for Sale

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

// User Messages

const getAllMessages = function (options, limit = 10) {
  const queryParams = [];

  let queryString = `
  SELECT * FROM user_messages
  JOIN items_for_sale ON items_for_sale.id = item_id
  `;

  if (options.time_posted) {
    queryParams.push(options.time_posted);
    queryString +=
    `
    ORDER BY $${queryParams.length} DESC
    `
  }

  queryParams.push(limit);
  queryString += `
  LIMIT $${queryParams.length}
  `;

  return pool.query(queryString, queryParams)
    .then((res) => res.rows)
    .catch((err) => console.log("Error message: ", err));

};


module.exports = {
  getAllItems,
  getAllMessages,
  addItem
};
