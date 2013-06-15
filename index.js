var fs = require('fs');
var path = require('path');
var Stream = require('stream');

module.exports = function(root) {
  var s = new Stream;
  s.readable = true

  fs.readdir(root, function (err, files) {
    // TODO: emit err
    files.forEach(function (file) {
      // TODO: option for only emitting files
      s.emit('data', path.join(root, file));
      // TODO: recurse dirs
    });
    s.emit('end');
  });

  return s;
}
