var chai = require('chai');
var supertest = require('supertest');
var td = require('testdouble');
var dotenv = require('dotenv');

dotenv.config();

module.exports = {
  request: supertest(app),
  expect: chai.expect,
  td: td,
  app: app
};
