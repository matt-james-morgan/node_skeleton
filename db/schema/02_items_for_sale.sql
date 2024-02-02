-- Drop and recreate Users table

DROP TABLE IF EXISTS items_for_sale CASCADE;

CREATE TABLE items_for_sale (
  id SERIAL PRIMARY KEY NOT NULL,
  seller_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  price_cents INTEGER NOT NULL,
  description VARCHAR(255),
  image_url VARCHAR(500),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  sold BOOLEAN DEFAULT false
);
