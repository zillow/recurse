#!/bin/sh

wrapper() {
  res=$(./${1}.js 2>/dev/null)
  [ $? -ne 0 ] && printf 'failed'
  printf '%s' "$res"
  [ -n "$2" ] && printf ' (%s)' "$2"
}

bench() {
  printf '%s' $1
  printf ': '
  time wrapper $1 "$2"
  printf '\n'
}

bench find
bench recurse
bench wrench
bench readdirp
bench findit 'blows stack easily'
bench walk
bench dive 'follows symlinks'
bench match-files
bench ls-r
bench stream-dir
