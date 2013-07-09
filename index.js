var fs = require('fs');
var path = require('path');
var inherits = require('util').inherits;
var Readable = require('stream').Readable;

if (!Readable) Readable = require('readable-stream').Readable;

function Recurse (root, opts) {
  Readable.call(this, {objectMode: true});

  var opts = opts || {};

  this.recursefilter = opts.recursefilter || function (relname, stat) {
    return stat.isDirectory();
  };

  this.writefilter = opts.writefilter || function (relname, stat) {
    return !stat.isDirectory();
  };

  this.stat = opts.resolvesymlinks ? fs.stat : fs.lstat;

  this.queue = [root];
  this.buffer = [];
  this.pending = 0;
}

inherits(Recurse, Readable);

Recurse.prototype.readdir = function (dir) {
  var self = this;

  self.pending++;
  fs.readdir(dir, function (err, names) {
    self.pending--

    if (err) {
      self.emit('error', err);
      return self._read();
    }

    if (!names.length) return self._read();

    self.statdir(dir, names);
  });
};

Recurse.prototype.statdir = function (dir, names) {
  var self = this;

  self.pending += names.length;
  names.forEach(function (name) {
    var relname = path.join(dir, name);

    self.stat(relname, function (err, stats) {
      self.pending--;
      if (err) {
        self.emit('error', err);
        return self._read();
      }

      if (self.recursefilter(relname, stats)) {
        self.queue.push(relname);
      }

      if (self.writefilter(relname, stats)) {
        self.buffer.push(relname);
      }

      self._read();
    });
  });
};

Recurse.prototype._read = function () {
  var self = this;

  while (self.buffer.length)
    if (!self.push(self.buffer.pop())) return;

  if (self.queue.length) self.readdir(self.queue.pop());

  if (!self.pending) self.push(null);
};

module.exports = function (root, opts) {
  return new Recurse(root, opts);
}
