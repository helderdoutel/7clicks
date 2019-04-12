// server.js
var servidor = require('./servidor');
var controler = require('./controller');

servidor.config();

controler.init(servidor.app, null);

servidor.start_server(process.env.PORT || 4000);
