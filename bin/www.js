/**
 * Created by Lucas Tavares on 03/07/2017.
 */
var serv = require('../app.js');

var server = serv.server;
var app = serv.app;

server.listen(app.get('port') || 3000, function() {
  console.log('Server is listening on port ' + (app.get('port') || 3000));
});
