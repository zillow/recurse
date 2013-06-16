var fs = require('fs');
var path = require('path');
var Stream = require('stream');

function statdir(dir, names, cb) {
  var entries = [];

  names.forEach(function(name) {
    var relName = path.join(dir, name);

    fs.lstat(relName, function(err, stats) {
      entries.push({name: relName, isDir: stats && stats.isDirectory()});
      if (entries.length == names.length) cb(entries);
    });
  });
}

module.exports = function(root) {
  var s = new Stream;
  s.readable = true

  function recurse(dir, done) {
    fs.readdir(dir, function (err, names) {
      // TODO: emit err
      if (!names) {
        done();
        return;
      }

      statdir(dir, names, function(entries) {
        var files = entries.filter(function(entry) {
          return !entry.isDir;
        });
        var dirs = entries.filter(function(entry) {
          return entry.isDir;
        });

        files.forEach(function(entry) {
          s.emit('data', entry.name);
        });

        if (!dirs.length) done();

        dirs.forEach(function(entry, i) {
          recurse(entry.name, function() {
            if (i == dirs.length - 1) done();
          });
        });
      });
    });
  }

  recurse(root, function() {
    s.emit('end');
  });

  return s;
}
