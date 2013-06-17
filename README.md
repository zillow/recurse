recurse
=======

Takes a root dir and recursively streams paths.

[![build status](https://secure.travis-ci.org/uggedal/recurse.png)](http://travis-ci.org/uggedal/recurse)

Example
-------

````javascript
var recurse = require('recurse');

recurse('.').pipe(process.stdout);
````

Mehods
------

````javascript
var recurse = require('recurse');
````

### var s = recurse(dir)

Return a redable stream of all paths beneath a directory.

Performance
-----------

`recurse` is about an order of magniture slower than [GNU find][find]
after a couple of runs on my home directory:

````sh
$ ./benchmark.js 
find 184975 1.274s
recurse 184974 18.023s
````

License
-------

BSD

[find]: http://www.gnu.org/software/findutils/
