var http = require("http");
var express = require("express");

var Servidor = {
    app: express(),
    http: http,
    server: null
}

Servidor.config = function () {
    Servidor.app.use('/css', express.static(__dirname + '/css'));
    Servidor.app.use('/js', express.static(__dirname + '/js'));
    Servidor.app.use('/', express.Router());
    return true;
}

Servidor.start_server = function (port) {
    Servidor.server = Servidor.http.createServer(Servidor.app);
    Servidor.server.listen(port == undefined? 4000:port);
    console.log('Servidor escutando na porta: ' + port);
    return true;
}

Servidor.close_server = function () {
    Servidor.server.close();
    Servidor.server = null;
    return true;
}

module.exports = Servidor;
