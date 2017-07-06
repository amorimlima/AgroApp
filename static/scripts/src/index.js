var angular = require('angular');
var ngRoute = require('angular-route');
var ngMaterial = require('angular-material');

var commons = require('./commons');
var config = require('./config');
var run = require('./run');
var controllers = require('./controllers');

var appModule = angular
  .module('app', [
    'ngRoute',
    'ngMaterial'
  ]);

commons(appModule);
config(appModule);
run(appModule);
controllers(appModule);
