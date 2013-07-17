var recurse = require('../');
var test = require('tap').test;
var fs = require('fs');
var testfs = require('testfs');

var files = [
  '/target/1.txt',
  '../target -> /links/link'
];

test('resolving symlinks', function (t) {
  var d = 'resolvesymlinks';
  t.plan(2);

  testfs(d, files, function (err, rm) {
    var writes = 0;

    var symlinks = recurse(d + '/links', {resolvesymlinks: true});
    symlinks.on('readable', function () {
      var data = symlinks.read();
      if (data) {
        t.equal(data, d + '/links/link/1.txt');
        writes++;
      }
    });
    symlinks.on('end', function () {
      t.equal(writes, 1);
      rm();
    });
  });
});

test('listing symlinks', function (t) {
  var d = 'listymlinks';
  t.plan(2);

  testfs(d, files, function (err, rm) {
    var writes = 0;

    var symlinks = recurse(d + '/links');
    symlinks.on('readable', function () {
      var data = symlinks.read();
      if (data) {
        t.equal(data, d + '/links/link');
        writes++;
      }
    });
    symlinks.on('end', function () {
      t.equal(writes, 1);
      rm();
    });
  });
});
