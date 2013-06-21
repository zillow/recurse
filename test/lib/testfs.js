var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var rimraf = require('rimraf');

// TODO: extract this to a separate module.
// TODO: pass errors to callback.

module.exports = function (paths, prefix, cb) {
  var dirs = [];
  var files = [];

  paths.forEach(function (p) {
    // TODO: symlink support (-> separator).
    if (p.substr(-1) === path.sep) {
      dirs.push(path.join(prefix, p));
    } else {
      dirs.push(path.join(prefix, path.dirname(path)));
      files.push(path.join(prefix, p));
    }
  });

  // TODO: normalize dirs before creating them to save syscalls.

  var pendingDirs = dirs.length;
  dirs.forEach(function (dir) {
    mkdirp(dir, function (err) {
      pendingDirs--;
      check();
    });
  });

  var pendingFiles = files.length;
  files.forEach(function (file) {
    fs.open(file, 'w', function (err, fd) {
      fs.close(fd, function (err) {
        pendingFiles--;
        check();
      });
    });
  });

  function check () {
    if (!pendingDirs && !pendingFiles) cb(null);
  }

  return { rm: function (cb) {
    rimraf(prefix, function (err) {
      if (cb) cb(err);
    });
  }};
}
