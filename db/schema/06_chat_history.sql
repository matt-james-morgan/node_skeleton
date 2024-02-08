-- Drop and recreate MESSAGES table

DROP TABLE IF EXISTS user_messages CASCADE;

CREATE TABLE chat_history (
  id SERIAL PRIMARY KEY NOT NULL,
  sender_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  receiver_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  item_id INTEGER REFERENCES items_for_sale(id) ON DELETE CASCADE,
  message_content TEXT NOT NULL,
  timeposted TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  message_read BOOLEAN DEFAULT false
);
