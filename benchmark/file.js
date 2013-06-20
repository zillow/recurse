#!/usr/bin/env node

var walk = require('file').walk;

var files = 0;
walk(process.argv[2], function (err, path, dirs, names) {
  files += names.length;
  console.log(files);
});
