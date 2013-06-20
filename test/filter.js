var recurse = require('../');
var test = require('tap').test;
var fs = require('fs');
var mkdirp = require('mkdirp');
var rimraf = require('rimraf');

function createFixtures(d) {
  mkdirp.sync(d + '/sub');
  mkdirp.sync(d + '/sub2');
  fs.openSync(d + '/1.txt', 'w');
  fs.openSync(d + '/2.tar.gz', 'w');
  fs.openSync(d + '/sub/3.txt', 'w');
  fs.openSync(d + '/sub2/4.jpg', 'w');
}

test('filter write txts', function (t) {
  var d = 'filter-write-txts';
  createFixtures(d);

  t.plan(3);

  var writes = 0;

  var txtfilter = function (relname, stat) {
    return !stat.isDirectory() && relname.match(/\.txt$/);
  };
  var txts = recurse(d, {writefilter: txtfilter});
  txts.on('data', function (data) {
    t.similar(data, /\d\.txt/);
    writes++;
  });
  txts.on('end', function () {
    t.equal(writes, 2);
    rimraf.sync(d);
  });
});

test('filter write dirs', function (t) {
  var d = 'filter-write-dirs';
  createFixtures(d);

  t.plan(3);

  var writes = 0;

  var dirfilter = function (relname, stat) {
    return stat.isDirectory();
  };
  var dirs = recurse(d, {writefilter: dirfilter});
  dirs.on('data', function (data) {
    t.similar(data, new RegExp('^' + d + '/sub\\d?$'));
    writes++;
  });
  dirs.on('end', function () {
    t.equal(writes, 2);
    rimraf.sync(d);
  });
});

test('filter nonrecursive', function (t) {
  var d = 'filter-nonrecursive';
  createFixtures(d);

  t.plan(3);

  var writes = 0;

  var nonrecursivefilter = function (relname, stat) {
    return false;
  };
  var nonrecursive = recurse(d, {recursefilter: nonrecursivefilter});
  nonrecursive.on('data', function (data) {
    t.similar(data, new RegExp('^' + d + '/[12]\\.(txt|tar\\.gz)$'));
    writes++;
  });
  nonrecursive.on('end', function () {
    t.equal(writes, 2);
    rimraf.sync(d);
  });
});

test('filter recurse specific dir', function (t) {
  var d = 'filter-recurse-specific-dir';
  createFixtures(d);

  t.plan(4);

  var writes = 0;

  var nonrecursivefilter = function (relname, stat) {
    return stat.isDirectory() && relname.match(/\/sub2$/);
  };
  var nonrecursive = recurse(d, {recursefilter: nonrecursivefilter});
  nonrecursive.on('data', function (data) {
    t.similar(data, /[124]\.(txt|tar\.gz|jpg)$/);
    writes++;
  });
  nonrecursive.on('end', function () {
    t.equal(writes, 3);
    rimraf.sync(d);
  });
});
