var fs = require('fs');
var path = require('path');
var Stream = require('stream');

function recursefilter(relname, stat) {
  return stat.isDirectory();
}

function writefilter(relname, stat) {
  return !stat.isDirectory();
}

module.exports = function (root, opts) {
  var queue = [root];
  var pendingReaddirs = 0;
  var pendingLstats = 0;
  var buffer = [];
  var paused = false;
  var s = new Stream;

  opts = opts || {};

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

      fs.lstat(relname, function (err, stats) {
        pendingLstats--;

        if (err) {
          s.emit('error', err);
          return next();
        }

        if ((opts.recursefilter || recursefilter)(relname, stats)) {
          queue.push(relname);
        }

        if ((opts.writefilter || writefilter)(relname, stats)) {
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
