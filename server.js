// load .env data into process.env
require('dotenv').config();
const { newMessage } = require("./db/database.js");

// Web server config

const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');

const PORT = process.env.PORT || 3000;
const app = express();

const http = require('http');
const server = http.createServer(app);
const socketIO = require('socket.io');


const io = socketIO(server);

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));
app.use(express.json());

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require('./routes/users-api');
const widgetApiRoutes = require('./routes/widgets-api');
const usersRoutes = require('./routes/users');
const mainPageRoute = require('./routes/main');
const itemsRoutes = require('./routes/items');
const apiRoutes = require('./routes/apiRoutes');


// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', userApiRoutes);
app.use('/api/widgets', widgetApiRoutes);
// app.use('/faveItems/', faveRoutes);
app.use('/users', usersRoutes);
app.use('/items', itemsRoutes);
app.use('/api', apiRoutes);

app.use('/', mainPageRoute);
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

// app.get('/', (req, res) => {
//   res.render('index');
// });




server.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

//Socket IO user/messaging information

const users = {};
const dbEntry = {};
  io.on('connection', (socket) => {
    socket.on('chat-user', username => {
      users[socket.id] = username
    });
    socket.on('send-chat-message', (message, room) => {
      dbEntry.messageContent = message;
      socket.to(room).emit('chat-message', { message: message, name: users[socket.id] });
    })
    socket.on('join-room', room => {
      dbEntry.itemID = room;
      socket.join(room);
    })
    socket.on('sender-id', senderID => {
      dbEntry.senderID = senderID;
    })
    socket.on('receiver-id', receiverID => {
      dbEntry.receiverID = receiverID;
      newMessage(dbEntry.senderID, dbEntry.receiverID, dbEntry.itemID, dbEntry.messageContent);
    })
  });

