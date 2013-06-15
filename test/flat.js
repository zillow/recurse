var recurse = require('../');
var test = require('tap').test;
var fs = require('fs');
var mkdirp = require('mkdirp');
var rimraf = require('rimraf');

test('flat dir', function (t) {
  mkdirp.sync('flat');
  fs.openSync('flat/1.txt', 'w');
  fs.openSync('flat/2.txt', 'w');

  t.plan(2);

  var flat = recurse('flat');
  flat.on('data', function(data) {
    t.ok(data.match(/flat\/\d\.txt/));
  });

  rimraf.sync('flat');

});
