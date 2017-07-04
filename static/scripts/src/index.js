var angular = require('angular');
var ngRoute = require('angular-route');
var ngMaterial = require('angular-material')

var config = require('./config');
var run = require('./run');
var controllers = require('./controllers');

var MODULE_NAME = 'app';

angular
  .module(MODULE_NAME, [
    'ngRoute',
    'ngMaterial'
  ]);

config(angular, MODULE_NAME);
run(angular, MODULE_NAME);
controllers(angular, MODULE_NAME);