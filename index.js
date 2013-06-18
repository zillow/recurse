var fs = require('fs');
var path = require('path');
var Stream = require('stream');

module.exports = function (root) {
  var s = new Stream;
  s.readable = true

  var paused = false;

  s.pause = function () {
    paused = true;
  }

  s.resume = function () {
    paused = false;
    next();
  }

  var queue = [root];
  var pendingReaddirs = 0;
  var pendingLstats = {};

  function recurse(dir) {
    pendingReaddirs++;
    fs.readdir(dir, function (err, names) {
      pendingReaddirs--;
      if (err) {
        s.emit('error', err);
        return next();
      }

      if (!names.length) return next();

      pendingLstats[dir] = names.length;

      statdir(dir, names, function (entry) {
        pendingLstats[dir]--;
        if (!pendingLstats[dir]) delete pendingLstats[dir];

        if (entry.isDir) {
          queue.push(entry.name);
        } else {
          s.emit('data', entry.name);
        }

        next();
      });
    });
  }

  function statdir(dir, names, cb) {
    names.forEach(function (name) {
      var relName = path.join(dir, name);

      fs.lstat(relName, function (err, stats) {
        if (err) s.emit('error', err);
        cb({name: relName, isDir: stats && stats.isDirectory()});
      });
    });
  }

  function next() {
    if (paused) return;
    if (queue.length) return recurse(queue.pop());
    if (pendingReaddirs || Object.keys(pendingLstats).length) return;

    s.emit('end');
  }

  next();

  return s;
}
