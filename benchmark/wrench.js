#!/usr/bin/env node

var wrench = require('wrench');

var files = 0;
wrench.readdirRecursive(process.env.HOME, function(err, curFiles) {
  if (curFiles === null) {
    console.log(files);
  } else {
    if (curFiles) files += curFiles.length; 
  }
});
