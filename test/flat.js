var recurse = require('../');
var test = require('tap').test;
var testfs = require('testfs');

test('flat dir', function (t) {
  t.plan(3);

  testfs('flat', ['1.txt', '2.txt'], function (err, rm) {
    var writes = 0;

    var flat = recurse('flat');
    flat.on('readable', function () {
      var data = flat.read();
      if (data) {
        t.similar(data, /flat\/\d\.txt/);
        writes++;
      }
    });
    flat.on('end', function () {
      t.equal(writes, 2);
      rm();
    });
  });
});
