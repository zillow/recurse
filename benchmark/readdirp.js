#!/usr/bin/env node

var readdirp = require('readdirp');
var wc = require('./wc');

readdirp({ root: process.env.HOME}).pipe(wc('readdirp'));
