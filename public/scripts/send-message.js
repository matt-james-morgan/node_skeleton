const http = require('http');

const config = {
  host: 'localhost',
  port: '8080'
};

const connection = http.createConnection(config);

// listen for incoming messages
connection.on('data', () => {
  console.log('message received from the server!');
});
