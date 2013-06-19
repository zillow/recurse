#!/usr/bin/env node

var walk = require('walk').walk;

var files = 0;
var walker = walk(process.argv[2], {followLinks: false});

walker.on("file", function (root, fileStats, next) {
  files++;
  next();
});

walker.on("end", function () {
  console.log(files);
});
