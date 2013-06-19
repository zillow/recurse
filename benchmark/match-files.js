#!/usr/bin/env node

var matchFiles = require('match-files');

matchFiles.find(process.env.HOME, {}, function (err, files) {
  console.log(files.length);
});
