var recurse = require('../');
var test = require('tap').test;
var fs = require('fs');
var mkdirp = require('mkdirp');
var rimraf = require('rimraf');
var Stream = require('stream');

test('backpressure', function (t) {
  var n = 10;
  for (var i = 0; i < n; i++) {
    mkdirp.sync('backpressure/' + i);
    fs.openSync('backpressure/' + i + '/' + i + '.txt', 'w');
  }

  t.plan(11);

  var resumes = 0;

  var pauser = new Stream;
  pauser.writable = true;

  pauser.write = function (data) {
    t.ok(data.match(/backpressure\/\d\/\d\.txt/), 'data should match path');
    process.nextTick(function () {
      pauser.emit('drain');
      resumes++;
    });
    return false;
  }

  pauser.end = function () {
    t.equal(resumes, n - 1, 'should resume ' + (n - 1) + ' times');
    rimraf.sync('backpressure');
  }

  recurse('backpressure').pipe(pauser);
});
