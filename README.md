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

License
-------

BSD
