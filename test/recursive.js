var recurse = require('../');
var test = require('tap').test;
var Stream = require('stream');
var path = require('path');
var testfs = require('testfs');

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

  var fs = testfs(prefix, paths, function (err) {
    var recursive = recurse('recursive');

    var all = [];
    var concat = new Stream;
    concat.writable = true;
    concat.write = function (data) {
      all.push(data);
    };
    concat.end = function () {
      t.equal(
        all.sort().join('\n'),
        files.map(function (name) {
          return path.join(prefix, name);
        }).sort().join('\n')
      );
      fs.rm();
    };

    recursive.pipe(concat);
  });
});
