#!/usr/bin/env node

var readdirp = require('readdirp');
var Stream = require('stream');

var dir = process.env.HOME;

var lines = 0;
var wc = new Stream;
wc.writable = true;
wc.write = function (chunk) {
  lines++;
}
wc.end = function (chunk) {
  console.log('readdirp', lines);
}
readdirp({ root: dir}).pipe(wc);
