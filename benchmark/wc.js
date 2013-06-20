var Stream = require('stream');

module.exports = function (filter) {
  var lines = 0;
  var wc = new Stream;
  wc.writable = true;

  wc.write = function (chunk) {
    if (typeof filter !== 'function' || !filter(chunk)) lines++;
  };

  wc.end = function (chunk) {
    if (chunk) wc.write(chunk);

    console.log(lines);
  };
  return wc;
};
