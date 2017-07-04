/**
 * Created by Lucas Tavares on 03/07/2017.
 */
var http = require('http');
var app = require('../app.js');

var server = http.createServer(app);

server.listen(app.get('port') || 3000, function() {
  console.log('Server is listening on port ' + (app.get('port') || 3000));
});
