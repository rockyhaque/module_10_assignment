const http = require('http');
const fs = require('fs');
const url = require('url');
const multer  = require('multer');


const server = http.createServer((req, res) => {

    const parsedUrl = url.parse(req.url, true);

    console.log('Server is listening on port 5500');

    if (parsedUrl.pathname === '/') {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write('This is Home Page');
        res.end();
    } else if (parsedUrl.pathname === '/about') {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write('This is About Page');
        res.end();
    } else if (parsedUrl.pathname === '/contact') {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write('This is Contact Page');
        res.end();
    } else if (parsedUrl.pathname === '/file-write') {
        fs.writeFile('demo.txt', 'hello world', (err) => {
            if (err) {
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.write('Error writing to file');
            } else {
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.write('hello world written successfully');
            }
            res.end();
        });
    } else if (parsedUrl.pathname === '/upload-file') {
        const upload = multer({ dest: 'uploads/' }).single('file');
        upload(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.write('Multer error occurred');
            } else if (err) {
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.write('Unknown error occurred');
            } else {
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.write('Uploaded successfully');
            }
            res.end();
        });
    } else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write('404 Not Found');
        res.end();
    }
});

server.listen(5500);
