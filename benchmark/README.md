Recurse benchmarks
==================

Benchmarks of various recursive readdir implementations.

Usage
-----

To benchmark various implementations on all files in your home directory:

    npm install
    ./run.sh

Untested modules
----------------

The following modules was not tested since they do not handle broken
symlinks (which my home directory has lots of):

* file
* final-fs
