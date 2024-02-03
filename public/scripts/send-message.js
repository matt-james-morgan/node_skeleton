const net = require('net');

const config = {
  host: 'localhost',
  port: '8080'
};

const connection = net.createConnection(config);

// set encoding on the connection object

connection.setEncoding('utf8');

// listen for incoming messages
connection.on('data', (message) => {
  console.log('message received from the server!' , message);
});
