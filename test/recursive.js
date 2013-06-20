var recurse = require('../');
var test = require('tap').test;
var fs = require('fs');
var Stream = require('stream');
var mkdirp = require('mkdirp');
var rimraf = require('rimraf');

test('recursive dirs', function (t) {
  var files = [
    'recursive/1.txt',
    'recursive/2.txt',
    'recursive/sub/3.txt',
    'recursive/sub/subsub/4.txt',
    'recursive/sub/subsub/subsubsub/5.txt',
    'recursive/sub/subsub/subsubsub/6.txt',
    'recursive/sub2/7.txt'
  ];

  mkdirp.sync('recursive/sub/subsub/subsubsub');
  mkdirp.sync('recursive/sub/subsub/empty');
  mkdirp.sync('recursive/sub2');

  files.forEach(function (f) {
    fs.openSync(f, 'w');
  });

  t.plan(1);

  var recursive = recurse('recursive');

  var all = [];
  var concat = new Stream;
  concat.writable = true;
  concat.write = function (data) {
    all.push(data);
  }
  concat.end = function () {
    t.equal(all.sort().join('\n'), files.sort().join('\n'));
    rimraf.sync('recursive');
  }

  recursive.pipe(concat);
});
