require('dotenv').config();
import MySQL from './mysql/mysql';
import router from './router/router';
import Server from './server/server';

const server = Server.init(3000);

// Database connection: MySQL instance.
MySQL.instance;

// The routes
server.app.use(router);

server.start(() => {
  console.log('Server running in port 3000');
});
