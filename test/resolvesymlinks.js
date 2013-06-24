var recurse = require('../');
var test = require('tap').test;
var fs = require('fs');
var mkdirp = require('mkdirp');
var rimraf = require('rimraf');

function createFixtures(d) {
  rimraf.sync(d);
  mkdirp.sync(d + '/target');
  mkdirp.sync(d + '/links');
  fs.openSync(d + '/target/1.txt', 'w');
  fs.symlinkSync('../target', d + '/links/link');
}

test('resolving symlinks', function (t) {
  var d = 'resolvesymlinks';
  createFixtures(d);

  t.plan(2);

  var writes = 0;

  var symlinks = recurse(d + '/links', {resolvesymlinks: true});
  symlinks.on('data', function(data) {
    t.equal(data, d + '/links/link/1.txt');
    writes++;
  });
  symlinks.on('end', function() {
    t.equal(writes, 1);
    rimraf.sync(d);
  });
});

test('listing symlinks', function (t) {
  var d = 'resolvesymlinks';
  createFixtures(d);

  t.plan(2);

  var writes = 0;

  var symlinks = recurse(d + '/links');
  symlinks.on('data', function(data) {
    t.equal(data, d + '/links/link');
    writes++;
  });
  symlinks.on('end', function() {
    t.equal(writes, 1);
    rimraf.sync(d);
  });
});
