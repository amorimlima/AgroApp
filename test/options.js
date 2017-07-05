var chai = require('chai');
var supertest = require('supertest');
var td = require('testdouble');

var app = require('../app');

module.exports = {
  request: supertest(app),
  expect: chai.expect,
  td: td,
  app: app
};
