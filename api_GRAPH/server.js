const http = require('http');
const app = require('./app');

const server = http.createServer(app);
const port = process.env.PORT || 5000;
server.listen(port, () =>
  console.log(`Le serveur tourne sur http://localhost:${port}`)
);
