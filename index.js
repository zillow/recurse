var fs = require('fs');
var path = require('path');
var Stream = require('stream');

module.exports = function (root, opts) {
  opts = opts || {};

  var recursefilter = opts.recursefilter || function (relname, stat) {
    return stat.isDirectory();
  }
  var writefilter = opts.writefilter || function (relname, stat) {
    return !stat.isDirectory();
  }

  var stat = opts.resolvesymlinks ? fs.stat : fs.lstat;

  var queue = [root];
  var buffer = [];

  var pendingReaddirs = 0;
  var pendingLstats = 0;

  var paused = false;
  var s = new Stream;
  s.readable = true

  s.pause = function () {
    paused = true;
  }

  s.resume = function () {
    paused = false;
    next();
  }

  function recurse(dir) {
    pendingReaddirs++;
    fs.readdir(dir, function (err, names) {
      pendingReaddirs--;

      if (err) {
        s.emit('error', err);
        return next();
      }

      statdir(dir, names);
    });
  }

  function statdir(dir, names) {
    if (!names.length) return next();

    pendingLstats += names.length;
    names.forEach(function (name) {
      var relname = path.join(dir, name);

      stat(relname, function (err, stats) {
        pendingLstats--;

        if (err) {
          s.emit('error', err);
          return next();
        }

        if (recursefilter(relname, stats)) {
          queue.push(relname);
        }

        if (writefilter(relname, stats)) {
          buffer.push(relname);
        }

        next();
      });
    });
  }

  function next() {
    if (paused) return;

    if (buffer.length) {
      s.emit('data', buffer.pop());
      return next();
    }

    if (queue.length) return recurse(queue.pop());

    if (!pendingReaddirs && !pendingLstats) s.emit('end');
  }

  next();

  return s;
}
