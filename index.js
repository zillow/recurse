var fs = require('fs');
var path = require('path');
var Stream = require('stream');

function statdir(dir, names, cb) {
  var entries = [];

  if (!names.length) return cb(entries);

  names.forEach(function(name) {
    var relName = path.join(dir, name);

    fs.lstat(relName, function(err, stats) {
      // TODO: handle err
      entries.push({name: relName, isDir: stats && stats.isDirectory()});
      if (entries.length == names.length) cb(entries);
    });
  });
}

module.exports = function(root) {
  var s = new Stream;
  s.readable = true

  var queue = [root];

  function next() {
    if (queue.length) {
      recurse(queue.pop());
    } else {
      s.emit('end');
    }
  }

  function recurse(dir) {
    fs.readdir(dir, function (err, names) {
      // TODO: handle err
      statdir(dir, names, function(entries) {
        var files = entries.filter(function(entry) {
          return !entry.isDir;
        }).map(function(file) {
          return file.name;
        });
        var subdirs = entries.filter(function(entry) {
          return entry.isDir;
        }).map(function(subdir) {
          return subdir.name;
        });

        files.forEach(function(file) {
          s.emit('data', file);
        });

        if (subdirs.length) queue.push.apply(queue, subdirs);
        next();
      });
    });
  }

  next();

  return s;
}
