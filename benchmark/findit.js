#!/usr/bin/env node

var findit = require('findit');

var files = 0;

findit.find(process.argv[2])
.on('file', function (file, stat) {
  files++;
}).on('link', function (file, stat) {
  files++;
}).on('end', function () {
  console.log(files);
});
