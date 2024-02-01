const db = require('../connection');

const getMessages = () => {
  return db.query('SELECT * FROM user_messages;')
    .then(data => {
      return data.rows;
    });
};

module.exports = { getMessages };
