#!/usr/bin/env node

var matchFiles = require('match-files');

matchFiles.find(process.argv[2], {}, function (err, files) {
  console.log(files.length);
});
