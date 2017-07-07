var angular = require('angular');
var ngRoute = require('angular-route');
var ngMaterial = require('angular-material');

var commons = require('./commons');
var config = require('./config');
var run = require('./run');
var services = require('./services');
var controllers = require('./controllers');

var appModule = angular
  .module('app', [
    'ngRoute',
    'ngMaterial'
  ]);

commons(appModule);
services(appModule);
controllers(appModule);
run(appModule);
config(appModule);
