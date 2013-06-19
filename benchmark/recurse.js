#!/usr/bin/env node

var recurse = require('../');
var wc = require('./wc');

recurse(process.argv[2]).pipe(wc());
