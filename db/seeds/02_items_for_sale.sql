-- items_for_sale table seeds

INSERT INTO items_for_sale (title, price_cents, description, seller_id, image_url)
VALUES ('Hricane Ukulele', 7000, 'It comes with a strap, carrier bag, extra strings and a tuner (needs lithium battery). Message me if you are interested.', 1, '/images/ukulele.png'),
('Z175 Zimmerman Grand Piano', 1799500, 'It has got a powerful sound, wonderful range and touch.', 2, '/images/grand-piano.webp'),
('Gorilla GB-20 Electric Bass Guitar Amplifier', 8000, 'Classic punter In great shape. Perfect for garage or basement.', 1, '/images/bass-amp.png'),
('Full Size Italian Cello', 600000, 'Construction and sound quality indicate it was likely hand made. It has a beautiful one piece back and a very tightly grained spruce top. Wonderfully balanced sound across the strings.', 1, '/images/cello.png'),
('Pearl Vision Series 5 Piece Drum Kit', 80000, 'Beautiful purple birch 5 Piece pearl vision series drum set.', 1, '/images/drum-kit.png');

INSERT INTO items_for_sale (title, price_cents, description, seller_id, image_url, sold)
VALUES ('Shure PGX4 Wireless Microphone', 15000, 'Legendary sound quality, stage-proven durability.', 1, '/images/mic.png', true);
