var recurse = require('./');

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
