const http = require('http');
const multer  = require('multer');
const fs = require('fs');
const url = require('url');


const server = http.createServer((req, res) => {

    const parsedUrl = url.parse(req.url, true);

    console.log('Server is listening on port 5500');

    if (parsedUrl.pathname === '/') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('This is Home Page');
        res.end();
    } else if (parsedUrl.pathname === '/about') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('This is About Page');
        res.end();
    } else if (parsedUrl.pathname === '/contact') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('This is Contact Page');
        res.end();
    } else if (parsedUrl.pathname === '/file-write') {
        fs.writeFile('demo.txt', 'hello world', (err) => {
            if (err) {
                res.writeHead(500, {'Content-Type': 'text/html'});
                res.write('Error writing to file');
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write('hello world showing successfully');
            }
            res.end();
        });
    } else if (parsedUrl.pathname === '/upload-file') {
        const upload = multer({ dest: 'uploads/' }).single('file');
        upload(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                res.writeHead(500, {'Content-Type': 'text/html'});
                res.write('Multer error');
            } else if (err) {
                res.writeHead(500, {'Content-Type': 'text/html'});
                res.write('error');
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write('Uploaded successfully');
            }
            res.end();
        });
    } else {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.write('Not Found');
        res.end();
    }
});

server.listen(5500);
