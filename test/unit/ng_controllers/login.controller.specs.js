var options = require('../../options.js');

var expect = options.expect;
var LoginController = require('../../../static/scripts/src/controllers/login.controller');

describe('LoginController', function() {
  var loginController;
  var $rootScopeMock = { view: {}, sidenav: {}, toolbar: {} };

  beforeEach(function() {
    loginController = new LoginController($rootScopeMock);
  });

  it('should set the viewName to "Login"', function() {
    expect($rootScopeMock.view.name).to.be.eql('Login');
  });
  it('should return a token when a valid user tries to authenticate');
  it('should return an error message when an invalid user tries to authenticate');
});
