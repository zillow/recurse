#!/bin/sh

set -e

bench() {
  printf '%s: ' $1
  time ./${1}.js
  printf "\n"
}

bench find
bench recurse
bench readdirp
bench wrench
bench walk
bench dive
