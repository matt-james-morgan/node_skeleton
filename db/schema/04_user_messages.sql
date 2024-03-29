-- Drop and recreate MESSAGES table

DROP TABLE IF EXISTS user_messages CASCADE;

CREATE TABLE user_messages (
  id SERIAL PRIMARY KEY NOT NULL,
  buyer_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  item_id INTEGER REFERENCES items_for_sale(id) ON DELETE CASCADE
);
