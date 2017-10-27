const scope = {};

if (typeof chai === 'undefined') {
  scope.chai = require('chai');
} else {
  scope.chai = chai;
}

if (typeof mixiner === 'undefined') {
  scope.mixiner = require('../dist/mixiner');
} else {
  scope.mixiner = mixiner;
}

const run = require('../test/es6/test');

run.tests(scope.mixiner, scope.chai.assert);
