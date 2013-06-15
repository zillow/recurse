var fs = require('fs');
var Stream = require('stream');

module.exports = function(root) {
  var s = new Stream;
  s.readable = true

  fs.readdir(root, function (err, files) {
    // TODO: emit err
    files.forEach(function (file) {
      s.emit('data', file);
      // TODO: recurse dirs
    });
  });

  s.emit('end');

  return s;
}
