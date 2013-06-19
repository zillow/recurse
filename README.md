recurse
=======

Takes a root dir and recursively streams paths.

[![build status](https://secure.travis-ci.org/uggedal/recurse.png)](http://travis-ci.org/uggedal/recurse)

Example
-------

````javascript
var recurse = require('recurse');

console.log('all filetypes except directories: ');
recurse('.').pipe(process.stdout);


console.log('js files: ');
recurse('.', function onlyJs(relname, stat) {
  return !stat.isDirectory() && relname.match(/\.js$/)
}).pipe(process.stdout);


console.log('dirs: ');
recurse('.', function onlyDir(relname, stat) {
  return stat.isDirectory();
}).pipe(process.stdout);
````

Mehods
------

````javascript
var recurse = require('recurse');
````

### var s = recurse(root)

Return a redable stream of all paths beneath a `root` directory.

### var s = recurse(root, filter)

Return a redable stream of all paths beneath a `root` directory where
a filter function `filter(relname, stat)` returns true.

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
