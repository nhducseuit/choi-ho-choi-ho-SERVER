// var assert = require('assert');
// require('chai').should();
// // var expect = require('chai').expect;
// // var assert = require('chai').assert;


// describe('Array', function () {
//     describe('#indexOf()', function () {
//         it('should return -1 when the value is not present', function () {
//             assert.equal([1, 2, 3].indexOf(4), -1);
//         });
//     });
// });

// describe('Array', function () {
//     describe('#indexOf()', function () {
//       it('should return -1 when the value is not present', function () {
//         [1, 2, 3].indexOf(5).should.equal(-1);
//         [1, 2, 3].indexOf(0).should.equal(-1);
//       });
//     });
//   });


  // Avoid using arrow function because it automatically bind 'this' and make it impossible to access Mocha context
  // Run mocha command with --forbid-only in git precommit hook to prevent committing tests with exclusivity feature .only to be committed.
  // use --no-package to stop Mocha from looking for configuration in a package.json.
  // Mocha will also merge any options found in package.json into its run-time configuration in the order: command line arguments > mocha config file > package.json's mocha property
  // Configurations can inherit from other modules using the extends keyword
  // sinon.js - Test spies, stubs and mocks for JavaScript.