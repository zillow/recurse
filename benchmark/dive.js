#!/usr/bin/env node

var dive = require('dive');

var files = 0;

dive(process.env.HOME, { all: true }, function(err, file) {
  if (!err) files++;
}, function() {
  console.log(files);
});
