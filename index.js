var fs = require('fs');
var path = require('path');
var Stream = require('stream');

module.exports = function (root) {
  var s = new Stream;
  s.readable = true

  var queue = [root];

  function recurse(dir) {
    fs.readdir(dir, function (err, names) {
      if (err) {
        s.emit('error', err);
        return next();
      }

      statdir(dir, names, function (entries) {
        entries.forEach(function (entry) {
          if (entry.isDir) return queue.push(entry.name);

          s.emit('data', entry.name);
        });

        next();
      });
    });
  }

  function statdir(dir, names, cb) {
    var entries = [];

    if (!names.length) return cb(entries);

    names.forEach(function (name) {
      var relName = path.join(dir, name);

      fs.lstat(relName, function (err, stats) {
        if (err) s.emit('error', err);
        entries.push({name: relName, isDir: stats && stats.isDirectory()});
        if (entries.length == names.length) cb(entries);
      });
    });
  }

  function next() {
    if (queue.length) return recurse(queue.pop());

    s.emit('end');
  }

  next();

  return s;
}
