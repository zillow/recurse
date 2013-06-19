#!/bin/sh

set -e

time ./find.js
time ./recurse.js
time ./readdirp.js
time ./wrench.js
time ./walk.js
