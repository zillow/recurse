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
function js(relname, stat) {
  return !stat.isDirectory() && relname.match(/\.js$/)
}
recurse('.', {writefilter: js}).pipe(process.stdout);

// recursively write dirs:
function dir(relname, stat) {
  return stat.isDirectory();
}
recurse('.', {writefilter: dir}).pipe(process.stdout);

// non-recursively write all files:
function none(relname, stat) {
  return false;
}
recurse('.', {recursefilter: none}).pipe(process.stdout);

// recurse into test/ and write js files:
function test(relname, stat) {
  return stat.isDirectory() && ~relname.indexOf('test');
}
recurse('.', {recursefilter: test, writefilter: js}).pipe(process.stdout);
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
* `opts.resolvesymlinks` - if set to true symbolic links will be resolved

Performance
-----------

`recurse` is about an order of magnitude slower than [GNU find][find]
after a couple of runs on my home directory. See [the benchmark][bench]
for detailed results against other node modules.

License
-------

MIT

[find]: http://www.gnu.org/software/findutils/
[bench]: https://github.com/uggedal/recurse/tree/master/benchmark
