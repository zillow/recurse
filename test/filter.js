var recurse = require('../');
var test = require('tap').test;
var fs = require('fs');
var mkdirp = require('mkdirp');
var rimraf = require('rimraf');

function createFixtures(prefix) {
  mkdirp.sync(prefix + '-filter/sub');
  mkdirp.sync(prefix + '-filter/sub2');
  fs.openSync(prefix + '-filter/1.txt', 'w');
  fs.openSync(prefix + '-filter/2.tar.gz', 'w');
  fs.openSync(prefix + '-filter/sub/3.txt', 'w');
  fs.openSync(prefix + '-filter/sub2/4.jpg', 'w');
}

test('relname filter', function (t) {
  createFixtures('relname');

  t.plan(2);

  var flat = recurse('relname-filter', function(relname, stat) {
    return !stat.isDirectory() && relname.match(/\.txt$/)
  });
  flat.on('data', function(data) {
    t.ok(data.match(/\d\.txt/));
  });
  flat.on('end', function() {
    rimraf.sync('relname-filter');
  });
});

test('stat filter', function (t) {
  createFixtures('stat');

  t.plan(2);

  var flat = recurse('stat-filter', function(relname, stat) {
    return !stat.isDirectory() && relname.match(/\.txt$/)
  });
  flat.on('data', function(data) {
    t.ok(data.match(/\d\.txt/));
  });
  flat.on('end', function() {
    rimraf.sync('stat-filter');
  });
});
