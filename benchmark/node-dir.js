#!/usr/bin/env node

var dir = require('node-dir');

var files = 0;
dir.files(process.argv[2], function (err, names) {
  files += names.length;
  console.log(files);
});
