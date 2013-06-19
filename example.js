var recurse = require('./');

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
