const chai = require('chai');
const supertest = require('supertest');
const td = require('testdouble');

const app = require('../../app');

global.expect = chai.expect;
global.td = td;
global.request = supertest(app);
global.app = app;