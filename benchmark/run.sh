#!/bin/sh

set -e

bench() {
  printf '%s: ' $1
  time ./${1}.js
  printf "\n"
}

bench find
bench recurse
bench wrench
bench readdirp
bench findit
bench walk
bench dive
bench match-files
bench ls-r
