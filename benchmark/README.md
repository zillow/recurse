Recurse benchmarks
==================

Highly unscientific benchmarks of various recursive readdir implementations.

Usage
-----

Benchmark various implementations on 40k+ files in a recent Linux kernel:

    npm install
    ./run.sh

Results
-------

    find:         42425  
    real	0m0.109s
    user	0m0.063s
    sys	0m0.050s

    recurse:      42425  
    real	0m0.763s
    user	0m0.820s
    sys	0m0.200s

    wrench:       45168   (resolves symlinks and outputs directories)
    real	0m1.414s
    user	0m1.580s
    sys	0m0.320s

    readdirp:     42425  
    real	0m1.724s
    user	0m1.830s
    sys	0m0.277s

    findit:       42425   (blows stack easily)
    real	0m6.615s
    user	0m6.473s
    sys	0m0.443s

    walk:         42425  
    real	0m1.174s
    user	0m1.047s
    sys	0m0.330s

    file:         42425  
    real	0m0.736s
    user	0m0.730s
    sys	0m0.147s

    dive:         42425   (resolves symlinks)
    real	0m0.800s
    user	0m0.843s
    sys	0m0.237s

    match-files:  42425  
    real	0m1.450s
    user	0m1.480s
    sys	0m0.257s

    node-dir:     42425  
    real	0m0.788s
    user	0m0.830s
    sys	0m0.220s

    ls-r:         45169    (outputs directories)
    real	0m3.646s
    user	0m3.783s
    sys	0m0.253s

    stream-dir:   42424   (does not output symlinks)
    real	0m1.561s
    user	0m1.363s
    sys	0m0.413s

Untested modules
----------------

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
