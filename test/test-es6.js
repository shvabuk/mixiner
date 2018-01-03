const run = require('../test/es6/test');
const chai = require('chai');

run.tests(require('../dist/mixiner'), chai.assert, require('../package.json').version);
