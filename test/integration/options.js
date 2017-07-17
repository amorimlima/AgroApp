var chai = require('chai');
var supertest = require('supertest');
var td = require('testdouble');

var app = require('../../app');

global.expect = chai.expect;
global.td = td;
global.request = supertest(app);
global.app = app;