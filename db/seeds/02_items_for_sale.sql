-- items_for_sale table seeds

INSERT INTO items_for_sale (title, price_cents, description, seller_id, image_url, created_at)
VALUES ('Hricane Ukulele', 7000, 'It comes with a strap, carrier bag, extra strings and a tuner (needs lithium battery). Message me if you are interested.', 1, '/images/ukulele.png', '2024-01-18 10:00:00'),
('Z175 Zimmerman Grand Piano', 1799500, 'It has got a powerful sound, wonderful range and touch.', 2, '/images/grand-piano.webp', '2024-01-19 12:30:00'),
('Gorilla GB-20 Electric Bass Guitar Amplifier', 8000, 'Classic punter In great shape. Perfect for garage or basement.', 4, '/images/bass-amp.png', '2024-01-20 15:45:00'),
('Full Size Italian Cello', 600000, 'Construction and sound quality indicate it was likely hand made. It has a beautiful one piece back and a very tightly grained spruce top. Wonderfully balanced sound across the strings.', 6, '/images/cello.png', '2024-01-21 09:15:00'),
('Pearl Vision Series 5 Piece Drum Kit', 80000, 'Beautiful purple birch 5 Piece pearl vision series drum set.', 3, '/images/drum-kit.png', '2024-01-23 14:00:00');

INSERT INTO items_for_sale (title, price_cents, description, seller_id, image_url, created_at, sold)
VALUES ('Shure PGX4 Wireless Microphone', 15000, 'Legendary sound quality, stage-proven durability.', 1, '/images/mic.png', '2024-01-24 20:20:00', true);
