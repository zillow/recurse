Recurse benchmarks
==================

Highly unscientific benchmarks of various recursive readdir implementations.

Usage
-----

To benchmark various implementations on all files in your home directory:

    npm install
    ./run.sh

Results
-------

    find: 190301

    real    0m1.427s
    user    0m0.440s
    sys     0m1.040s

    recurse: 190301

    real    0m12.108s
    user    0m12.580s
    sys     0m5.740s

    wrench: 230264

    real    0m16.235s
    user    0m17.400s
    sys     0m5.940s

    readdirp: 195741

    real    0m37.525s
    user    0m40.930s
    sys     0m10.310s

    findit:
    ~/dev/recurse/benchmark/node_modules/findit/node_modules/seq/index.js:76
            f.apply(cb, context.stack);
              ^
    RangeError: Maximum call stack size exceeded

    walk: 189569

    real    0m25.179s
    user    0m7.430s
    sys     0m18.760s

    dive: 196076

    real    0m11.768s
    user    0m12.330s
    sys     0m5.940s

    match-files: 195741

    real    0m20.893s
    user    0m21.860s
    sys     0m5.140s

    ls-r: 224335

    real    1m43.392s
    user    1m46.240s
    sys     0m5.640s



Untested modules
----------------

* file
* node-dir
* walkr
* read-dir-files
* final-fs
* scandir
* recur-fs
* cordell
* recursive-fs
* Travis
* finder
* fsx
* fs.walker
* rat
* esfs
* recursive-readdir
* unravel
* file-finder
* directory-stream
* dank-fileemitter
* dir-mapper
* dirreader
* node-dirutils
* readdirtree
* node-find-files
* recdirreader
* stream-dir
