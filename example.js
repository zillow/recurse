var recurse = require('./');

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
