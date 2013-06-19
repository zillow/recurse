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
after a couple of runs on my home directory. See [the benchmark][bench]
for detailed results against other node modules.

License
-------

BSD

[find]: http://www.gnu.org/software/findutils/
[bench]: https://github.com/uggedal/recurse/tree/master/benchmark
