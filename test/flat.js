var recurse = require('../');
var test = require('tap').test;
var fs = require('fs');
var mkdirp = require('mkdirp');
var rimraf = require('rimraf');

// TODO: extract to module:
var testfs = require('./lib/testfs');

test('flat dir', function (t) {
  t.plan(3);

  testfs(['1.txt', '2.txt'], 'flat', function (err) {
    var writes = 0;

    var flat = recurse('flat');
    flat.on('data', function (data) {
      t.similar(data, /flat\/\d\.txt/);
      writes++;
    });
    flat.on('end', function () {
      t.equal(writes, 2);
      rimraf.sync('flat');
    });
  });
});
