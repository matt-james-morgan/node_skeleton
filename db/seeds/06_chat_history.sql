-- chat_history table seeds

INSERT INTO chat_history (sender_id, receiver_id, item_id, message_content)
VALUES (1, 2, 2, 'Hello, is this item still available?'),
(2, 1, 1, 'Are you willing to deliver this to my house? I will throw in an extra twenty bucks if you do! =3'),
(1, 2, 1, 'That depends on where you live!'),
(1, 2, 1, 'I also have someone who is interested just so you know!'),
(2, 1, 1, 'I live on 123 Apple, please let me know if there are any updates on the item!');
