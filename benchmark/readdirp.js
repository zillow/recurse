#!/usr/bin/env node

var readdirp = require('readdirp');
var wc = require('./wc');

var filter = function (chunk) {
  return chunk.stat.isDirectory();
};

readdirp({ root: process.argv[2]}).pipe(wc(filter));
