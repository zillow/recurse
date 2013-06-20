#!/bin/sh

dir=linux-3.9.6

fixture() {
  if [ ! -d $dir ]; then
    curl https://www.kernel.org/pub/linux/kernel/v3.x/${dir}.tar.xz | tar xJ
  fi
}

wrapper() {
  res=$(./${1}.js $dir 2>/dev/null | tail -n1)
  [ $? -ne 0 ] && res=failed
  [ -n "$res" ] && printf '%-7s' "$res"
  [ -n "$2" ] && printf ' (%s)' "$2"
}

bench() {
  printf '%-14s' "$1:"
  time wrapper $1 "$2"
  printf '\n'
}

fixture

bench find
bench recurse
bench wrench 'resolves symlinks and outputs directories'
bench readdirp
bench findit 'blows stack easily'
bench walk
bench file
bench dive 'resolves symlinks'
bench match-files
bench node-dir
bench ls-r 'outputs directories'
bench stream-dir 'does not output symlinks'
