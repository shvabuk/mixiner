var scope = {};

if (typeof chai === 'undefined') {
  scope.chai = require('chai');
} else {
  scope.chai = chai;
}

if (typeof mixiner === 'undefined') {
  scope.mixiner = require('./mixiner-es5/mixiner.min');
} else {
  scope.mixiner = mixiner;
}

var run = require('../test/es5/test');

run.tests(scope.mixiner, scope.chai.assert);
