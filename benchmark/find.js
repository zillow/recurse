#!/usr/bin/env node

var exec = require('child_process').exec;

var dir = process.argv[2];

exec('find ' + dir + ' ! -type d | wc -l', function (error, stdout, stderr) {
  console.log(stdout.replace(/\s/gm, ''));
});
