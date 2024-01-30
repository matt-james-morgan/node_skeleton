-- Drop and recreate favourited_items table

DROP TABLE IF EXISTS favourited_items CASCADE;

CREATE TABLE favourited_items (
  id SERIAL PRIMARY KEY NOT NULL,
  buyer_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  item_id INTEGER REFERENCES items_for_sale(id) ON DELETE CASCADE
);
