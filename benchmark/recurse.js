#!/usr/bin/env node

var recurse = require('../');
var wc = require('./wc');

recurse(process.env.HOME).pipe(wc('recurse'));
