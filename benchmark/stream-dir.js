#!/usr/bin/env node

var streamDir = require('stream-dir');
var wc = require('./wc');

streamDir(process.argv[2]).pipe(wc());
