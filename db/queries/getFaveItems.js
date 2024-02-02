const db = require('../connection');

//Fave Items
const getFaveItems = (user) => {
  return db.query('SELECT * FROM items_for_sale JOIN favourited_items ON items_for_sale.id = favourited_items.item_id WHERE favourited_items.buyer_id = $1 ;', [user])
    .then(data => {
      console.log(data.rows)
      return data.rows;
    });
};


module.exports = { getFaveItems };