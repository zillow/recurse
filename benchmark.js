#!/usr/bin/env node

var exec = require('child_process').exec;
var recurse = require('./');
var Stream = require('stream');

var dir = process.argv[2] || process.env.HOME;

function timer(start) {
  var end = ((new Date).getTime() - start) / 1000;
  return end + 's';
}

var findStart = (new Date).getTime();
exec('find ' + dir + ' ! -type d | wc -l', function (error, stdout, stderr) {
  console.log('find', stdout.replace(/\s/gm, ''), timer(findStart));
  recurseTest();
});

function recurseTest() {
  var recurseStart = (new Date).getTime();
  var lines = 0;
  var wc = new Stream;
  wc.writable = true;
  wc.write = function (chunk) {
    lines++;
  }
  wc.end = function (chunk) {
    console.log('recurse', lines, timer(recurseStart));
  }
  recurse(dir).pipe(wc);
}
