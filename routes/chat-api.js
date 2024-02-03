/*
 * All routes for Widget Data are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /api/widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const db = require('../db/connection');
const app = express();
const io = app.get('socket.io');


  router.get('/', (req, res) => {
    io.on('connection', (socket) => {
      socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message', { "message": message , "user": req.session.user_id});
      })
      });
  });

module.exports = router;
