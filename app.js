// Inspired by https://stackoverflow.com/questions/35995273/how-to-run-html-file-using-node-js, code implementation is original.
var http = require('http');
var fs = require('fs');

var port = process.argv.length > 2 ? process.argv[2] : 8000;

fs.readFile('./index.html', function (error, site) {
  if (error) throw error;
  http
    .createServer(function (request, response) {
      response.writeHeader(200, { 'Content-Type': 'text/html' });
      response.write(site);
      response.end();
    })
    .listen(port);
});
