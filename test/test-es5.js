var run = require('../test/es5/test');
var chai = require('chai');

run.tests(require('../dist/mixiner.min'), chai.assert, require('../package.json').version);
