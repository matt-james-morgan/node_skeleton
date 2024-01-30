const db = require('../connection');

const getItems = () => {
  return db.query('SELECT * FROM items_for_sale;')
    .then(data => {
      return data.rows;
    });
};

module.exports = { getItems };