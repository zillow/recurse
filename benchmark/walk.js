#!/usr/bin/env node

var walk = require('walk').walk;

var files = 0;
var walker = walk(process.env.HOME);

walker.on("file", function (root, fileStats, next) {
  files++;
  next();
});

walker.on("end", function () {
  console.log('walk', files);
});
