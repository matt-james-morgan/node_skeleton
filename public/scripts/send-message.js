const net = require('net');

const config = {
  host: 'localhost',
  port: '8080'
};

const connection = net.createConnection(config);

// listen for incoming messages
connection.on('data', () => {
  console.log('message received from the server!');
})
