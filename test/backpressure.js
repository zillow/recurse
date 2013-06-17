var recurse = require('../');
var test = require('tap').test;
var fs = require('fs');
var mkdirp = require('mkdirp');
var rimraf = require('rimraf');

test('backpressure', function (t) {
  for (var i = 0; i < 10; i++) {
    mkdirp.sync('backpressure/' + i);
    fs.openSync('backpressure/' + i + '/' + i + '.txt', 'w');
  }

  t.plan(11);

  var pauses = 0;

  function throttle() {
    pauses++;
    backpressure.pause();
    setTimeout(function () {
      backpressure.resume();
    }, 10);
  }

  var backpressure = recurse('backpressure');
  backpressure.on('data', function(data) {
    t.ok(data.match(/backpressure\/\d\/\d\.txt/));
    throttle();
  });
  backpressure.on('end', function(data) {
    t.equal(pauses, 10, 'one pause per subdir traversal');
    rimraf.sync('backpressure');
  });
});
