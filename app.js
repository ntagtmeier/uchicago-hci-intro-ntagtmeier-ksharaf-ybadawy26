// Inspired by https://stackoverflow.com/questions/35995273/how-to-run-html-file-using-node-js, code implementation is original.
var http = require('http');
var fs = require('fs');
var path = require('path'); // Only added this to handle different file types

http
  .createServer(function (request, response) {
    let filePath = request.url === '/' ? './index.html' : '.' + request.url; // Serve either index.html or other requested files

    // Determine the MIME type based on file extension
    let extname = path.extname(filePath);
    let contentType = 'text/html'; // Default to HTML

    if (extname === '.js') {
      // Serve JavaScript files with the correct MIME type
      contentType = 'application/javascript';
    }

    // Read and serve the requested file
    fs.readFile(filePath, function (error, content) {
      if (error) {
        // If file not found, return 404
        response.writeHead(404, { 'Content-Type': 'text/html' });
        response.end('<h1>404 - File Not Found</h1>', 'utf-8');
      } else {
        // Serve the file with the correct content type
        response.writeHead(200, { 'Content-Type': contentType });
        response.end(content, 'utf-8');
      }
    });
  })
  .listen(8010);

console.log('Server running at http://localhost:8010');
