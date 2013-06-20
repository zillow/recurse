var recurse = require('../');
var test = require('tap').test;
var fs = require('fs');
var mkdirp = require('mkdirp');
var rimraf = require('rimraf');

function createFixtures(d) {
  mkdirp.sync(d + '/sub');
  mkdirp.sync(d + '/sub2');
  fs.openSync(d + '/1.txt', 'w');
  fs.openSync(d + '/2.tar.gz', 'w');
  fs.openSync(d + '/sub/3.txt', 'w');
  fs.openSync(d + '/sub2/4.jpg', 'w');
}

test('filter txts', function (t) {
  var d = 'filter-txts';
  createFixtures(d);

  t.plan(3);

  var writes = 0;

  var flat = recurse(d, function(relname, stat) {
    return !stat.isDirectory() && relname.match(/\.txt$/);
  });
  flat.on('data', function(data) {
    t.ok(data.match(/\d\.txt/));
    writes++;
  });
  flat.on('end', function() {
    t.equal(writes, 2);
    rimraf.sync(d);
  });
});

test('filter dirs', function (t) {
  var d = 'filter-dirs';
  createFixtures(d);

  t.plan(3);

  var writes = 0;

  var flat = recurse(d, function(relname, stat) {
    return stat.isDirectory();
  });
  flat.on('data', function(data) {
    t.ok(data.match(new RegExp('^' + d + '/sub\\d?$')));
    writes++;
  });
  flat.on('end', function() {
    t.equal(writes, 2);
    rimraf.sync(d);
  });
});
