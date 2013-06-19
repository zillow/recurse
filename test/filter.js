var recurse = require('../');
var test = require('tap').test;
var fs = require('fs');
var mkdirp = require('mkdirp');
var rimraf = require('rimraf');

function createFixtures() {
  mkdirp.sync('filter/sub');
  mkdirp.sync('filter/sub2');
  fs.openSync('filter/1.txt', 'w');
  fs.openSync('filter/2.tar.gz', 'w');
  fs.openSync('filter/sub/3.txt', 'w');
  fs.openSync('filter/sub2/4.jpg', 'w');
}

test('relname filter', function (t) {
  createFixtures();

  t.plan(2);

  var flat = recurse('filter', function(relname, stat) {
    return !stat.isDirectory() && relname.match(/\.txt$/)
  });
  flat.on('data', function(data) {
    t.ok(data.match(/\d\.txt/));
  });
  flat.on('end', function() {
    rimraf.sync('filter');
  });
});

test('stat filter', function (t) {
  createFixtures();

  t.plan(2);

  var flat = recurse('filter', function(relname, stat) {
    return !stat.isDirectory() && relname.match(/\.txt$/)
  });
  flat.on('data', function(data) {
    t.ok(data.match(/\d\.txt/));
  });
  flat.on('end', function() {
    rimraf.sync('filter');
  });
});
