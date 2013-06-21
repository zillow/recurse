var recurse = require('../');
var test = require('tap').test;
var Stream = require('stream');

// TODO: extract to module:
var testfs = require('./lib/testfs');

test('backpressure', function (t) {
  t.plan(11);

  var n = 10;
  var files = [];
  for (var i = 0; i < n; i++) {
    files.push(i + '/' + i + '.txt');
  }

  var fs = testfs('backpressure', files, function (err) {
    var resumes = 0;

    var pauser = new Stream;
    pauser.writable = true;

    pauser.write = function (data) {
      t.similar(data, /backpressure\/\d\/\d\.txt/, 'data should match path');
      process.nextTick(function () {
        pauser.emit('drain');
        resumes++;
      });
      return false;
    };

    pauser.end = function () {
      t.equal(resumes, n - 1, 'should resume ' + (n - 1) + ' times');
      fs.rm();
    };

    recurse('backpressure').pipe(pauser);
  });
});
