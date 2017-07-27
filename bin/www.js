/**
 * Created by Lucas Tavares on 03/07/2017.
 */
var http = require('http');
var app = require('../app.js');

var server = http.createServer(app);

server.listen(process.env.PORT || 3000, () => console.log(`Listening: ${process.env.PORT || 3000}`));
