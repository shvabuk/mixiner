const child_process = require('child_process');
const assert = require('chai').assert;
const path = require('path');

const getErrors = string => string.match(/error/g);
const getNone = string => string.match(/none/g);

describe('TypeScript syntax', () => {
  describe('Errors', () => {
    it('Correct errors', function(done) {
      this.timeout(10000);
      child_process.exec(
        `node ${path.resolve(
          __dirname,
          '../node_modules/typescript/bin/tsc'
        )} --diagnostics ${path.resolve(__dirname, './syntax/errors.ts')} --experimentalDecorators`,
        {
          encoding: 'utf8',
          stdio: 'ignore',
        },
        (e, output) => {
          assert.notEqual(null, e);
          assert.strictEqual(36, getErrors(output).length);
          assert.strictEqual(6, getNone(output).length);
          done();
        }
      );
    });
  });

  describe('None errors', () => {
    it('No errors', function(done) {
      this.timeout(10000);
      const correct = child_process.exec(
        `node ${path.resolve(
          __dirname,
          '../node_modules/typescript/bin/tsc' 
        )} --diagnostics ${path.resolve(__dirname, './syntax/correct.ts')} --experimentalDecorators`,
        {
          encoding: 'utf8',
          stdio: 'ignore',
        },
        (e, output) => {
          assert.strictEqual(null, e);
          assert.strictEqual(null, getErrors(output));
          assert.strictEqual(null, getNone(output));
          done();
        }
      );
    });
  });
});
