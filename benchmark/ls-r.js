#!/usr/bin/env node

var lsr = require('ls-r');

lsr(process.argv[2], {}, function (err, files) {
  console.log(files.length);
});
