recurse
=======

Takes a root dir and recursively streams paths.

[![build status](https://secure.travis-ci.org/uggedal/recurse.png)](http://travis-ci.org/uggedal/recurse)

Example
-------

````javascript
var recurse = require('recurse');

// recursively write all filetypes except directories:
recurse('.').pipe(process.stdout);

// recursively write js files:
function onlyJs(relname, stat) {
  return !stat.isDirectory() && relname.match(/\.js$/)
}
recurse('.', {writefilter: onlyJs}).pipe(process.stdout);

// recursively write dirs:
function onlyDir(relname, stat) {
  return stat.isDirectory();
}
recurse('.', {writefilter: onlyDir}).pipe(process.stdout);
````

Mehods
------

````javascript
var recurse = require('recurse');
````

### var s = recurse(root, opts={})

Return a redable stream of all paths beneath a `root` directory.

Optionally pass in the following `opts`:

* `opts.writefilter` - custom function for determining whether to write a
  path to the recurse stream using a `opts.writefilter(relname, stat)`
  signature.
* `opts.recursefilter` - custom function for determining whether to recurse a
  path using a `opts.writefilter(relname, stat)` signature.

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
