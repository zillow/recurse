var recurse = require('../');
var test = require('tap').test;

test('nonexiseant dir', function (t) {
  t.plan(1);

  var nonexistent = recurse('nonexiseant');

  nonexistent.on('error', function (err) {
    t.equal(err.code, 'ENOENT');
  });

  nonexistent.read();
});
