var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var rimraf = require('rimraf');

// TODO: extract this to a separate module.
// TODO: pass errors to callback.

module.exports = function (prefix, paths, cb) {
  var dirs = [];
  var files = [];

  paths.forEach(function (p) {
    // TODO: symlink support (-> separator).
    if (p.substr(-1) === path.sep) {
      dirs.push(path.join(prefix, p));
    } else {
      dirs.push(path.join(prefix, path.dirname(p)));
      files.push(path.join(prefix, p));
    }
  });

  var pendingDirs = dirs.length;
  var pendingFiles = files.length;

  // TODO: normalize dirs before creating them to save syscalls.
  dirs.forEach(function (dir) {
    mkdirp(dir, function (err) {
      pendingDirs--;
      checkDirs();
    });
  });

  function mkfiles () {
    files.forEach(function (file) {
      fs.open(file, 'w', function (err, fd) {
        fs.close(fd, function (err) {
          pendingFiles--;
          checkFiles();
        });
      });
    });
  }

  function checkDirs () {
    if (!pendingDirs) mkfiles();
  }

  function checkFiles () {
    if (!pendingFiles) cb(null);
  }

  return { rm: function (cb) {
    rimraf(prefix, function (err) {
      if (cb) cb(err);
    });
  }};
}
