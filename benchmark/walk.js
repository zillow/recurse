#!/usr/bin/env node

var walk = require('walk').walk;

var files = 0;
walk(process.argv[2], {followLinks: false})
.on("file", function (root, fileStats, next) {
  files++;
  next();
}).on("symbolicLink", function (root, fileStats, next) {
  files++;
  next();
}).on("end", function () {
  console.log(files);
});
