#!/usr/bin/env node

var lsr = require('ls-r');

lsr(process.env.HOME, {}, function (err, files) {
  console.log(files.length);
});
