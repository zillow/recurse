#!/usr/bin/env node

var streamDir = require('stream-dir');
var wc = require('./wc');

streamDir(process.env.HOME).pipe(wc());
