var recurse = require('../');
var test = require('tap').test;
var fs = require('fs');
var mkdirp = require('mkdirp');
var rimraf = require('rimraf');
var concat = require('concat-stream');

test('recursive dirs', function (t) {
  var files = [
    'recursive/1.txt',
    'recursive/2.txt',
    'recursive/sub/3.txt',
    'recursive/sub/subsub/4.txt',
    'recursive/sub/subsub/subsubsub/5.txt',
    'recursive/sub/subsub/subsubsub/6.txt'
  ];

  mkdirp.sync('recursive/sub/subsub/subsubsub');
  mkdirp.sync('recursive/sub/subsub/empty');

  files.forEach(function(f) {
    fs.openSync(f, 'w');
  });

  t.plan(1);

  var recursive = recurse('recursive');

  var all = concat(function(data) {
    t.equal(data, files.join(''));
    rimraf.sync('recursive');
  });

  recursive.pipe(all);
});
