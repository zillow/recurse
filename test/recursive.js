var recurse = require('../');
var test = require('tap').test;
var Writable = require('stream').Writable;
var path = require('path');
var testfs = require('testfs');

if (!Writable) Writable = require('readable-stream').Writable;

test('recursive dirs', function (t) {
  t.plan(1);

  var files = [
    '1.txt',
    '2.txt',
    'sub/3.txt',
    'sub/subsub/4.txt',
    'sub/subsub/subsubsub/5.txt',
    'sub/subsub/subsubsub/6.txt',
    'sub2/7.txt',
  ];

  var paths = files.slice(0);
  paths.push('sub/subsub/empty/');

  var prefix = 'recursive';

  testfs(prefix, paths, function (err, rm) {
    var recursive = recurse('recursive');

    var all = [];
    var concat = new Writable;
    concat._write = function (chunk, enc, next) {
      all.push(chunk);
      next();
    };
    concat.on('finish',  function () {
      t.equal(
        all.sort().join('\n'),
        files.map(function (name) {
          return path.join(prefix, name);
        }).sort().join('\n')
      );
      rm();
    });

    recursive.pipe(concat);
  });
});
