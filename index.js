var fs = require('fs');
var path = require('path');
var Stream = require('stream');
var util = require('util');

function notDirectoryFilter(relname, stat) {
  return !stat.isDirectory();
}

function Recurse(root, filter) {
  Stream.call(this);
  this.readable = true;
  this.paused = false;

  this.queue = [root];
  this.filter = filter || notDirectoryFilter;
  this.buffer = [];
  this.pendingReaddirs = 0;
  this.pendingLstats = 0;

  this.next();
}

util.inherits(Recurse, Stream);

Recurse.prototype.pause = function () {
  this.paused = true;
}

Recurse.prototype.resume = function () {
  this.paused = false;
  this.next();
}

Recurse.prototype.readdir = function (dir) {
  var self = this;
  this.pendingReaddirs++;
  fs.readdir(dir, function (err, names) {
    self.pendingReaddirs--;

    if (err) {
      self.emit('error', err);
      return self.next();
    }

    self.statdir(dir, names);
  });
}

Recurse.prototype.statdir = function (dir, names) {
  var self = this;
  if (!names.length) return this.next();

  this.pendingLstats += names.length;
  names.forEach(function (name) {
    var relname = path.join(dir, name);

    fs.lstat(relname, function (err, stats) {
      self.pendingLstats--;

      if (err) {
        self.emit('error', err);
        return self.next();
      }

      if (stats.isDirectory()) self.queue.push(relname);

      if (self.filter(relname, stats)) self.buffer.push(relname);

      self.next();
    });
  });
}

Recurse.prototype.next = function () {
  if (this.paused) return;

  if (this.buffer.length) {
    this.emit('data', this.buffer.pop());
    return this.next();
  }

  if (this.queue.length) return this.readdir(this.queue.pop());
  if (!this.pendingReaddirs && !this.pendingLstats) this.emit('end');
}

module.exports = function (root, filter) {
  return new Recurse(root, filter);
}

module.exports.Recurse = Recurse;
