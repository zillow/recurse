#!/usr/bin/env node

var recurse = require('../');
var Stream = require('stream');

var dir = process.env.HOME;

var lines = 0;
var wc = new Stream;
wc.writable = true;
wc.write = function (chunk) {
  lines++;
}
wc.end = function (chunk) {
  console.log('recurse', lines);
}
recurse(dir).pipe(wc);
