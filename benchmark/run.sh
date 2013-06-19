#!/bin/sh

bench() {
  printf '%s' $1
  [ $# -eq 2 ] && printf ' (%s)' "$2"
  printf ': '
  time ./${1}.js 2>/dev/null
  printf '\n'
}

bench find
bench recurse
bench wrench
bench readdirp
bench findit 'blows stack easily'
bench walk
bench dive
bench match-files
bench ls-r
bench stream-dir
